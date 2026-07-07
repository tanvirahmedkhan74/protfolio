# Motion Redesign Notes

## Current Correction Pass

- Used `docs/instructions/motion_improvement.md` as the base motion brief and `docs/instructions/next_work.md` as the correction pass.
- The prior research presentation still felt card-led, so this pass makes DINA/GaussianTalker, PNEUMA, and visual memory drive the motion system itself.
- The old horizontal research rail was removed from the UI because page-level vertical scrolling and rail-level horizontal scrolling competed with each other.
- The distributed inference console visual was removed from the UI and moved out of `public/assets` because it represented STM3D context, not the portfolio research story.

## Final Creative Refinement Plan

- Converted the DINA/GaussianTalker area from a three-card reel into the research centerpiece: `render-stable.mp4` is now a low-opacity atmospheric background stage, while `training-variants-v7.mp4` is a foreground experiment table.
- Fixed the GaussianTalker comparison crop by using a contained video wrapper instead of cover-cropping the six-block comparison.
- Added a dedicated Robotbulls x MILab applied systems section that pairs `humanoid-robot.mp4` with `robert-2.mp4`, waveform motion, streaming chunks, and a black/cyan interface language.
- Reworked education into a road-crossing-to-campus journey: `road-crossing-memory.webp` acts as a playful "research lane" opener, then `campus-ideathon.webp` becomes the academic background for the education cards.
- Enlarged Visual Memory into fewer, larger cinematic memory panels with warmer scene color, stronger hover/focus expansion, and more obvious neighboring-image response.
- Added richer scene variables for DINA ember/bronze, Robotbulls cyan/steel, Visual Memory twilight warmth, and education road/campus transitions.
- Added tablet and phone-specific DINA layout fixes so the research title, comparison board, and teaser copy do not overlap or cause horizontal panning.

## Second Cinematic Refinement Plan

- Push the DINA/FLAME/GaussianTalker section further from "board on card" toward a research-stage camera move: scroll moves the background video, title, mesh layer, Gaussian particles, and comparison board at different depths.
- Keep `training-variants-v7.mp4` readable with `object-fit: contain`, a stronger experiment-table frame, and metadata labels that do not obscure the six-block comparison.
- Expand the scene palette through local tokens: DINA ember/bronze/deep blue, Gaussian steel, Robotbulls cyan, PNEUMA violet-blue, academic campus green/gold, and restrained deployment green.
- Convert the academic/technical/deployment area into three asymmetric zones over a large campus image: Academic Foundation, Technical Vocabulary, and Deployment Practice.
- Add more CSS 3D and pointer-safe depth: perspective stages, z-depth particles, FLAME/triangle wire overlays, diagonal slabs, border traces, and hover/focus states that brighten media without hiding text.
- Avoid new motion dependencies; use the existing Framer Motion hooks, CSS transforms, SVG overlays, and reduced-motion fallbacks.

## DINA / GaussianTalker Stage

- `render_stable.mp4` is served as `public/assets/video/render-stable.mp4` and used as the DINA stage background: geometry, 3DGS, FLAME-style initialization, and stable facial structure.
- `v7_14000.mp4` is copied to `public/assets/video/training-variants-v7.mp4` and used as the primary central comparison panel for GaussianTalker-related training and architecture variants.
- `robert_2.mp4` is served as `public/assets/video/robert-2.mp4` and paired with `public/assets/video/humanoid-robot.mp4` in the Robotbulls x MILab applied systems section.
- DINA copy remains high-level and public-safe: ongoing geometry-aware audio-to-face articulation, no private architecture, loss, equation, training protocol, or unreleased implementation claims.

## Image Usage

- `IMG_4836` became `saudi-cafe-twilight.webp`, used as a warm atmospheric visual-memory fragment.
- `IMG_4924` remains `saudi-city.webp`, used for Saudi architecture, mountain geometry, and personal atmosphere.
- `IMG_2150` became `campus-ideathon.webp`, used in Visual Memory and the Research/Industry signal board for academic context.
- `IMG_4253` became `road-crossing-memory.webp`, used as a journey/path visual-memory fragment and as the talking-avatar panel poster fallback.
- Reference/Pinterest/game images remain moodboard-only; none are copied into public assets.

## Motion Systems

- Research Deep Dive is now a sticky, scroll-driven vertical stage. Cards enter the research window diagonally and sequentially through normal wheel/trackpad scrolling, with project clicks only for optional detail layers.
- Visual Memory now behaves like an episodic memory wall: hover/focus expands one image, neighboring fragments recede, captions resolve, and the wall keeps keyboard focus support.
- DINA Stage creates a cinematic research centerpiece with mesh overlays, variant chips, timeline markers, contained comparison media, and a public-safe teaser panel.
- Robotbulls x MILab creates a two-video applied-systems stage with streaming pipeline chips, scanline media panels, waveform motion, and cyan/steel hover traces.
- Experiment Archive adds a dark systems-gallery grid for research artifacts, using staggered media tiles, PNEUMA mini-graph treatment, project signal visuals, and bronze/steel hover traces.
- Typography highlights, signature strokes, orbital research focus, PNEUMA graph motion, pointer atmosphere, and reduced-motion CSS remain in place.

## Second Cinematic Refinement Implementation

- DINA now uses scroll-linked Framer Motion depth: the `render-stable.mp4` background drifts and scales independently from the title, mesh layer, and foreground comparison board.
- Added a transparent FLAME-style wireframe SVG, 42 Gaussian particle points, and a camera-rail metadata layer over the DINA background video.
- Brightened the DINA background mask so the geometry video is more recognizable while keeping the title and experiment board readable.
- Kept `training-variants-v7.mp4` inside a contained experiment-table frame with `object-fit: contain`, timeline markers, chips, and a border-trace hover/focus state.
- Added scene tokens for DINA bronze/ember, Gaussian steel, PNEUMA violet, campus green/blue, road amber, and restrained deployment green.
- Replaced the congested education/skills block with a campus-backed `academic-stage` split into Academic Foundation, Technical Vocabulary, and Deployment Practice modules.
- Added vocabulary chip tooltips, deployment scanline labels, focusable academic modules, stronger CTA hover motion, Robotbulls video brightening, and archive-tile border/diagonal trace motion.
- No new dependencies were added; this pass uses existing Framer Motion hooks, CSS 3D, SVG, and CSS keyframes.

## Asset Organization

- Raw videos moved to `source_assets/video/`.
- Private/source documents moved to `source_assets/documents/`.
- Archive zips moved to `source_assets/archives/`.
- Instruction prompts moved to `docs/instructions/`.
- Served/optimized assets remain under `public/assets/` and are generated by `scripts/build_assets.py`.

## Validation Targets

- `pnpm run build` passes after the final creative refinements.
- Browser QA at `http://127.0.0.1:4191/` confirmed no console logs, no failed images after lazy-load scrolling, and no actual horizontal panning on default or phone viewport.
- Verified `training-variants-v7.mp4`, `render-stable.mp4`, `robert-2.mp4`, and `humanoid-robot.mp4` load with ready media states.
- Verified the GaussianTalker comparison video uses `object-fit: contain`.
- Verified the Robotbulls x MILab section renders two media panels and the Visual Memory wall renders nine larger items.
- Saved review screenshots to `design-review/final-creative/`.

## Second Refinement Validation

- `pnpm run build` passes after the second cinematic refinement.
- Static preview at `http://127.0.0.1:4191/` serves the rebuilt bundle with `index-oNgRirub.css` and `index-92JgquLv.js`.
- Desktop browser QA before the final opacity-only DINA mask adjustment confirmed: no console warnings/errors, no actual horizontal panning, `training-variants-v7.mp4` remains `object-fit: contain`, DINA background video exists, FLAME wire exists, 42 Gaussian points exist, three academic zones render, and both `humanoid-robot.mp4` and `robert-2.mp4` are present.
- After the final DINA visibility adjustment, the build output was statically verified to include the updated `dina-stage-bg` opacity/mask, contained comparison video, academic stage, FLAME wire, Gaussian field, humanoid video, and Robert video references.
- In-app browser automation became unreliable after reload because navigation and DOM-read calls timed out on the media-heavy page; generated screenshots in `design-review/final-cinematic/` reflect the second refinement before the final DINA brightness tweak, while the final built CSS contains that brightness tweak.

## Known Limitations

- Videos are copied without transcoding because `ffmpeg` is unavailable in the local environment.
- `robert_2.mp4` and `v7_14000.mp4` are large and should be compressed before deployment.
- Video poster frames were not extracted because no local video reader is installed; poster fallbacks use optimized local images instead.
