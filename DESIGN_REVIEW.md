# Design Review: Cinematic Motion Redesign

## Baseline Weaknesses

- The phase-1 site has a coherent dark palette, but it still reads like a polished resume page: vertical sections, repeated cards, and predictable grids.
- Typography is too system-default and lacks the editorial tension needed for a premium personal research identity.
- Motion is mostly entrance reveal plus a Three.js hero; sections do not have distinct pacing or transitions.
- The image use is conservative. The gallery has useful assets, but the page does not yet treat them as a memory/visual system.
- The hero is atmospheric but static in composition: portrait, text, CTA, signal strip. It needs stronger hierarchy, scale, and layered framing.
- Publications, projects, skills, and awards share similar card language, which makes the site feel generated rather than art-directed.

## Reference Takeaways

### Lando Norris

- Conceptually borrow the sense of a high-impact personal brand launch: strong intro, bold name treatment, media-forward pacing, and a page that feels like it moves through scenes.
- The saved reference screenshot mostly captured the loader, but that is still useful: the immediate brand mark, single dominant color moment, and confident transition are stronger than a normal page load.
- Avoid racing metaphors, neon-lime palette, logos, and any layout copy.

### MONOLOG

- Borrow typography-led composition, huge cropped type, textured atmosphere, and editorial spacing.
- Use a studio-like rhythm: large statements, smaller supporting copy, and strong negative space.
- Avoid copying their identity, exact hero layout, work sections, or monochrome grain treatment.

## Local Image and Media Direction

- Keep `portrait-hero.webp`, but place it in layered vertical slabs so the original red banner is less dominant.
- Use `memory-sky.webp`, `forest-lake.webp`, `aerial-neural.webp`, `saudi-city.webp`, `shoreline.webp`, and `campus-night.webp` as cinematic memory planes rather than a flat gallery.
- Add two more derivatives:
  - a technical/lab texture from the electronics photo for research-system panels.
  - a Saudi night architecture image for transitions/contact atmosphere.
- Keep `humanoid-robot.mp4` as a local muted media panel. It remains a phase-1 localhost asset and should be compressed for deployment later.
- Reference images remain moodboard-only because license safety is unknown.

## Motion System Plan

- Add a cinematic intro/loader that exits into the hero.
- Add a scroll progress rail and section markers.
- Use pointer-aware ambience for desktop through CSS variables.
- Keep the WebGL neural-field hero, but layer it behind bigger typography and image masks.
- Add a horizontal scroll-driven projects/publications runway.
- Add an orbital research/skills visualization with meaningful focus areas.
- Add a recursive memory graph motif with nested nodes/edges.
- Add masked image wipes and angled panels for gallery/media transitions.
- Respect `prefers-reduced-motion` with static fallbacks and no forced smooth-scrolling dependency.

## Typography Plan

- Use a stronger local/system stack without adding font network dependencies:
  - Display: `Bahnschrift`, `Arial Narrow`, `Impact`, fallback sans.
  - Body: `Inter`, `Segoe UI`, fallback sans.
  - Mono labels: `Cascadia Code`, `SFMono-Regular`, `Consolas`.
- Increase contrast between huge display headlines, editorial labels, and technical metadata.
- Use uppercase micro-labels and large cropped words sparingly for cinematic pacing.

## Color System Plan

- Keep deep navy/graphite as base, but reduce one-note blue through bronze, fog gray, muted teal, and controlled ember accents.
- Add ink/fog texture via CSS layers, not downloaded assets.
- Avoid gradient blobs; use linear bands, grain-like overlays, clipped panels, and mask-like transitions.

## Section Redesign Targets

- Hero: layered 3D/image/type composition, loader, progress rail, better CTA motion.
- About: editorial split with visual memory strip and recursive system diagram.
- Research: orbital visualization plus technical manifesto.
- Publications and projects: horizontal runway with scroll-driven progression.
- Experience: asymmetric lab console layout, not simple stacked panels.
- Skills: constellation bands rather than repeated cards.
- Gallery/media: depth gallery with masked image planes.
- Contact: cinematic closing panel with strong CTA and safe public links.

## Validation Plan

- Baseline screenshots saved in `design-review/baseline/`.
- Reference screenshots saved in `design-review/reference-notes/`.
- Final screenshots are saved in `design-review/final/` for hero, research/projects/gallery/contact, and mobile.
- Git commits are skipped for now because the local `.git` directory has a Windows ACL deny rule blocking index writes.

## Phase 1 Implementation Notes

- Rebuilt the page shell around a cinematic hero, intro curtain, progress rail, pointer-aware ambience, and layered portrait/media slabs.
- Added an orbital research section, recursive memory graph, horizontal project/publication runway, lab-console experience panel, constellation skills layout, depth gallery, local video panel, and stronger contact close.
- Generated and used two additional local derivatives: `lab-interface.webp` and `saudi-night.webp`.
- Replaced visible design-process copy with portfolio-facing text.
- Added contact bottom breathing room so the final section can scroll into a clean frame.

## Validation Results

- `pnpm run build` passes.
- Desktop browser QA passed: no console warnings/errors, no broken images, one rendered canvas, video ready state `4`, and zero horizontal overflow.
- Mobile hero and contact screenshots were captured at `390x844`; a later mobile QA pass timed out after screenshots, so the desktop automated QA is the stronger automated signal.
- The Vite build still reports the existing large JS chunk warning; code splitting remains a future optimization.
