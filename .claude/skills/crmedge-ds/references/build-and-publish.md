# Build & Publish

Scripts, CI workflows, and deployment surfaces for `crmedge-ds`.

## npm scripts (`package.json`)

| Script | Command | Purpose |
|---|---|---|
| `dev` | `vite` | Start the Vite dev server for the components playground. |
| `build` | `vite build` | Bundle the library to `dist/` (ESM + sourcemaps). |
| `storybook` | `storybook dev -p 6006` | Storybook dev server on port 6006. |
| `build-storybook` | `storybook build` | Build static Storybook to `storybook-static/`. |
| `tokens:pull` | `tsx scripts/export-figma-vars.ts` | Fetch Figma variables via REST API. **Blocked on plan** — requires Variables API access. |
| `tokens:build` | `tsx scripts/build-tokens.ts` | Run Style Dictionary → regenerate `src/styles/tokens.css`. |
| `tokens` | `npm run tokens:pull && npm run tokens:build` | Full token pipeline (currently broken at the `:pull` step). |
| `code-connect:publish` | `figma connect publish` | Publish Code Connect mappings to Figma. **Blocked on plan** — requires Developer seat. |
| `typecheck` | `tsc --noEmit` | Type-check without emit. Run before committing. |
| `chromatic` | `chromatic --project-token=chpt_34de6d35fb4e9c9 --exit-zero-on-changes` | Publish to Chromatic. |

The Chromatic project token is inline by design — project tokens are write-only per Chromatic docs, so committing is safe.

## GitHub Actions

### `chromatic.yml`

- **Trigger:** push (all branches except `dependabot/*`), `workflow_dispatch`
- **Steps:** checkout (fetch-depth 0) → setup-node 20 → `npm ci` → `npm run typecheck` → `npm run tokens:build` → publish to Chromatic via `chromaui/action@v11`
- **Concurrency:** `chromatic-${{ github.ref }}`, cancel in-flight
- **Permissions:** `contents: read`, `pull-requests: write`, `checks: write`
- **Behavior:** `exitZeroOnChanges` + `exitOnceUploaded` — CI returns in ~30 s; snapshot processing continues async on Chromatic.

### `deploy-storybook.yml`

- **Trigger:** push to `main`, `workflow_dispatch`
- **Steps:** checkout → setup-node 20 → `npm ci` → `npm run typecheck` → `npm run tokens:build` → `STORYBOOK_BASE_PATH=/crmedge-design-system/ npm run build-storybook` → `actions/configure-pages` → upload artifact (`storybook-static`) → `actions/deploy-pages`
- **Concurrency:** group `pages`, `cancel-in-progress: false`
- **Permissions:** `contents: read`, `pages: write`, `id-token: write`
- **Base path:** `/crmedge-design-system/` — required because GitHub Pages serves under the repo name subpath. Configured via `STORYBOOK_BASE_PATH` env → `viteFinal` in `.storybook/main.ts`.

## Deployment surface

- **Storybook (live):** https://kirteeshingan.github.io/crmedge-design-system/
- **Storybook (Chromatic mirror, canonical for plugin linking):** https://main--6a05bba954dfc6eb612aa60c.chromatic.com/
- **GitHub repo:** https://github.com/KirteeShingan/crmedge-design-system

GitHub Pages settings: Source = "GitHub Actions" (set once after `deploy-storybook.yml` first ran).

## Local verification before pushing

The minimum to run before a PR that touches code:

```bash
npm run typecheck
npm run tokens:build   # if you changed figma-export.json
npm run storybook      # spot-check the affected story
```

Chromatic catches visual regressions in CI — you don't need to run it locally. But if a visual change is intentional, mention it in the PR description so the reviewer accepts the snapshot.

## Vite + Storybook config notes

- `vite.config.ts` enables CSS Modules with **snake_case preserved** (`localsConvention` is not `camelCaseOnly`) — required for the `styles[\`variant_${value}\`]` pattern.
- `.storybook/main.ts` reads `STORYBOOK_BASE_PATH` from env to apply the GitHub Pages subpath only in deploy builds.
- `.storybook/preview.ts` imports `reset.css`, `fonts.css`, `tokens.css`, `grid.css` (in that order) so every story has the design-system baseline.

## Things deliberately not in CI

- **`tokens.css` regeneration.** The file is committed; CI does not rebuild it. If you change `figma-export.json` and forget to rebuild, Chromatic will not catch it — components will silently use stale token values. Always commit them together.
- **`storybook build` on every PR.** Only on push to `main` (via `deploy-storybook.yml`). PRs rely on Chromatic for visual coverage.
- **Tests.** No unit test framework is set up; visual coverage is Chromatic only. Adding tests is fine but out of scope for routine component work.
