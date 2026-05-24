import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Placeholder verification story for Phase 1.
 *
 * Renders every CSS custom property defined in `src/styles/tokens.css` so
 * the pipeline (Figma export → Style Dictionary → tokens.css → Storybook)
 * can be eyeballed end-to-end before any real component code is written.
 * Replace or remove once real component stories exist.
 */

const DEFAULT_RAMP_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

const RAMPS: ReadonlyArray<{
  name: string;
  prefix: string;
  steps: ReadonlyArray<number>;
}> = [
  { name: 'Primary · Orange', prefix: 'color-primary-orange', steps: DEFAULT_RAMP_STEPS },
  { name: 'Secondary · Neutral', prefix: 'color-secondary-neutral', steps: DEFAULT_RAMP_STEPS },
  { name: 'Accent · Blue', prefix: 'color-accent-blue', steps: DEFAULT_RAMP_STEPS },
  { name: 'Accent · Green', prefix: 'color-accent-green', steps: DEFAULT_RAMP_STEPS },
  { name: 'Accent · Yellow', prefix: 'color-accent-yellow', steps: DEFAULT_RAMP_STEPS },
  { name: 'Accent · Red', prefix: 'color-accent-red', steps: DEFAULT_RAMP_STEPS },
];

const PRIMITIVE_BACKGROUNDS = [
  'background-white',
  'background-light-grey',
  'background-black',
  'background-navy-blue',
] as const;

const OTHER_PRIMITIVES = ['primary-charcoal'] as const;

const SEMANTIC_GROUPS = [
  {
    title: 'Background',
    tokens: [
      { name: 'background-page', aliasOf: 'background-white' },
      { name: 'background-surface', aliasOf: 'background-light-grey' },
      { name: 'background-overlay', aliasOf: 'background-navy-blue' },
      { name: 'background-inverse', aliasOf: 'background-black' },
    ],
  },
  {
    title: 'Brand',
    tokens: [
      { name: 'brand-primary', aliasOf: 'primary-orange-500' },
      { name: 'brand-primary-hover', aliasOf: 'primary-orange-600' },
      { name: 'brand-primary-active', aliasOf: 'primary-orange-700' },
      { name: 'brand-primary-subtle', aliasOf: 'primary-orange-100' },
      { name: 'brand-primary-light', aliasOf: 'primary-orange-50' },
      { name: 'brand-navy', aliasOf: 'background-navy-blue' },
    ],
  },
  {
    title: 'Text',
    tokens: [
      { name: 'text-default', aliasOf: 'secondary-neutral-900' },
      { name: 'text-secondary', aliasOf: 'secondary-neutral-700' },
      { name: 'text-tertiary', aliasOf: 'secondary-neutral-500' },
      { name: 'text-disabled', aliasOf: 'secondary-neutral-400' },
      { name: 'text-inverse', aliasOf: 'background-white' },
      { name: 'text-link', aliasOf: 'primary-orange-500' },
      { name: 'text-link-hover', aliasOf: 'primary-orange-600' },
    ],
  },
  {
    title: 'Border',
    tokens: [
      { name: 'border-default', aliasOf: 'secondary-neutral-200' },
      { name: 'border-strong', aliasOf: 'secondary-neutral-400' },
      { name: 'border-focus', aliasOf: 'primary-orange-500' },
      { name: 'border-subtle', aliasOf: 'secondary-neutral-300' },
    ],
  },
  {
    title: 'Status',
    tokens: [
      { name: 'status-success-default', aliasOf: 'accent-green-500' },
      { name: 'status-success-subtle', aliasOf: 'accent-green-50' },
      { name: 'status-success-text', aliasOf: 'accent-green-700' },
      { name: 'status-warning-default', aliasOf: 'accent-yellow-500' },
      { name: 'status-warning-subtle', aliasOf: 'accent-yellow-50' },
      { name: 'status-warning-text', aliasOf: 'accent-yellow-700' },
      { name: 'status-error-default', aliasOf: 'accent-red-500' },
      { name: 'status-error-subtle', aliasOf: 'accent-red-50' },
      { name: 'status-error-text', aliasOf: 'accent-red-700' },
    ],
  },
  {
    title: 'Interaction',
    tokens: [{ name: 'interaction-hover', aliasOf: 'secondary-neutral-100' }],
  },
  {
    title: 'Neutral',
    tokens: [
      { name: 'neutral-default', aliasOf: 'secondary-neutral-500' },
      { name: 'neutral-hover', aliasOf: 'secondary-neutral-600' },
      { name: 'neutral-active', aliasOf: 'secondary-neutral-700' },
      { name: 'neutral-light', aliasOf: 'secondary-neutral-50' },
      { name: 'neutral-subtle', aliasOf: 'secondary-neutral-100' },
      { name: 'neutral-disabled', aliasOf: 'secondary-neutral-100' },
    ],
  },
  {
    title: 'Accent · Blue',
    tokens: [
      { name: 'accent-blue-default', aliasOf: 'accent-blue-500' },
      { name: 'accent-blue-hover', aliasOf: 'accent-blue-600' },
      { name: 'accent-blue-active', aliasOf: 'accent-blue-700' },
      { name: 'accent-blue-light', aliasOf: 'accent-blue-100' },
      { name: 'accent-blue-subtle', aliasOf: 'accent-blue-50' },
    ],
  },
] as const;

const SCALE = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'] as const;

const SCALE_PIXELS: Record<(typeof SCALE)[number], number> = {
  xxs: 4,
  xs: 8,
  s: 12,
  m: 16,
  l: 20,
  xl: 24,
  xxl: 28,
  xxxl: 32,
};

const FONT_FAMILIES = [
  { label: 'Body · --font-family-base (Inter)', cssVar: 'var(--font-family-base)' },
  { label: 'Display · --font-family-display (Gilroy → Roboto fallback)', cssVar: 'var(--font-family-display)' },
  { label: 'Mono · --font-family-mono', cssVar: 'var(--font-family-mono)' },
] as const;

const styles: Record<string, CSSProperties> = {
  page: {
    fontFamily: 'var(--font-family-base)',
    color: 'var(--color-text-default)',
    backgroundColor: 'var(--color-background-page)',
    padding: 32,
    maxWidth: 1200,
    margin: '0 auto',
    boxSizing: 'border-box',
  },
  h1: { margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.01em' },
  lead: { margin: '8px 0 40px', color: 'var(--color-text-secondary)', maxWidth: 720 },
  sectionTitle: {
    margin: '0 0 16px',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--color-text-tertiary)',
  },
  section: { marginBottom: 48 },
  rampLabel: { fontSize: 13, fontWeight: 500, marginBottom: 8 },
  rampRow: { display: 'flex', gap: 4, marginBottom: 24 },
  stepCell: { flex: 1 },
  swatch: {
    height: 56,
    borderRadius: 'var(--radius-xs)',
    border: '1px solid var(--color-border-default)',
  },
  stepLabel: { fontSize: 11, marginTop: 4, color: 'var(--color-text-tertiary)' },
  semGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: 12,
    marginBottom: 24,
  },
  semGroupTitle: { fontSize: 12, fontWeight: 600, margin: '16px 0 8px', color: 'var(--color-text-secondary)' },
  semCard: {
    padding: 12,
    borderRadius: 'var(--radius-s)',
    border: '1px solid var(--color-border-default)',
    backgroundColor: 'var(--color-background-surface)',
    display: 'flex',
    gap: 12,
    alignItems: 'center',
  },
  semChip: {
    width: 36,
    height: 36,
    borderRadius: 'var(--radius-xs)',
    border: '1px solid var(--color-border-subtle)',
    flexShrink: 0,
  },
  semName: { fontSize: 12, fontWeight: 500, lineHeight: 1.3 },
  semAlias: { fontSize: 11, color: 'var(--color-text-tertiary)', marginTop: 2 },
  scaleRow: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 },
  scaleLabel: { width: 80, fontSize: 12, fontFamily: 'var(--font-family-mono)' },
  scaleValue: { width: 60, fontSize: 11, color: 'var(--color-text-tertiary)' },
  radiusBox: {
    width: 72,
    height: 72,
    backgroundColor: 'var(--color-brand-primary-subtle)',
    border: '1px solid var(--color-brand-primary)',
  },
  radiusRow: { display: 'flex', gap: 16, flexWrap: 'wrap' },
  fontSample: {
    padding: 20,
    border: '1px solid var(--color-border-default)',
    borderRadius: 'var(--radius-s)',
    marginBottom: 12,
  },
  fontLabel: { fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 8, fontFamily: 'var(--font-family-mono)' },
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={styles.section}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

function ColorRamp({
  name,
  prefix,
  steps,
}: {
  name: string;
  prefix: string;
  steps: ReadonlyArray<number>;
}) {
  return (
    <div>
      <div style={styles.rampLabel}>{name}</div>
      <div style={styles.rampRow}>
        {steps.map((step) => (
          <div key={step} style={styles.stepCell}>
            <div style={{ ...styles.swatch, backgroundColor: `var(--${prefix}-${step})` }} />
            <div style={styles.stepLabel}>{step}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OtherPrimitives() {
  return (
    <div style={styles.semGrid}>
      {OTHER_PRIMITIVES.map((name) => (
        <div key={name} style={styles.semCard}>
          <div style={{ ...styles.semChip, backgroundColor: `var(--color-${name})` }} />
          <div>
            <div style={styles.semName}>--color-{name}</div>
            <div style={styles.semAlias}>primitive</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PrimitiveBackgrounds() {
  return (
    <div style={styles.semGrid}>
      {PRIMITIVE_BACKGROUNDS.map((name) => (
        <div key={name} style={styles.semCard}>
          <div style={{ ...styles.semChip, backgroundColor: `var(--color-${name})` }} />
          <div>
            <div style={styles.semName}>--color-{name}</div>
            <div style={styles.semAlias}>primitive</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SemanticTokens() {
  return (
    <>
      {SEMANTIC_GROUPS.map((group) => (
        <div key={group.title}>
          <div style={styles.semGroupTitle}>{group.title}</div>
          <div style={styles.semGrid}>
            {group.tokens.map((t) => (
              <div key={t.name} style={styles.semCard}>
                <div style={{ ...styles.semChip, backgroundColor: `var(--color-${t.name})` }} />
                <div>
                  <div style={styles.semName}>--color-{t.name}</div>
                  <div style={styles.semAlias}>→ --color-{t.aliasOf}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

function SpacingScale() {
  return (
    <div>
      {SCALE.map((token) => (
        <div key={token} style={styles.scaleRow}>
          <div style={styles.scaleLabel}>--spacing-{token}</div>
          <div style={styles.scaleValue}>{SCALE_PIXELS[token]}px</div>
          <div
            style={{
              height: 16,
              width: `var(--spacing-${token})`,
              backgroundColor: 'var(--color-brand-primary)',
              borderRadius: 'var(--radius-xxs)',
            }}
          />
        </div>
      ))}
    </div>
  );
}

function RadiusScale() {
  return (
    <div style={styles.radiusRow}>
      {SCALE.map((token) => (
        <div key={token}>
          <div style={{ ...styles.radiusBox, borderRadius: `var(--radius-${token})` }} />
          <div style={{ ...styles.stepLabel, marginTop: 6 }}>--radius-{token}</div>
          <div style={styles.stepLabel}>{SCALE_PIXELS[token]}px</div>
        </div>
      ))}
    </div>
  );
}

function TypographySamples() {
  return (
    <>
      {FONT_FAMILIES.map((f) => (
        <div key={f.label} style={styles.fontSample}>
          <div style={styles.fontLabel}>{f.label}</div>
          <div style={{ fontFamily: f.cssVar, fontSize: 24, fontWeight: 600 }}>
            The quick brown fox jumps over the lazy dog
          </div>
          <div style={{ fontFamily: f.cssVar, fontSize: 14, fontWeight: 400, marginTop: 8, color: 'var(--color-text-secondary)' }}>
            0123456789 — abcdefghijklmnopqrstuvwxyz — ABCDEFGHIJKLMNOPQRSTUVWXYZ
          </div>
        </div>
      ))}
    </>
  );
}

function GridWidths() {
  return (
    <div>
      <div style={styles.scaleRow}>
        <div style={styles.scaleLabel}>--grid-modal-width</div>
        <div style={styles.scaleValue}>658px</div>
        <div style={{ height: 12, width: 'var(--grid-modal-width)', backgroundColor: 'var(--color-status-success-subtle)', border: '1px solid var(--color-status-success-default)', borderRadius: 'var(--radius-xxs)' }} />
      </div>
      <div style={styles.scaleRow}>
        <div style={styles.scaleLabel}>--grid-tooltip-width</div>
        <div style={styles.scaleValue}>352px</div>
        <div style={{ height: 12, width: 'var(--grid-tooltip-width)', backgroundColor: 'var(--color-status-warning-subtle)', border: '1px solid var(--color-status-warning-default)', borderRadius: 'var(--radius-xxs)' }} />
      </div>
    </div>
  );
}

function Palette() {
  return (
    <div style={styles.page}>
      <header>
        <h1 style={styles.h1}>CRMEdge Token Palette</h1>
        <p style={styles.lead}>
          Phase 1 verification surface. Every swatch, bar and corner here is
          resolved live from <code>src/styles/tokens.css</code>, which is
          generated by Style Dictionary from <code>tokens/figma-export.json</code>.
          Aliases (semantic → primitive) propagate through CSS <code>var()</code>{' '}
          references; changing a primitive in tokens.css updates everything
          downstream automatically.
        </p>
      </header>

      <Section title="01 · Color Primitives">
        {RAMPS.map((r) => (
          <ColorRamp key={r.prefix} {...r} />
        ))}
        <div style={{ ...styles.rampLabel, marginTop: 16 }}>Backgrounds</div>
        <PrimitiveBackgrounds />
        <div style={{ ...styles.rampLabel, marginTop: 16 }}>Other</div>
        <OtherPrimitives />
      </Section>

      <Section title="02 · Semantic Colors">
        <SemanticTokens />
      </Section>

      <Section title="03 · Spacing">
        <SpacingScale />
      </Section>

      <Section title="04 · Border Radius">
        <RadiusScale />
      </Section>

      <Section title="05 · Grid">
        <GridWidths />
      </Section>

      <Section title="06 · Typography">
        <TypographySamples />
      </Section>
    </div>
  );
}

const meta: Meta<typeof Palette> = {
  title: 'Foundations/Token Palette',
  component: Palette,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Palette>;

export const All: Story = {};
