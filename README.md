# CRMEdge Design System

Internal React component library for the CRMEdge B2B product. Tokens are pulled from Figma (file `DmL4gv3m10KzL2Y6yLMDJ5`) and propagated through Style Dictionary; components are documented in Storybook and linked back to Figma via Code Connect.

## Quick start

```bash
npm install
npm run storybook
```

## Scripts

| Script | What it does |
|---|---|
| `npm run storybook` | Start the Storybook dev server on `:6006` |
| `npm run build-storybook` | Build static Storybook to `storybook-static/` |
| `npm run tokens:pull` | Export Figma variables → `tokens/figma-export.json` |
| `npm run tokens:build` | Generate `src/styles/tokens.css` from token JSON |
| `npm run tokens` | Pull + build in one step |
| `npm run code-connect:publish` | Publish Code Connect mappings to Figma |
| `npm run deploy-storybook` | Deploy static Storybook to GitHub Pages |
| `npm run typecheck` | Run TypeScript without emitting |

## Stack

- React 18 + TypeScript (strict)
- Vite 5 + Storybook 8
- Style Dictionary 4 for the token pipeline
- Figma Code Connect for design ↔ code linking

## Figma source

[CRM Design System v1.0](https://www.figma.com/design/DmL4gv3m10KzL2Y6yLMDJ5/)
