---
name: Logistics Precision
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#0051d5'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#002113'
  on-tertiary-container: '#009668'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.03em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

The design system establishes a high-performance, utilitarian aesthetic tailored for fast-paced logistics environments. It bridges industrial reliability with contemporary digital craftsmanship, engineered specifically for single-handed mobile execution under demanding warehouse conditions: fluctuating ambient light, repetitive scanning actions, and split-second operational decisions.

### Key Personality & Principles
- **Operational Clarity:** High-contrast surfaces and clear visual cues eliminate cognitive fatigue. Data density is balanced with generous interactive targets.
- **Directional Velocity:** Asymmetric state indicators clearly distinguish between intake (*entradas*) and dispatch (*salidas*) workflows.
- **Ergonomic Resilience:** Critical actions sit strictly within thumb reach along the bottom half of the viewport, with generous touch targets (minimum 48×48dp).
- **Aesthetic Direction:** Modern Industrial Precision—combining structured flat surfaces, razor-sharp status badges, and subtle tonal separation.

## Colors

The palette balances deep structural slate tones with deliberate functional accents to establish instant hierarchy.

### Functional Roles
- **Base Slate (`#0F172A`):** Anchors navigation bars, structural typography, primary CTA buttons, and high-priority barcode indicators.
- **Tech Cyan/Blue (`#2563EB`):** Applied to active states, focused form controls, scan overlays, and navigational highlights.
- **Inbound Green (`#10B981`):** Reserved exclusively for incoming inventory (*entradas*), verified stock counts, and positive receipts.
- **Outbound Crimson (`#F43F5E`):** Reserved strictly for outbound stock (*salidas*), stockout alerts, defective item quarantine flags, and threshold drops.
- **Canvas & Surface System:** 
  - Canvas: `#F8FAFC`
  - Base Cards: `#FFFFFF`
  - Subtle Dividing Surface: `#E2E8F0`
  - Slate Muted Text: `#64748B`

## Typography

The typographic hierarchy couples **Hanken Grotesk**—an ultra-clean, legible neo-grotesque sans-serif with tall x-height—with **JetBrains Mono** for all data-dense alphanumeric values (SKUs, bin locations, lot numbers, barcodes, quantities).

### Rules
- Never set SKU or lot codes in proportional fonts; use `label-lg` or `label-md` with `JetBrains Mono` for rapid scanning and tabular number alignment.
- Headings use negative letter spacing (`-0.02em` to `-0.01em`) to tighten character density on mobile displays.
- All uppercase labels must carry positive tracking (`0.02em` to `0.05em`) to ensure legibility when viewed in motion or under industrial warehouse lighting.

## Layout & Spacing

A 4-column fluid mobile grid anchored to an 8px base rhythm (with 4px sub-grid allowances).

### Structure
- **Mobile Canvas:** 16px (`1rem`) outer screen margins, 12px (`0.75rem`) gutters between structural grid columns.
- **Tablet / Rugged Terminal View:** 24px (`1.5rem`) outer margin, 16px (`1rem`) gutters on an 8-column layout.
- **Thumb-Zone Safe Padding:** Interactive bottom-sheet action areas must sit above a minimum 88px clearance zone to account for system bars and one-handed thumb arcs.

## Elevation & Depth

To maximize performance on ruggedized Android and iOS scanning terminals, this design system replaces heavy blur-heavy shadows with a hybrid approach of **tonal layering and crisp micro-borders**.

### Elevation Scale
- **Level 0 (Canvas):** Flat `#F8FAFC` base surface.
- **Level 1 (Card Default):** Solid `#FFFFFF` card surface bound by a 1px solid border in `#E2E8F0`. No ambient shadow.
- **Level 2 (Active/Floating Cards & Scanner Trays):** Solid `#FFFFFF` card with a 1px solid `#CBD5E1` border and a directional floor shadow: `0 4px 12px -2px rgba(15, 23, 42, 0.08)`.
- **Level 3 (Modals & Action Sheets):** `#FFFFFF` surface elevated over an 80% opacity `#0F172A` backdrop scrim, framed with `0 12px 32px -4px rgba(15, 23, 42, 0.16)`.

## Shapes

The geometric architecture pairs softened outer card enclosures with structured, compact inner elements.

### Curvature Tokens
- **Cards & Bottom Sheets:** Formed with `rounded-2xl` (16px / `1rem`) corner radiuses to establish a modern, tactile mobile silhouette.
- **Controls & Buttons:** Standardized to 8px (`0.5rem`) to ensure tight visual cohesion and maximum usable label surface.
- **Badges & Micro-Pills:** Set to 6px or fully circular caps (`pill-shaped` for quantity counters only).
- **Barcode & QR Target Reticles:** 8px corner curves with open center viewports.

## Components

### Buttons
- **Primary Action (Scan / Confirm):** Height: 52px (optimized for single-thumb hits). Surface `#0F172A`, text `#FFFFFF`, radius 8px. Pressed state `#1E293B`.
- **Accent Action (Quick Entrada):** Surface `#10B981`, text `#FFFFFF`.
- **Alert Action (Quick Salida):** Surface `#F43F5E`, text `#FFFFFF`.
- **Secondary / Ghost:** 1px border `#CBD5E1`, text `#0F172A`, background `#FFFFFF`.

### Badges & Status Indicators
- **Entrada (Inbound):** Background `#ECFDF5`, text `#065F46`, 1px solid `#A7F3D0`. Uses `JetBrains Mono` 11px uppercase.
- **Salida (Outbound):** Background `#FFF1F2`, text `#9F1239`, 1px solid `#FECDD3`. Uses `JetBrains Mono` 11px uppercase.
- **SKU Tag:** Background `#F1F5F9`, text `#334155`, 1px solid `#E2E8F0`.

### Cards & Stock List Items
- Cards feature a pure white `#FFFFFF` body with a 16px corner radius, framed by a 1px border in `#E2E8F0`.
- Left-edge functional accent rails (4px thick solid color line) indicate category or stock status:
  - Inbound queue: `#10B981`
  - Outbound dispatch: `#F43F5E`
  - Staged inventory: `#2563EB`
- Internal padding: 16px (`1rem`).

### Inputs & Barcode Fields
- Height: 48px min. Surface `#FFFFFF`, 1.5px border `#CBD5E1`.
- Focused state: 2px border `#2563EB` with `#EFF6FF` background tint.
- Barcode Scan Trigger: Affixed icon button on the trailing edge (minimum tap target 44×44px).

### Selection Controls (Checkboxes & Radios)
- 22×22px dimensions with 4px corner radius for checkboxes; 22px diameter for radio buttons.
- Active state fills with `#0F172A` with a crisp white checkmark/dot.