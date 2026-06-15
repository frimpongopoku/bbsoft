# Biibisoft Quote Document — Redesign Spec

## What Changed and Why

The previous design used orange as a primary background color across the header, section headers, badges, and borders. This made the document feel loud and unpolished. The redesign flips the logic: **orange is now an accent only**, used in exactly three places. Navy becomes the primary brand expression, and the rest of the document stays white/off-white.

---

## Color Palette

| Token | Hex | Used For |
|---|---|---|
| Navy | `#1C2B3A` | Header background, footer brand text, primary body text |
| Navy Card | `#243347` | Summary card inside the header |
| Navy Border | `#2A3E55` | Borders within navy sections |
| Navy Muted | `#527494` | Subdued text within navy sections |
| Orange | `#E8590C` | Price figure, highlighted values, Total Estimate left border |
| White | `#FFFFFF` | Page background |
| Off-White | `#F7F6F4` | Section card headers, meta bar, Total Estimate strip |
| Border | `#E5E7EB` | Dividers, card borders throughout the document |
| Text Primary | `#1C2B3A` | All primary body text |
| Text Secondary | `#6B7A8D` | Table row labels |
| Text Label | `#9AA5B4` | Section eyebrows, meta labels, subdued annotations |
| Text Body | `#4A5568` | Paragraph content (store cards, option description) |

**Rule:** Orange only appears on the price, the two key values in the summary card (Timeline, Ref), and the left border of the Total Estimate block. Nowhere else.

---

## Typography

| Role | Typeface | Weight | Size | Usage |
|---|---|---|---|---|
| Display | Playfair Display | 700 | 22–38px | Quote title, price figure, Total Estimate amount |
| Body | Inter | 400–600 | 9–13px | Everything else |

**Google Fonts import:**
```
https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap
```

**Type scale:**
- Price: Playfair Display 700, 38px, `#E8590C`
- Quote title: Playfair Display 600, 22px, `#FFFFFF`
- Total amount: Playfair Display 700, 22px, `#1C2B3A`
- Section eyebrows / labels: Inter 700, 9px, uppercase, letter-spacing 0.14–0.20em
- Table labels: Inter 400, 12px, `#6B7A8D`
- Table values: Inter 600, 12px, `#1C2B3A`
- Body text: Inter 400, 11px, `#4A5568`, line-height 1.6

---

## Page 1 Layout

### Header (full-width, navy background `#1C2B3A`)

Two-column layout: **left** holds the brand + title + price, **right** holds the summary card.

**Left column:**
- Brand mark: small orange dot (`#E8590C`, 7px circle) + `BIIBISOFT` in Inter 600 with 0.15em letter-spacing
- Subdued tagline below in `#527494`
- Quote title in Playfair Display
- Price in Playfair Display 700 at 38px in orange, followed by `USD` label, a 1px vertical divider, and `GHS 28,120` in muted navy text

**Right column — Summary Card:**
- Background: `#243347` (slightly lighter than header)
- Border: `1px solid #2A3E55`
- Border radius: 6px
- Each row: label in `#527494` (uppercase, 9px) / value in white Inter 600 (11px)
- Highlighted values (Timeline, Ref): `#E8590C` instead of white
- No green. No contrasting color. The card sits quietly inside the navy.

### Meta Bar

Sits between header and body. Background `#F7F6F4`, 0.5px bottom border `#E5E7EB`.

Three items spread across: Generated / Reference / Valid. Labels in `#9AA5B4`, values in Inter 600 `#1C2B3A`.

### Body

Padding: 24px top/bottom, 36px left/right.

**Section eyebrow** — "QUOTE BREAKDOWN" in 9px Inter, uppercase, `#9AA5B4`, 0.2em letter-spacing.

**Project Configuration card:**
- Outer: 0.5px border `#E5E7EB`, border-radius 8px
- Card header strip: background `#F7F6F4`, 9px uppercase label in `#1C2B3A`
- Rows: 10px vertical padding, 0.5px bottom divider `#F0F0EF`
- Accent values (Pace Multiplier, Timeline): `#E8590C`

**Tech Stack block:**
- Simple bordered box (0.5px `#E5E7EB`, border-radius 8px)
- Label above in 9px uppercase `#9AA5B4`
- Stack value in Inter 600, 13px, `#1C2B3A`
- No badge/chip/pill — just clean label + value

**Total Estimate block:**
- `border-left: 3px solid #E8590C` — this is the orange accent moment
- Background: `#F7F6F4`
- **No border-radius** (single-sided border, so corners stay square)
- Left: "TOTAL ESTIMATE" in 9px uppercase `#9AA5B4`
- Right: amount in Playfair Display 22px `#1C2B3A`, GHS sub-label in 10px `#9AA5B4`

**Deployment note** — 9px uppercase `#9AA5B4` with a top divider, pointing to page 2. Replaces the cut-off section header from the previous version.

### Footer

0.5px top border. Left: brand name + tagline. Right: email + ref number. Both in small Inter, muted.

---

## Page 2 Layout

### Page Header

Minimal strip: `BIIBISOFT` brand name left, `Ref: BSQ-SMPK94 · Page 2 of 2` right. 0.5px bottom border. No orange band.

### Body

Same padding as page 1 (24px / 36px).

**Section title** — "PLATFORM REVIEW OVERVIEW" with a `2px solid #E8590C` bottom border as an underline. Displayed inline (not full-width) so the orange underline is tight to the text width.

**Store Cards (2-column grid, gap 14px):**
- Each card: 0.5px border `#E5E7EB`, border-radius 8px, 14px padding
- Card title: 10px uppercase Inter 700, bottom divider
- Sub-labels (Review Time / Account Cost / Key Requirements): 8px uppercase Inter 700, `#E8590C`
- Body text: Inter 400, 11px, `#4A5568`
- Bullet points: proper `•` character via CSS `::before`, not `-` dashes

**Option A card:**
- Background `#F7F6F4`, 0.5px border, border-radius 8px
- Title: Inter 600, 12px, `#1C2B3A`
- Body: Inter 400, 11px, `#4A5568`, line-height 1.6

### Footer

Same as page 1.

---

## Things to Suppress

- **"Modules: 0 selected"** — hide this field when no modules are selected. Do not show empty states to clients.
- **Broken currency symbols** — use `GHS` (text) rather than the `₵` Unicode glyph if the rendering environment can't guarantee it. Confirm before using the symbol.
- **App store icon glyphs** — do not use Unicode characters as stand-ins for brand logos. Use text labels or proper SVG icons.

---

## What Not to Do

- Do not use orange as a background color anywhere
- Do not add colored borders to the summary card — it should recede inside the header
- Do not use pill/badge UI elements for the tech stack
- Do not display placeholder or empty states in client-facing output
- Do not use `-` dashes as bullet points
- Do not add `border-radius` to elements that only have a border on one side
