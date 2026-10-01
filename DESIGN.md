---
name: KZN Marketing Studio
description: Pagina limpa de agencia onde so a tipografia e um vermelho fazem o trabalho; secoes solidas quase todas em preto, alternando dois tons de preto.
colors:
  black: "#08080a"
  black-2: "#101013"
  black-3: "#18181c"
  white: "#ffffff"
  gray: "#f5f5f6"
  red: "#e4111d"
  red-deep: "#c40d18"
  red-text-on-dark: "#ff4651"
  red-text-on-light: "#d4101b"
  ink: "#101014"
  muted-on-dark: "#a9a9b4"
  muted-on-light: "#5a5a66"
  line-on-light: "#e3e3e7"
typography:
  hero:
    fontFamily: "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(2.2rem, 0.9rem + 3.1vw, 4.1rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "clamp(1.85rem, 1rem + 2.6vw, 3.35rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.05rem + 0.5vw, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "clamp(1.02rem, 0.96rem + 0.3vw, 1.2rem)"
    fontWeight: 400
    lineHeight: 1.65
  body:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 500
    lineHeight: 1.2
rounded:
  field: "14px"
  card: "24px"
  panel: "32px"
  pill: "999px"
spacing:
  gutter: "clamp(18px, 4.2vw, 56px)"
  section-y: "clamp(76px, 10vw, 148px)"
  container: "1240px"
  grid-gap: "16px"
components:
  button-primary:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    height: "58px"
    padding: "0 8px 0 30px"
  button-primary-hover:
    backgroundColor: "{colors.red-deep}"
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    height: "58px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    height: "58px"
  card-service:
    backgroundColor: "{colors.black-3}"
    textColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "26px"
  card-quote:
    backgroundColor: "{colors.gray}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "28px"
  panel-case:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
    rounded: "{rounded.panel}"
  field-input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    height: "56px"
    padding: "0 17px"
  chip-option:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "46px"
  chip-option-selected:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
  nav-bar:
    backgroundColor: "{colors.black-2}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    height: "66px"
---

# Design System: KZN Marketing Studio

## Overview

**Creative North Star: "The Clean Ledger"**

A single-page agency site where typography and one red do all the work. Sections are flat, solid fields that are almost all black, alternating two black steps (#08080a and #101013, the second via .section--alt); white appears only in the form card, and the on-light and on-gray themes remain available per section; the page turns from one to the next like pages, with no texture, gradient, glass or blurred glow. Poppins is the only family. Red is spent sparingly: the primary button, one highlighted word per heading, the single moving band, the case panel and small icon accents.

Density is low and the rhythm is generous (section padding 76px to 148px). Motion is confined to transform and opacity: headings reveal word by word through a mask, the method rule fills with red as it scrolls, and buttons lift while their arrow chip rotates.

**Key Characteristics:**
- Per-section theme (dark, light, gray) set by a class that swaps foreground, muted, line, card, accent and field variables.
- One red, with two text variants tuned for contrast per background.
- Pill buttons with a circular arrow chip; 24px cards; 14px fields; pill nav bar.
- Solid fills only; the only shadows are short-offset, short-blur and neutral.
- Phosphor regular icons, filled with currentColor.

## Colors

Two steps of black as the stage, white only for the form card, with one red as the only chroma.

### Primary
- **Signal Red** (red): primary button, selected chip, open FAQ marker, active flow icon, method fill line, and the case figures.
- **Pressed Red** (red-deep): hover state of the primary button; keeps AA with white text.
- **Red Text on Black** (red-text-on-dark): highlighted heading word, links, icon accents on dark sections.
- **Red Text on White** (red-text-on-light): the same roles on white and grey sections.

### Neutral
- **Ink Black** (black): hero, page and sheet background. **Deep Black** (black-2): nav bar, dropdown menus, services section. **Card Black** (black-3): cards on dark sections.
- **White** (white) and **Mist Grey** (gray): light sections; grey doubles as card fill on white and page fill on grey sections.
- **Ink** (ink): text on light sections and the dark button fill.
- **Muted** (muted-on-dark / muted-on-light): body copy and captions, about 8:1 on black and 6.9:1 on white.
- **Hairline** (line-on-light, or white at 12% on dark): dividers and card borders.

### Named Rules
**The One Red Rule.** Red is the only chroma. It marks action, one emphasis word, and the case figures; never decorative fills, never a second accent.
**The Theme Class Rule.** A section picks on-dark (default), on-light or on-gray and reads colors from variables; do not hard-code foreground or card colors inside a section.

## Typography

**Display Font:** Poppins (with system-ui, Segoe UI, Roboto fallback)
**Body Font:** Poppins
**Label Font:** Poppins

**Character:** One geometric family carried by weight and tight tracking rather than pairing. Headlines are heavy and compressed; body is plain 400.

### Hierarchy
- **Hero** (700, clamp 2.2rem to 4.1rem, 1.04): the one page title, centered, balanced wrap, tracking -0.035em.
- **Headline** (600, clamp 1.85rem to 3.35rem, 1.08): section titles, tracking -0.03em, max 17em.
- **Title** (600, 1.25rem to 1.5rem, 1.2): service card titles; step verbs and metric values scale larger at the same weight.
- **Lead** (400, 1.02rem to 1.2rem, 1.65): hero subtitle and intros, muted.
- **Body** (400, 1rem, 1.7): max 34rem.
- **Label** (500 to 600, 0.88rem to 1rem): nav links, field labels, buttons (600 at 1rem).

### Named Rules
**The Weight Not Face Rule.** Hierarchy comes from weight (400, 500, 600, 700) and size; never add a second family.
**The Tight Heading Rule.** Display and headline sizes carry negative tracking (-0.02em to -0.035em); body never does.

## Layout

Single column on mobile, switching to 5/7, 6/5, 7/5 or 4/7 two-column grids at 1024px; services go 2-up at 640px and 4-up at 1100px; the method is 4-up at 900px. Container is 1240px (1360px from 1700px) inside a fluid gutter of 18px to 56px. Section padding is fluid 76px to 148px. Card grids use 14px to 16px gaps. Side text columns are sticky (top 120px to 130px) beside long content. The nav collapses to a full-screen sheet below 1100px. Section order alternates themes: hero black, red band, white, black, white, grey, black, white with red case panel, grey, white, black, footer black.

## Elevation & Depth

Flat by default; depth comes from tonal steps between sections and cards, and 1px hairlines. Shadows exist only as short, neutral, offset ones.

### Shadow Vocabulary
- **Nav on scroll** (`box-shadow: 0 18px 30px -18px rgba(0,0,0,0.75)`): the pill bar once the page scrolls.
- **Dropdown** (`box-shadow: 0 30px 50px -24px rgba(0,0,0,0.9)`): open menus.
- **Feature hover** (`box-shadow: 0 14px 22px -16px rgba(16,16,20,0.3)`): light feature cards on hover.
- **Field focus ring** (`box-shadow: 0 0 0 4px rgba(228,17,29,0.14)`): input focus, with a red border.

### Named Rules
**The Solid Surface Rule.** No gradient fills, blur, glass or texture. The only gradient in the CSS is a scrim over an optional service photo. The one photograph on the page is the client's cover in the hero, denoised at the file level and shown with no filter, scale or veil on top.

## Shapes

Pills for anything you press (buttons, chips, nav bar, nav links, skip link); 24px for cards (service, steps, quotes), 20px for feature rows and logo slots at 18px, 14px for fields and status boxes, 16px to 22px for menu items and menus, 32px for the case panel, 28px for the form shell. Arrow chips and icon toggles are perfect circles (42px, 36px small). Icon tiles are 14px to 16px rounded squares. Dividers are 1px hairlines; the method step line is 2px.

## Components

### Buttons
- **Shape:** pill (999px), 58px tall (48px small), 600 weight.
- **Primary:** Signal Red fill, white text, with a 42px white circular chip holding a red arrow; right padding shrinks to 8px to seat the chip.
- **Dark:** ink fill, red chip. **Outline:** 1.5px border at 28% of foreground, chip filled with foreground color.
- **Hover / Active:** lifts 2px, primary darkens to Pressed Red, the chip rotates -45deg (arrow points up and right); active scales to 0.985. Magnetic buttons skip the CSS lift. Focus is a 2px accent outline at 3px offset.
- **Text link:** bold with a 2px underline and an arrow that slides 4px; turns accent on hover.

### Cards / Containers
- **Service card:** vertical 9:16 (the size of the Exclusive Car video card, up to about 380px wide and 667px tall on a large monitor), 24px radius, Card Black fill, 1px hairline, 24px padding, in a wider 1560px container; title and a circular arrow chip on top, a photo area in the middle (without a photo it shows a white 72px to 96px icon tile with a red icon; with an `img.svc__photo` the photo fills the card under a dark scrim), lead and text at the bottom. On mobile the four cards are a horizontal scroll-snap row. On hover it lifts 6px, the border turns red, the icon tile fills red and the arrow rotates 45deg and fills red.
- **Quote / steps:** 24px, card variable fill, no border, no shadow.
- **Contact:** two columns from 1024px (5/6). Left: heading, lead, channel cards (WhatsApp outlined in red with a red icon tile, Instagram and e-mail with white icon tiles; a channel that has no configured link is hidden) and three check-marked assurances. Right: the form in a 28px card on the second black step with a thin red arc that rotates around its border (7s, off under reduced motion), outlined pill chips that show a check when selected, and a red pill submit with the arrow chip. At the foot of the section the KZN Marketing Studio logo is shown very large at 7.5% opacity, bleeding off the bottom edge.
- **Case:** on black (second step). Two brand labels, one white and one black, tilted -6deg and +4deg with a deep short shadow, sit beside the heading; below them a 24px bordered bar of four metric cells divided by 1px white hairlines, each value in red text with its label under it.

### Inputs / Fields
- **Style:** 56px, 14px radius, 1.5px border (#d3d3da), field-variable fill, 1rem text.
- **Focus:** border turns red plus a 4px 14% red ring. **Error:** border #d4101b with red helper text below.
- **Chips:** pill 46px, 1.5px border; selected fills red with white text.

### Navigation
Floating pill bar 66px tall, 14px from the top, Deep Black with a 10% white hairline. Links are 500 weight 0.92rem pills that gain a 9% white fill on hover or current. Three dropdown menus (22px radius) carry a red icon and a two-line item. The logo shows only KZN (also on phones and tablets) and opens to the full wordmark on hover at 1100px and up with a mouse. Below 1100px a circular toggle opens a full-screen black sheet with 1.35rem links.

### Hero Curtain
The hero is the client's cover photo filling the whole screen (100svh) and is `position: sticky` at the top; the next section scrolls up over it like a curtain, with a 32px rounded top edge and a 1px white hairline at 16%. While it is covered the photo scales to 1.12, the content moves up 7% and fades to 25%, and a black shade rises to 78% (scroll-driven, transform and opacity only). Two CTAs sit under the lead: the red pill with an arrow chip ("Quero estruturar meu marketing") and an outlined pill with a down-arrow chip ("Saiba mais") that scrolls the second screen flush to the top. On phones the two buttons stack at the same width; below 560px of viewport height the hero stops being sticky so nothing is cut.

### FAQ
Hairline-ruled rows, 76px minimum, a 38px circular marker that fills red and rotates 135deg when open; answers expand via grid-template-rows.

## Do's and Don'ts

### Do:
- **Do** keep sections black and alternate the two black steps with .section--alt; switch a section to on-light or on-gray only on purpose, and let variables supply colors.
- **Do** use Signal Red only for action, one emphasis word and the case figures, and the contrast-tuned text reds for text.
- **Do** make every primary action a pill with the circular arrow chip that rotates on hover.
- **Do** keep radii to the set: pill, 24px cards, 14px fields.
- **Do** animate transform and opacity only, and keep a no-JS and reduced-motion fallback.

### Don't:
- **Don't** add gradients, grain, glass, blur or colored glow; the earlier glass-red, noir-lines and photo-table directions were rejected and are not part of this system.
- **Don't** introduce a second typeface or a second accent color.
- **Don't** use #e4111d for small text; use the on-dark or on-light text reds.
- **Don't** use Japanese characters anywhere in the KZN site.
- **Don't** let a card or button show a shadow at rest.
