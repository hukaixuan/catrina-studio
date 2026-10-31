# Contributing

Thanks for your interest! This is a small, static, client-side web app, so getting started is quick.

## Setup

Requirements: Node.js 20.19+ (22 or 24 recommended) and npm.

```bash
npm ci
npm run dev        # http://localhost:5173
```

Before opening a pull request, please run:

```bash
npm run typecheck
npm run lint
npm run build
```

CI runs the same steps on Node 22 and 24.

## Guidelines

- Keep everything client-side: no servers, no API keys, no tracking.
- Keep pull requests small and focused; describe how you tested in the PR template.
- For larger changes, open an issue first so we can agree on the approach.
- Look for issues labelled `good first issue` if you want somewhere to start.

## Reporting bugs

Use the bug report template and include your browser/OS and, if relevant, a screenshot or the generated output.

By contributing you agree that your contributions are licensed under the MIT License.
