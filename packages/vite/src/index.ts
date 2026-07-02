import path from "node:path";
import ts from "typescript";

export interface LoupeVitePluginOptions {
  /**
   * Enable source metadata injection. Defaults to true so an explicitly added
   * plugin works immediately; apps can gate this with an env var for previews.
   */
  enabled?: boolean;
  /** Repo root used to make source paths stable and non-absolute. */
  root?: string;
  /** Path globs/prefixes to transform. Defaults to source files under root. */
  include?: string[];
  /** Path globs/prefixes to skip. */
  exclude?: string[];
}

export interface ViteLikePlugin {
  name: string;
  enforce?: "pre" | "post";
  transform?: (code: string, id: string) => { code: string; map: null } | null;
}

const LOUPE_SOURCE_PROP = "__loupeSource";
const COMPONENT_EXT_RE = /\.[cm]?[jt]sx?$/;
const TEST_RE = /\.(test|spec)\.[cm]?[jt]sx?$/;

export default function loupe(options: LoupeVitePluginOptions = {}): ViteLikePlugin {
  let root = normalizeRoot(options.root ?? process.cwd());

  return {
    name: "loupe-source-metadata",
    enforce: "pre",
    transform(code, id) {
      if (options.enabled === false) return null;
      const file = cleanId(id);
      if (!shouldTransform(file, root, options)) return null;

      const sourcePath = repoRelative(root, file);
      if (!sourcePath) return null;

      const next = annotateReactComponents(code, file, sourcePath);
      return next === code ? null : { code: next, map: null };
    },
  };
}

export function annotateReactComponents(code: string, filename: string, sourcePath: string): string {
  const sourceFile = ts.createSourceFile(filename, code, ts.ScriptTarget.Latest, true, scriptKind(filename));
  const names = topLevelComponentNames(sourceFile);
  if (names.length === 0) return code;

  const trailer = names.map((name) => sourceAssignment(name, sourcePath)).join("\n");
  return `${code.trimEnd()}\n\n${trailer}\n`;
}

function topLevelComponentNames(sourceFile: ts.SourceFile): string[] {
  const names: string[] = [];
  const seen = new Set<string>();

  for (const node of sourceFile.statements) {
    const name = componentNameForStatement(node);
    if (!name || seen.has(name)) continue;
    seen.add(name);
    names.push(name);
  }

  return names;
}

function componentNameForStatement(node: ts.Statement): string | undefined {
  if (ts.isFunctionDeclaration(node) && node.name && isComponentName(node.name.text)) {
    return node.name.text;
  }

  if (!ts.isVariableStatement(node)) return undefined;
  for (const declaration of node.declarationList.declarations) {
    if (!ts.isIdentifier(declaration.name) || !isComponentName(declaration.name.text)) continue;
    if (declaration.initializer && isComponentInitializer(declaration.initializer)) {
      return declaration.name.text;
    }
  }
  return undefined;
}

function isComponentInitializer(expr: ts.Expression): boolean {
  const value = unwrapExpression(expr);
  if (ts.isArrowFunction(value) || ts.isFunctionExpression(value)) return true;
  if (ts.isCallExpression(value)) {
    const callee = dottedName(value.expression);
    return callee === "memo" || callee === "React.memo" || callee === "forwardRef" || callee === "React.forwardRef";
  }
  return false;
}

function unwrapExpression(expr: ts.Expression): ts.Expression {
  let value = expr;
  while (
    ts.isParenthesizedExpression(value) ||
    ts.isAsExpression(value) ||
    ts.isTypeAssertionExpression(value) ||
    ts.isSatisfiesExpression(value) ||
    ts.isNonNullExpression(value)
  ) {
    if (ts.isParenthesizedExpression(value)) value = value.expression;
    else value = value.expression;
  }
  return value;
}

function dottedName(expr: ts.Expression): string | undefined {
  if (ts.isIdentifier(expr)) return expr.text;
  if (ts.isPropertyAccessExpression(expr)) {
    const left = dottedName(expr.expression);
    return left ? `${left}.${expr.name.text}` : expr.name.text;
  }
  return undefined;
}

function sourceAssignment(name: string, sourcePath: string): string {
  return `Object.defineProperty(${name}, ${JSON.stringify(LOUPE_SOURCE_PROP)}, { value: ${JSON.stringify(sourcePath)} });`;
}

function shouldTransform(file: string, root: string, options: LoupeVitePluginOptions): boolean {
  if (!COMPONENT_EXT_RE.test(file) || TEST_RE.test(file) || file.includes("/node_modules/")) return false;
  if (options.exclude?.some((pattern) => pathMatches(file, root, pattern))) return false;
  if (options.include?.length) return options.include.some((pattern) => pathMatches(file, root, pattern));
  return file.startsWith(root + path.sep);
}

function pathMatches(file: string, root: string, pattern: string): boolean {
  const normalized = normalizePath(pattern);
  const rel = repoRelative(root, file);
  const target = normalized.startsWith("/") ? normalizePath(file) : rel;
  if (!target) return false;

  const base = normalized.replace(/\*\*\/\*\.\{[^}]+\}$/u, "").replace(/\*\*\/\*$/u, "");
  if (base !== normalized) return target.startsWith(base);
  if (normalized.includes("*")) return globToRegExp(normalized).test(target);
  return target === normalized || target.startsWith(normalized.replace(/\/$/u, "") + "/");
}

function globToRegExp(pattern: string): RegExp {
  let source = "";
  for (let i = 0; i < pattern.length; i++) {
    const ch = pattern[i]!;
    if (ch === "*") {
      source += pattern[i + 1] === "*" ? ".*" : "[^/]*";
      if (pattern[i + 1] === "*") i++;
    } else if (ch === "{") {
      const end = pattern.indexOf("}", i);
      if (end > i) {
        source += `(${pattern.slice(i + 1, end).split(",").map(escapeRegex).join("|")})`;
        i = end;
      } else {
        source += "\\{";
      }
    } else {
      source += escapeRegex(ch);
    }
  }
  return new RegExp(`^${source}$`);
}

function repoRelative(root: string, file: string): string | undefined {
  const rel = normalizePath(path.relative(root, file));
  if (!rel || rel.startsWith("../") || rel === "..") return undefined;
  return rel;
}

function cleanId(id: string): string {
  return normalizePath(id.split("?")[0] ?? id);
}

function normalizeRoot(value: string): string {
  return normalizePath(path.resolve(value)).replace(/\/$/u, "");
}

function normalizePath(value: string): string {
  return value.replace(/\\/g, "/");
}

function scriptKind(filename: string): ts.ScriptKind {
  if (/\.tsx$/i.test(filename)) return ts.ScriptKind.TSX;
  if (/\.jsx$/i.test(filename)) return ts.ScriptKind.JSX;
  return ts.ScriptKind.TS;
}

function isComponentName(name: string): boolean {
  return /^[A-Z][A-Za-z0-9_]*$/u.test(name);
}

function escapeRegex(value: string): string {
  return value.replace(/[|\\{}()[\]^$+?.]/g, "\\$&");
}
