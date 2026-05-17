# ImagineX Poster Creator - DESIGN.md

## 1. Product Identity

ImagineX Poster Creator is a browser-based poster studio for quickly turning event details into a downloadable event poster.

The product should feel like a small but polished creative tool, not a generic form page. The core experience is direct: users type event information, choose a visual direction, preview a poster live, upload optional artwork, and download a PNG.

Design direction: retro print studio meets modern web editor.

The memorable quality should be tactile print texture: halftone dots, screen-print grain, ink edges, paper warmth, and bold editorial poster composition.

## 2. Design Positioning

ImagineX should sit between these references:

- A lightweight Canva-style poster maker.
- A workshop project that demonstrates Python/Pillow image generation.
- A portfolio-ready creative coding product.
- A print studio interface with visible texture and craft.

It should not feel like:

- A plain Bootstrap form.
- A generic AI generator landing page.
- A purple-gradient SaaS dashboard.
- A cute template gallery with no serious visual direction.
- A complex professional design suite.

## 3. Audience

Primary users:

- Students creating workshop, club, and campus event posters.
- Hackathon participants making quick visual announcements.
- Event organizers who want a simple downloadable poster.
- Recruiters or reviewers evaluating the project as a portfolio piece.

The interface should communicate that the project is practical, visual, and intentionally designed.

## 4. Visual Theme

Theme name: Halftone Editorial Studio.

Keywords:

- Retro print
- Halftone
- Screen print
- Editorial
- Warm paper
- Ink contrast
- Maker studio
- Portfolio-grade

The web app should use a high-contrast workspace with a warm paper canvas. The poster preview is the hero. Controls should be clean and usable, while the generated poster should carry most of the expressive visual detail.

## 5. Color System

Use a print-inspired palette with strong contrast and limited accents.

### Core Tokens

- Ink Black: `#141414`
- Deep Navy Ink: `#1f2e40`
- Paper Cream: `#fff5df`
- Newsprint Beige: `#ead8b8`
- Studio White: `#fffdf6`
- Muted Graphite: `#5f6570`
- Border Ink: `rgba(20, 20, 20, 0.18)`

### Accent Tokens

- Signal Red: `#e64b3c`
- Risograph Orange: `#f08a3c`
- Screenprint Blue: `#2f6f9f`
- Faded Teal: `#4f9b8f`
- Mustard Yellow: `#e8b84a`

### Usage Rules

- Use Paper Cream or Studio White for main surfaces.
- Use Ink Black or Deep Navy Ink for primary text and poster bands.
- Use one main accent at a time inside the poster.
- Use halftone or dot overlays in accent colors, but keep opacity low enough that text remains readable.
- Avoid one-note monochrome pages. The site should feel warm, printed, and crafted.

## 6. Typography

The typography should feel editorial and poster-like.

### Recommended Fonts

Display:

- `Fraunces`
- `DM Serif Display`
- `Playfair Display`
- `Recoleta` if available

UI / Body:

- `Manrope`
- `IBM Plex Sans`
- `Source Sans 3`
- `Satoshi` if available

### Type Rules

- Use the display font for the app title, poster title, and major section headings.
- Use the sans-serif font for labels, buttons, form fields, and metadata.
- Poster titles should be large, compressed into 1 to 3 lines, and visually dominant.
- UI text should be practical and compact. Do not use giant hero text inside control panels.
- Letter spacing should be normal for body text and slightly increased only for short labels.

## 7. Texture Language

Texture is the main differentiator.

Use these texture ideas in the website and poster preview:

- Halftones
- Print texture
- Screen-print grain
- Dot matrix grid
- Slight ink misregistration
- Soft paper fiber
- Subtle ink bleed
- Risograph-style color overlap

Texture should support the poster, not make the interface noisy.

### Texture Prompt Terms

When generating artwork or poster styles, include texture terms at the end of the prompt:

- `halftone dots`
- `retro print texture`
- `screen print grain`
- `dot matrix grid`
- `risograph ink overlap`
- `paper grain`
- `slightly imperfect ink edges`

## 8. AI Poster Prompt Formula

For AI-generated poster artwork, prompts should follow this order:

1. Subject: clearly describe the event theme or main visual subject.
2. Layout and text: describe the poster composition, title area, metadata blocks, and main color palette.
3. Texture: add the print-specific texture terms last.

### Prompt Pattern

```text
[Subject / event theme]. A portrait event poster layout with a bold editorial title area, large central artwork, compact date/time/place blocks, and a [main color palette] palette. Add retro print texture, halftone dots, screen print grain, dot matrix grid, paper grain, and slightly imperfect ink edges.
```

### Example

```text
A creative coding workshop for students building visual tools. A portrait event poster layout with a bold editorial title area, large abstract geometric artwork, compact date/time/place blocks, and an ink black, paper cream, signal red, and faded teal palette. Add retro print texture, halftone dots, screen print grain, dot matrix grid, paper grain, risograph ink overlap, and slightly imperfect ink edges.
```

This order matters: subject first, layout and color second, texture last. That prevents the image from becoming a clean generic AI graphic and gives it a stronger printed-poster feeling.

## 9. Layout Principles

The first screen should be the working poster creator, not a marketing landing page.

### Desktop Layout

- Left side: editor controls.
- Right side: large poster preview.
- Top bar: brand name, GitHub link, reset, download.
- Bottom section: example presets or mini gallery.

Recommended proportions:

- Editor: 34% to 40% width.
- Preview stage: 60% to 66% width.

The poster should be centered and visually dominant. The editor should feel like a studio control desk.

### Mobile Layout

- Poster preview first.
- Editor controls below.
- Sticky bottom action row for Download and Reset.
- Presets should become horizontally scrollable chips or stacked compact buttons.

## 10. Component System

### Top Bar

The top bar should be minimal and functional:

- Brand mark or short logo.
- Product name.
- GitHub link.
- Reset button.
- Download PNG button.

The brand mark can be a simple `IX` monogram inside a square or print-label shape.

### Editor Panel

The editor panel should include:

- Event title input.
- Date input.
- Time input.
- Place input.
- Description textarea.
- Image upload.
- Visual preset selector.
- Accent color selector.

Controls should be compact, aligned, and easy to scan.

### Poster Preview

The poster preview is the product.

It should include:

- Small category label, such as `EVENT POSTER`.
- Large event title.
- Central artwork or uploaded image.
- Description block.
- Date, time, and place blocks.
- Halftone or print texture overlay.

The preview stage may use a darker or warmer background so the poster feels like a physical object sitting on a studio table.

### Preset Selector

Preset names should feel like poster styles:

- Creative Lab
- Night Market
- Campus Fair
- Tech Talk
- Music Session
- Print Club

Each preset should change:

- Background colors.
- Accent color.
- Artwork style.
- Texture strength.
- Metadata block style.

### Image Upload

The upload state should feel tactile:

- Dashed border or print-registration border.
- Drag-and-drop support.
- Small helper copy.
- Uploaded image cropped into the poster artwork area.

## 11. Poster Art Direction

The generated poster should feel printable and designed.

### Composition

- Strong top title.
- Large middle artwork zone.
- High-contrast information band.
- Three compact event metadata blocks.
- Generous outer margin.

### Visual Motifs

Use:

- Geometric shapes.
- Offset circles.
- Diagonal strokes.
- Collage-like image crops.
- Halftone fields.
- Screen-print overlaid colors.
- Paper grain.

Avoid:

- Smooth glossy gradients as the main visual language.
- Generic stock-photo hero sections.
- Overly rounded SaaS cards.
- Low-contrast text over busy images.

## 12. Motion And Interaction

Motion should be restrained and useful.

Use:

- Subtle poster preview reveal on page load.
- Button hover lift with ink-like shadow.
- Preset selected state with clear border.
- Swatch selected state with ring.
- Drag-over upload feedback.

Avoid:

- Heavy page transitions.
- Constant animated backgrounds.
- Motion that distracts from editing the poster.

## 13. Accessibility

Minimum requirements:

- All form inputs need visible labels.
- Buttons need clear text or accessible names.
- Poster controls must be keyboard reachable.
- Text contrast should remain strong on all presets.
- Uploaded image should never make event metadata unreadable.
- Mobile layout must avoid overlapping controls and poster preview.

## 14. Website Structure

Recommended sections:

1. Creator workspace: the actual tool.
2. Preset gallery: 3 to 6 example poster styles.
3. Project story: short explanation of Python Pillow prototype to web app.
4. Technical notes: canvas export, image upload, Vercel deployment.

Do not start with a generic marketing hero. The app itself should be the hero.

## 15. Stitch Prompt

Use this prompt in Stitch:

```text
Design a polished web app called ImagineX Poster Creator. It is a browser-based poster studio that turns event details into a downloadable portrait event poster. The first screen must be the actual creation tool, not a marketing landing page.

Design style: Halftone Editorial Studio. Make it feel like a modern web editor mixed with a retro print studio. Use warm paper surfaces, deep ink contrast, editorial typography, visible halftone dots, screen-print grain, subtle paper texture, dot matrix grids, and slightly imperfect ink edges. The product should feel tactile and portfolio-ready, not like a generic SaaS dashboard.

Desktop layout: a compact editor panel on the left and a large poster preview stage on the right. The editor includes event title, date, time, place, description, image upload, visual preset selector, accent color swatches, reset, and download PNG. The poster preview is the hero: portrait 768 x 1086, large editorial title, central artwork area, dark description band, date/time/place blocks, halftone texture overlay, and print-style color accents.

Mobile layout: poster preview first, controls below, sticky bottom actions for Download PNG and Reset. Keep all text readable and prevent overlap.

Visual palette: ink black, deep navy, paper cream, newsprint beige, signal red, risograph orange, screenprint blue, faded teal, and mustard yellow. Use one accent color at a time. Avoid purple AI gradients, glossy 3D, and generic white card layouts.

Typography: use a distinctive editorial serif for poster titles and product headings, paired with a clean sans-serif for UI controls. Buttons and labels should feel precise and functional.

Add a small preset gallery below the tool with styles named Creative Lab, Night Market, Tech Talk, Campus Fair, Music Session, and Print Club. Each preset card should show a mini poster thumbnail with halftone or screen-print texture.

Important: the app should look like a real tool users can interact with. Prioritize live preview, image upload, visual presets, accent colors, and PNG export controls.
```

## 16. Prompt For Generating Poster Artwork

Use this when generating individual poster artwork or default illustrations:

```text
Subject: a [event type] poster for [audience or theme].
Layout: portrait event poster, bold editorial title area, central abstract artwork, compact metadata blocks for date, time, and place, high-contrast description band, [chosen palette] colors.
Texture: halftone dots, retro print texture, screen print grain, dot matrix grid, risograph ink overlap, paper grain, slightly imperfect ink edges.
```

Example:

```text
Subject: a creative coding workshop poster for university students.
Layout: portrait event poster, bold editorial title area, central abstract artwork with geometric shapes, compact metadata blocks for date, time, and place, high-contrast description band, ink black, paper cream, signal red, and faded teal colors.
Texture: halftone dots, retro print texture, screen print grain, dot matrix grid, risograph ink overlap, paper grain, slightly imperfect ink edges.
```

## 17. Implementation Notes

The current static web app can keep using:

- `index.html`
- `styles.css`
- `script.js`
- Canvas-based poster rendering
- PNG export through `canvas.toDataURL("image/png")`

If the project grows, the next version can move to:

- Vite + React
- TypeScript
- Componentized editor and poster preview
- Preset data file
- Better image crop controls
- Export size options

## 18. Definition Of Done

The redesigned site is successful when:

- Users understand the tool immediately.
- The poster preview is visually stronger than the form.
- The halftone / print texture is clearly visible but not messy.
- Users can enter event details, upload artwork, choose a preset, and download PNG.
- The site looks credible on GitHub, Vercel, and a portfolio page.
- The project story clearly explains the evolution from Python Pillow mini challenge to deployed web poster studio.
