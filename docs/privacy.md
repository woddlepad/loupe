# Loupe Privacy Policy

Loupe is a local developer tool for capturing UI feedback and saving it to a repository you control.

## Data Loupe Handles

The Chrome extension can access the current page when you activate Loupe. When you create an annotation, Loupe captures:

- the selected screenshot region
- the page URL and title
- DOM/component hints for the selected element
- your note, group, and optional reference images
- extension settings such as bridge URLs and project origins

## How Data Is Used

Loupe uses this data only to provide its annotation workflow: saving feedback bundles, resolving likely source files, showing annotation pins, and handing work to local or remote agent actions you configure.

## Where Data Goes

By default, annotation data is sent from the extension to the Loupe bridge URL you configure, usually `http://localhost:7337`. If you configure bridge routes, matching pages are sent to those bridge URLs instead. The bridge writes files under `.loupe/` in the target repository.

Loupe does not operate a hosted service and does not sell, rent, or use annotation data for advertising.

## Sharing

Loupe does not transfer your data to third parties except when you explicitly configure a bridge, integration, or custom action to do so. Examples include a remote bridge on your private network, a Linear action, or a repo-local `.loupe/actions/*.mjs` script.

## Storage

The extension stores settings in Chrome extension storage. Annotation bundles are stored by the bridge in your repository. If you commit `.loupe/` files, they are shared wherever you push that repository.

## Limited Use

Loupe uses browser permissions and page data only to provide or improve its single purpose: capturing UI feedback and routing it to developer-controlled local files, bridges, and configured actions. Loupe does not use this data for advertising, resale, creditworthiness, or unrelated analytics.

## Contact

Open an issue at https://github.com/woddlepad/loupe/issues.
