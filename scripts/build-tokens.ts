import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import StyleDictionary from 'style-dictionary';
import type { DesignTokens } from 'style-dictionary/types';
import { makeConfig } from '../tokens/style-dictionary.config';

const SOURCE = resolve(process.cwd(), 'tokens/figma-export.json');

const raw = JSON.parse(readFileSync(SOURCE, 'utf-8')) as Record<string, unknown>;

// `$meta` is provenance, not a token — strip before handing to Style Dictionary.
const { $meta, ...tokens } = raw;
void $meta;

const sd = new StyleDictionary(makeConfig(tokens as DesignTokens));
await sd.buildAllPlatforms();

console.log('\n✓ tokens.css generated from tokens/figma-export.json');
