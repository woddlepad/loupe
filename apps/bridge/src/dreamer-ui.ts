export function dreamerHtml(): string {
  return `<!doctype html>
<html lang="en" class="dark">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="dark" />
  <!-- Marks this as Loupe's own Dreamer UI so the browser extension stays out of
       its way (it has its own native correction overlay — Alt+A). -->
  <meta name="loupe-surface" content="dreamer" />
  <title>Dreamer</title>
  <link rel="stylesheet" href="/dreamer/assets/dreamer.css" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/dreamer/assets/dreamer.js"></script>
</body>
</html>`;
}
