import type { Config, DesignTokens } from 'style-dictionary/types';

/**
 * Builds the Style Dictionary config for the CRMEdge token pipeline.
 *
 * Input shape: DTCG tokens (`$value` / `$type`, aliases as `{path.to.token}`)
 * Output: `src/styles/tokens.css` — a `:root { --… }` block.
 *
 * Transform choice: a custom list rather than the `css` transformGroup, so
 * `size/rem` is **not** applied. Figma authors dimensions in `px`; preserving
 * them keeps the CSS values 1:1 with the source-of-truth in Figma.
 *
 * `outputReferences: true` keeps semantic tokens as `var(--primitive)` rather
 * than inlining resolved values — changing a primitive in `tokens.css`
 * therefore propagates everywhere it is aliased.
 */
export function makeConfig(tokens: DesignTokens): Config {
  return {
    tokens,
    usesDtcg: true,
    log: {
      warnings: 'warn',
      verbosity: 'default',
      errors: { brokenReferences: 'throw' },
    },
    platforms: {
      css: {
        transforms: ['attribute/cti', 'name/kebab', 'color/css'],
        buildPath: 'src/styles/',
        files: [
          {
            destination: 'tokens.css',
            format: 'css/variables',
            options: {
              outputReferences: true,
              selector: ':root',
            },
          },
        ],
      },
    },
  };
}
