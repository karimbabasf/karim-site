---
name: Karim Baba
description: A card file of ruled index cards on a pale desk, typed in one sans and signed in pen.
colors:
  desk: "#e9e8e4"
  card-stock: "#fffffc"
  print-white: "#fbfbf8"
  sheet-white: "#ffffff"
  typed-black: "#16171a"
  typed-grey: "#6b6d73"
  pen-blue: "#213a8f"
  head-rule-red: "rgb(220 70 76 / 0.72)"
  line-rule-blue: "rgb(86 142 206 / 0.32)"
  clip-wire: "#8a8f96"
  highlighter: "rgb(255 226 102 / 0.7)"
typography:
  typed:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: "26px"
    letterSpacing: "normal"
    fontFeature: "\"tnum\""
  typed-head:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: "26px"
    letterSpacing: "normal"
    fontFeature: "\"tnum\""
rounded:
  card: "3px"
  print: "2px"
spacing:
  pitch: "26px"
  baseline: "18px"
  pad: "28px"
  pad-phone: "18px"
  head: "42px"
  head-name: "84px"
  gap: "16px"
  file-gap: "44px"
components:
  card:
    backgroundColor: "{colors.card-stock}"
    textColor: "{colors.typed-black}"
    typography: "{typography.typed}"
    rounded: "{rounded.card}"
    padding: "0 28px 52px"
    width: "600px"
  card-head:
    textColor: "{colors.typed-black}"
    typography: "{typography.typed-head}"
    padding: "20px 28px 0"
    height: "{spacing.head}"
  card-kind:
    textColor: "{colors.typed-grey}"
    typography: "{typography.typed}"
  link:
    textColor: "{colors.typed-black}"
    typography: "{typography.typed}"
  print:
    backgroundColor: "{colors.print-white}"
    rounded: "{rounded.print}"
    padding: "8px 8px 30px"
    width: "104px"
  resume-sheet:
    backgroundColor: "{colors.sheet-white}"
    rounded: "{rounded.print}"
    width: "55rem"
  resume-bar-link:
    textColor: "{colors.typed-black}"
    typography: "{typography.typed-head}"
    height: "44px"
---

# Design System: Karim Baba

## Overview

**Creative North Star: "The Card File"**

The site is Karim's own card file on a desk. White index cards lie on a pale grey desk, lit softly from the top left. Each card has one red head rule and faint blue rules on a fixed pitch. Every typed line sits on a rule. Karim's name and his signature are written on the cards in blue ballpoint, stroke by stroke, from single-stroke plotter data. His photo is an instax print clipped to the top card. It is the only full colour on the page.

The density is low and calm: one 600px column, one type size, and blank space measured in whole ruled lines. Hierarchy comes from weight, ink colour, position on the card and the rules, never from size. The one scale jump on the page is the handwritten name. The resume page is the same desk with a printed sheet lying on it.

The world rejects the dark portfolio (hero, project grid, stack pills) and the full-bleed notebook page. Cards are objects with edges, shadows and a slight turn, not panels.

**Key Characteristics:**
- One typed face (Geist) at one size (15px) on one pitch (26px).
- Printed rules drawn as SVG image tiles, one red head rule and pale blue line rules.
- Four inks with one job each: black, grey, pen blue, printed red.
- Handwriting plotted from stroke data and drawn on with a dash animation, never set in a script font.
- Soft layered paper shadows and a fibre noise on the stock.
- Filed cards overlap; pulling one parts the file on a spring.

## Colors

A near-neutral paper palette with one ink blue and one printed red, both kept to small marks.

### Primary
- **Ballpoint Blue** (pen-blue): Karim's hand and nothing else. The written name, the signature, and the underline drawn under a pulled card's name.

### Secondary
- **Printed Head Red** (head-rule-red): the single rule under each card's head band. Never text, never an accent.
- **Faint Line Blue** (line-rule-blue): the ruled lines every typed baseline sits on. Never text.

### Neutral
- **Desk Grey** (desk): the page ground and the browser theme colour, with a soft daylight wash from the top left.
- **Card Stock** (card-stock): every index card.
- **Print White** (print-white): the instax print's border, a touch cooler than the card so the two read as different papers.
- **Sheet White** (sheet-white): the resume sheet on the resume page.
- **Typewriter Black** (typed-black): all typed facts: names, sentences, links, focus rings.
- **Label Grey** (typed-grey): kinds, dates, the pull chevron, and the resume's touch hint.
- **Wire Grey** (clip-wire): the paperclip line only.
- **Highlighter Yellow** (highlighter): text selection only.

### Named Rules
**The Ink Law Rule.** Each ink has one job. Black types facts. Grey types kinds and dates. Pen blue is Karim's hand only (name, signature, the pulled card's underline). Red is the printed head rule only. A new element takes one of these jobs or it takes no colour.

**The One Photo Rule.** The instax print is the only full-colour thing on the page. Nothing else carries a saturated fill.

## Typography

**Display Font:** none. The display role is Karim's handwriting, plotted from EMS Neato single-stroke paths (SIL OFL) into SVG.
**Body Font:** Geist (with ui-sans-serif, system-ui, sans-serif), self-hosted through next/font, latin subset.

**Character:** One plain grotesque typed like a card in a typewriter, with tabular numerals, beside one loose ballpoint hand. The contrast between machine and hand is the whole type system.

### Hierarchy
- **Handwritten name** (pen stroke 2.2px, capital about 48px tall on desktop, 0.38 scale on phones): the one scale jump. Written across the top card's 84px head band, baseline 3px above the red rule.
- **Signature** (0.36 scale, turned -4deg): bottom right of the front card.
- **Card head** (500, 15px, 26px): project names and the Contact head, typed so the baseline sits 4px above the red rule.
- **Typed** (400, 15px, 26px): everything else. Paragraphs wrap with pretty wrapping. The column caps line length at about 544px of text.

### Named Rules
**The One Size Rule.** All typed text is 15px on a 26px pitch. Hierarchy comes from weight (400 or 500), ink and position. Never add a second typed size.

**The Plotted Hand Rule.** Handwriting is stroke data drawn with SVG paths and revealed by stroke dash, one stroke after another. Never a script or handwriting font.

## Layout

One centred column, 600px wide (full width minus 16px each side on phones). The desk pads the column 104px to 144px from the top (84px on phones) and 128px at the bottom.

Everything vertical runs on the 26px pitch. The baseline falls 18px into each line box, and each blue rule sits 2px under that, at y=20 of each 26px row. The first blue rule sits a full pitch under the red one. Blank space inside a card is always whole lines (paragraph gap one pitch, card foot two pitches, front card foot three).

Cards pad 28px left and right (18px on phones). The head band is 42px (40px on phones, 84px on the name card, 68px on phones). The file starts 44px below the name card.

Filed cards are one size, like a real pack: 10 rules on desktop, 12 on phones; the front card has 7 (8 on phones). Each filed card keeps only its strip (head plus first line) in the flow. On phones the strip grows by one rule so a wrapped one-liner still shows.

The phone breakpoint is 35rem. The resume page uses a 55rem sheet with 16px gutters, 32px from 48rem up.

## Elevation & Depth

Depth is paper on a desk: layered soft shadows, a thin hairline ring, a slight rotation, and a fibre noise multiplied over the stock. Shadows fall down and slightly right of a light at the top left. There are no hard offset shadows and no borders.

### Shadow Vocabulary
- **Card on desk** (`0 0 0 0.5px rgb(30 26 20 / 0.07), 0 1px 1px rgb(30 26 20 / 0.05), 0 10px 22px -12px rgb(30 26 20 / 0.32)`): the name card.
- **Filed card** (the card shadow plus `0 -1px 5px -1px rgb(30 26 20 / 0.11)`, ring at 0.09): each card in the file throws a little shade up onto the card behind it.
- **Print** (`0 0 0 0.5px rgb(30 26 20 / 0.1), 0 1px 2px rgb(30 26 20 / 0.12), 0 10px 18px -8px rgb(30 26 20 / 0.4)`): the instax print, lifted a little higher than a card.
- **Clip** (`drop-shadow(0.5px 1.5px 1px rgb(30 26 20 / 0.28))`): the paperclip wire.
- **Resume sheet** (`0 0 0 0.5px rgb(30 26 20 / 0.08), 0 1px 1px rgb(30 26 20 / 0.05), 0 22px 44px -22px rgb(30 26 20 / 0.4)`): a larger sheet, a longer fall.

### Named Rules
**The Warm Shadow Rule.** Every shadow is the same warm brown-black (rgb 30 26 20) at low alpha, stacked as a hairline, a contact shadow and a long soft fall. Never a neutral black, never a hard offset.

**The Slight Turn Rule.** Loose objects are turned a little: the name card -0.5deg (-0.4deg on phones), the print +4deg, the clip -4deg, the signature -4deg. Filed cards stay square, as a pack does.

## Shapes

Corners are barely rounded: 3px on cards, 2px on the print and the resume sheet. Nothing is a pill or a circle. Closed filed cards are cut by an eight-point clip-path polygon at the strip plus two rules: the cut keeps the shadow round the strip and trims the hanging part flush with the card's edges. The open shape uses the same eight points so the change is one step, and the cut returns only after a close has slid shut.

### Named Rules
**The Image Rule Rule.** Printed rules are SVG image tiles (a 1px red tile, and one tall 26px-pitch blue pattern placed at the first rule). Never hard-stop gradients: under rotation they alias into steps. The tile's line position, the baseline and the pitch change together or not at all.

## Components

### Index Card
Ruled stock with a head band, a red head rule and blue line rules.
- **Corner Style:** 3px.
- **Background:** card stock, rules as image tiles, fibre noise multiplied over it.
- **Shadow Strategy:** card on desk, or filed card inside the file.
- **Border:** none.
- **Internal Padding:** 28px sides, top set by the lead, foot in whole pitches.

### Filed Card (signature)
A project card filed behind the next. The whole strip is the pull button. The name sits left in black, the kind right in grey, then a 12px grey chevron that turns 180deg when open. The one-liner sits on the first rule.
- **Pull:** the slot's second grid row opens from 0fr to 1fr on a spring (590ms, a sampled stiffness 190, damping 21.5 curve that settles about 2% past its mark). Closing uses ease-out over 300ms.
- **Hint:** on hover or keyboard focus of a closed card, every card in front of it slides down 7px.
- **Pen underline:** when a card opens, a blue ballpoint underline draws under its name left to right (420ms, pen easing, 140ms delay), crossing the red rule 2px under the baseline. It fades out on close.
- **Focus:** a 2px black outline inset 3px around the strip. Escape closes the open card and returns focus to its pull.
- **Open content:** detail paragraph, then links in a row with the date pushed right in grey (under the links on phones).

### Links
Typed in the text's own ink with a 1px underline, offset 3px, at 28% black. On hover the underline goes full ink over 150ms. No colour change, no buttons.

### Name Card
The top card, with an 84px head band. The name is written across it on load, stroke by stroke, starting at 200ms.

### Instax Print and Clip
A 104px print (78px on phones) with an 8px border and a 30px foot, standing 70px above the card's top edge at the right, turned +4deg. The photo develops on load: it starts pale and warm and settles into full colour over 2.4s. A Gem clip on the print's left border holds it; the clip is one flat drawn wire (1.6px, wire grey), deliberately not shaded as steel.

### Front Card
The Contact card, always fully open. Resume and email on the first paragraph, X, LinkedIn and GitHub on the second, and the signature bottom right, written once when the card scrolls into view.

### Resume Bar
Two plain typed links (500 weight, 44px tall targets) above the sheet: back to the home page and download the PDF. Each carries a 15px stroked line icon (1.5px, square caps). The back arrow nudges 3px left on hover.

### Motion
Ease-out (cubic-bezier(0.22, 1, 0.36, 1)) for state changes, pen easing (cubic-bezier(0.45, 0.05, 0.55, 0.95)) for anything drawn by hand, the spring for opening a card. Reduced motion removes every animation and transition: writing appears whole, the print is already developed, cards open instantly.

## Do's and Don'ts

### Do:
- **Do** type every line at 15px on the 26px pitch and keep blank space in whole lines.
- **Do** give each ink one job: black facts, grey kinds and dates, blue for Karim's hand, red for the head rule.
- **Do** draw printed rules as SVG image tiles, with the line, baseline and pitch changed together.
- **Do** draw handwriting from stroke data and reveal it by stroke dash.
- **Do** use the warm layered paper shadows (rgb 30 26 20) and a slight turn on loose objects.
- **Do** keep the print the only full-colour element.
- **Do** honour reduced motion by showing the finished state at once.

### Don't:
- **Don't** add a second typed size or a display font; the handwritten name is the only scale jump.
- **Don't** use pen blue for links, buttons or any typed text.
- **Don't** build rules with hard-stop gradients.
- **Don't** set handwriting in a script or handwriting font.
- **Don't** add borders, pills, badges or icon tiles to cards.
- **Don't** use more than three handwritten marks on a page (name, signature, pulled-card underline).
- **Don't** shade the clip as steel or add hard offset shadows.
