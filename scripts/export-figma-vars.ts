/**
 * Pulls all local variables from the Figma file and writes a DTCG-shaped
 * JSON to `tokens/figma-export.json`.
 *
 * Two execution paths:
 *
 *   1. REST API (preferred for CI / standalone runs)
 *      Requires:
 *        - FIGMA_ACCESS_TOKEN env var
 *        - Figma plan with Variables REST read access (Enterprise / Organization)
 *      Endpoint: GET /v1/files/{file_key}/variables/local
 *
 *   2. Figma MCP (fallback — runs inside Claude Code with Figma MCP active)
 *      If FIGMA_ACCESS_TOKEN is missing or the REST call returns 403,
 *      this script prints instructions to refresh tokens via Claude.
 */

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const FILE_KEY = "DmL4gv3m10KzL2Y6yLMDJ5";
const OUTPUT_PATH = resolve(import.meta.dirname, "../tokens/figma-export.json");

type Rgba = { r: number; g: number; b: number; a?: number };
type Alias = { type: "VARIABLE_ALIAS"; id: string };
type RawValue = Rgba | Alias | number | string | boolean;

interface FigmaVariable {
  id: string;
  name: string;
  resolvedType: "COLOR" | "FLOAT" | "STRING" | "BOOLEAN";
  variableCollectionId: string;
  valuesByMode: Record<string, RawValue>;
  scopes: string[];
}

interface FigmaCollection {
  id: string;
  name: string;
  modes: { modeId: string; name: string }[];
  defaultModeId: string;
  variableIds: string[];
}

interface VariablesResponse {
  meta: {
    variables: Record<string, FigmaVariable>;
    variableCollections: Record<string, FigmaCollection>;
  };
}

function topLevelKey(collectionName: string): string {
  const k = collectionName.toLowerCase().trim();
  if (k.includes("colour") || k.includes("color")) return "color";
  if (k === "size") return "size";
  if (k === "spacing") return "spacing";
  if (k === "radius") return "radius";
  if (k === "grid") return "grid";
  return k.replace(/\s+/g, "-");
}

function pathSegments(varName: string): string[] {
  return varName.split("/").map(s => s.trim().toLowerCase().replace(/\s+/g, "-"));
}

function rgbToHex({ r, g, b, a }: Rgba): string {
  const t = (n: number) =>
    Math.round(Math.max(0, Math.min(1, n)) * 255).toString(16).padStart(2, "0");
  let h = `#${t(r)}${t(g)}${t(b)}`.toUpperCase();
  if (a !== undefined && a < 1) h += t(a).toUpperCase();
  return h;
}

function dtcgType(v: FigmaVariable): string {
  if (v.resolvedType === "COLOR") return "color";
  if (v.resolvedType === "FLOAT") return "dimension";
  if (v.resolvedType === "STRING") return "string";
  if (v.resolvedType === "BOOLEAN") return "boolean";
  return "other";
}

function dtcgValue(
  raw: RawValue,
  type: string,
  idToPath: Map<string, string[]>,
): unknown {
  if (raw && typeof raw === "object" && "type" in raw && raw.type === "VARIABLE_ALIAS") {
    const path = idToPath.get(raw.id);
    return path ? `{${path.join(".")}}` : null;
  }
  if (type === "color" && raw && typeof raw === "object" && "r" in raw) {
    return rgbToHex(raw as Rgba);
  }
  if (type === "dimension" && typeof raw === "number") return `${raw}px`;
  return raw;
}

function buildTokens(data: VariablesResponse): Record<string, unknown> {
  const { variables, variableCollections } = data.meta;
  const collections = Object.values(variableCollections);

  const idToPath = new Map<string, string[]>();
  for (const c of collections) {
    for (const vid of c.variableIds) {
      const v = variables[vid];
      if (!v) continue;
      idToPath.set(v.id, [topLevelKey(c.name), ...pathSegments(v.name)]);
    }
  }

  const tokens: Record<string, unknown> = {
    $meta: {
      source: `Figma file ${FILE_KEY}`,
      pulledAt: new Date().toISOString().slice(0, 10),
      collections: collections.map(c => ({
        name: c.name,
        id: c.id,
        modes: c.modes.map(m => m.name),
        variableCount: c.variableIds.length,
      })),
    },
  };

  for (const c of collections) {
    const modeId = c.defaultModeId;
    for (const vid of c.variableIds) {
      const v = variables[vid];
      if (!v) continue;

      const path = idToPath.get(v.id)!;
      const $type = dtcgType(v);
      const $value = dtcgValue(v.valuesByMode[modeId]!, $type, idToPath);

      let node = tokens as Record<string, unknown>;
      for (let i = 0; i < path.length - 1; i++) {
        const seg = path[i]!;
        if (!node[seg] || typeof node[seg] !== "object") node[seg] = {};
        node = node[seg] as Record<string, unknown>;
      }
      node[path[path.length - 1]!] = { $value, $type };
    }
  }

  return tokens;
}

async function pullViaRestApi(token: string): Promise<VariablesResponse> {
  const res = await fetch(
    `https://api.figma.com/v1/files/${FILE_KEY}/variables/local`,
    { headers: { "X-Figma-Token": token } },
  );
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Figma API ${res.status}: ${body.slice(0, 300)}`);
  }
  return res.json() as Promise<VariablesResponse>;
}

async function main(): Promise<void> {
  const token = process.env.FIGMA_ACCESS_TOKEN;

  if (!token) {
    console.error(
      [
        "FIGMA_ACCESS_TOKEN is not set.",
        "",
        "To refresh tokens, either:",
        "  (a) Run inside Claude Code with the Figma MCP active.",
        "      Ask: \"refresh tokens/figma-export.json from Figma\".",
        "  (b) Set FIGMA_ACCESS_TOKEN and re-run (requires Enterprise/Org plan).",
      ].join("\n"),
    );
    process.exit(1);
  }

  console.log(`Pulling variables from file ${FILE_KEY}…`);
  const data = await pullViaRestApi(token);
  const tokens = buildTokens(data);
  writeFileSync(OUTPUT_PATH, JSON.stringify(tokens, null, 2) + "\n");
  console.log(`Wrote ${OUTPUT_PATH}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
