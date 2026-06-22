// Compiled stylesheets are imported as strings (esbuild text loader) and
// injected into the overlay shadow roots.
declare module "*.css" {
  const css: string;
  export default css;
}
