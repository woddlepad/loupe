import type {
  ActionDescriptor,
  Annotation,
  AnnotationStatus,
  AnnotationTarget,
  AnnotatePayload,
  Rect,
} from "@loupe/core/model";

/** Messages exchanged between the content script and the background worker. */
export type LoupeMessage =
  | { type: "toggle" }
  | { type: "toggle-view" }
  | { type: "popup-annotate" }
  | { type: "popup-view" }
  | { type: "actions" }
  | { type: "groups" }
  | { type: "list" }
  | { type: "recordings" }
  | { type: "capture"; rect: Rect; devicePixelRatio: number }
  | { type: "annotate"; payload: AnnotatePayload }
  | { type: "update-annotation"; id: string; patch: { note?: string; status?: AnnotationStatus; label?: string } }
  | { type: "add-reference"; id: string; reference: { caption?: string; dataUrl: string } }
  | { type: "delete-annotation"; id: string }
  | { type: "delete-resolved" }
  | { type: "create-group"; group: string }
  | { type: "rename-group"; slug: string; group: string }
  | { type: "delete-group"; slug: string }
  | { type: "move-annotation"; id: string; group: string }
  | { type: "reorder-groups"; slugs: string[] }
  | { type: "group-run"; slug: string; action: string }
  | { type: "resolve-group"; slug: string }
  | { type: "annotation-run"; id: string; action: string }
  | { type: "resolve-target"; target: AnnotationTarget }
  | { type: "references" }
  | { type: "reference-image"; id: string }
  | { type: "delete-reference"; id: string }
  | { type: "delete-reference-page"; url: string }
  | { type: "save-reference"; annotation: Annotation }
  | { type: "start-recording" }
  | { type: "stop-recording" }
  | { type: "cancel-recording" }
  | { type: "record"; payload: AnnotatePayload }
  | { type: "recording-file"; dir: string; file: string };

export interface ReferenceItem {
  id: string;
  url?: string;
  title?: string;
  note?: string;
  createdAt?: string;
  dir: string;
}

export interface GroupSummary {
  group: string;
  slug: string;
  count: number;
  open: number;
}

/** An annotation as stored on disk (adds dir + groupSlug). */
export interface StoredAnnotation extends Annotation {
  dir: string;
  groupSlug: string;
}

export type ActionsResult =
  | { ok: true; actions: ActionDescriptor[] }
  | { ok: false; error: string };
export type GroupsResult = { ok: true; groups: GroupSummary[] } | { ok: false; error: string };
export type ListResult =
  | { ok: true; annotations: StoredAnnotation[] }
  | { ok: false; error: string };
export type RecordingsResult =
  | { ok: true; recordings: StoredAnnotation[] }
  | { ok: false; error: string };
export type ReferencesResult =
  | { ok: true; references: ReferenceItem[] }
  | { ok: false; error: string };
export type ReferenceImageResult =
  | { ok: true; dataUrl: string }
  | { ok: false; error: string };
export type RecordingFileResult =
  | { ok: true; text: string; truncated: boolean }
  | { ok: false; error: string };
export type SimpleResult = { ok: true; detail?: string } | { ok: false; error: string };
export type CaptureResult = { ok: true; dataUrl: string } | { ok: false; error: string };
export type RecordingResult =
  | { ok: true; videoDataUrl?: string; durationMs: number; startedAt: string }
  | { ok: false; error: string };
export type ResolveResult =
  | { ok: true; source: string | null; candidates: string[]; method: string }
  | { ok: false; error: string };
export type AnnotateResult =
  | { ok: true; id: string; dir: string; results: Record<string, { ok: boolean; detail?: string; url?: string }> }
  | { ok: false; error: string };
