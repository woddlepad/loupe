# Chrome Web Store Assets

Generate these with:

```sh
pnpm store:assets
```

Upload:

- `screenshot-annotate-1280x800.png` as a screenshot.
- `screenshot-agent-1280x800.png` as a screenshot.
- `promo-small-440x280.png` as the small promotional image.
- `../../packages/extension/icons/icon128.png` as the store icon.

The SVG files are source files generated alongside the PNGs so the assets can be
updated without editing binary images by hand.
