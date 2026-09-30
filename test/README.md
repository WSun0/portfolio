# Portfolio regression suite

Run `npm ci` once, then:

- `npm test`: non-interactive Vitest unit/component/content checks.
- `npm run test:watch`: rerun affected tests during development.
- `npm run test:all`: unit tests, production build (including TypeScript), then HTTP checks.
- `npm run test:routes`: HTTP checks against the existing production build.

The HTTP suite starts and stops its own server at `127.0.0.1:3107`. Keep that port free. It does not use your development server or contact production. GitHub Actions runs `test:all` on pull requests and pushes to main. Branch protection is not configured by this workflow.

## Coverage

- Terminal path resolution, all supported commands, invalid input, and safe known-route navigation.
- Sidebar disclosure versus directory links; Mac/Windows shortcuts, repeat-key handling, mobile defaults and selection.
- Terminal focus, closing/reopening, history/draft restoration, empty input, clear, and transcript text escaping.
- Theme initialization, changes and storage failures.
- Post ordering, social URLs, old article back links, retained content and photo descriptions.
- Every current page in the production build, permanent blog redirects, unknown-route 404, internal links and local photo availability.

The component tests use jsdom and mocked Next routing; the HTTP tests exercise the actual Next production server. They do not substitute for visual browser testing, screen-reader testing, actual keyboard behavior in every browser, or interactive Leaflet map checks. External websites are not contacted to keep the suite deterministic.

`legacy/` preserves the superseded tests as reference text; they are not silently skipped test cases. Their assumptions concerned the retired interface and outdated content. Active regression coverage lives in `unit/`, `integration/`, and `http/`.

## Security regressions

The suite also checks malicious/oversized terminal input, removal of unfinished content, private-file 404s, fresh CSP nonces that override supplied request headers, matching nonces on rendered scripts, restrictive response headers, and absence of public browser source maps. `npm audit --audit-level=high` runs in CI. See [SECURITY.md](../SECURITY.md) for scope and the dynamic-rendering tradeoff.
