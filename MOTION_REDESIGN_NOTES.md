# Motion Redesign Notes

## Instruction Merge

- Used `motion_improvement.md` as the base motion brief.
- Extended it with `research_description.md` to foreground PNEUMA, real-time avatar work, and DINA as a high-level ongoing teaser.
- Prioritized the current critique by removing the vertical-scroll-to-horizontal-transform section that made page scrolling feel conflicted.

## Motion Systems Added

- Massive staggered research statement with highlight wipes and a signature-style SVG stroke.
- Native horizontal research rail with snap cards, progress, and explicit controls. It no longer hijacks vertical page scroll.
- PNEUMA triadic memory visualization with SQL, FAISS, and knowledge-graph layers, animated query paths, and result convergence.
- Video-backed avatar section with waveform bars and chunked streaming pipeline chips.
- DINA/3DGS teaser section with a masked local render video and restrained mesh overlay.
- Responsive stacked fallbacks for PNEUMA, videos, and the rail.
- Existing orbital research visualization, intro curtain, hero layering, progress rail, pointer atmosphere, and reduced-motion CSS remain in place.

## Research Representation

- PNEUMA is presented as a model-agnostic long-term egocentric memory system using SQL, FAISS/vector retrieval, and knowledge graphs.
- Robotbulls/MILab-style avatar work is framed as applied real-time talking-avatar research without exposing private deployment or partner details.
- DINA is intentionally high-level only: geometry-aware audio-to-face articulation for stable jaw, lip, and lower-face motion. No training protocol, losses, equations, or unreleased details are disclosed.

## Video Assets

- `renders_stable.mp4` is copied to `public/assets/video/render-stable.mp4` and used in the DINA/3DGS teaser.
- `robert_2.mp4` is copied to `public/assets/video/robert-2.mp4` and used in the talking-avatar demo section.
- Existing `humanoid_robot.mp4` remains copied for local assets but is no longer the primary research video panel.

## Libraries

- No new dependencies were added.
- Framer Motion, Three.js, and CSS/SVG animation were sufficient for this pass.
- Avoided Lenis/GSAP because the immediate issue was scroll conflict; adding another scroll abstraction would increase risk without solving the UX problem.

## Validation

- `pnpm run build` passes.
- Build still reports the existing large JavaScript chunk warning from the interactive stack.
- Browser validation screenshots are saved under `design-review/motion-final/`.
- Desktop browser QA passed: no console warnings/errors, no actual broken images, both new videos reached ready state `4`, old sticky runway selectors are absent, the horizontal rail has scrollable width, and page-level horizontal overflow is `0`.
- Mobile QA at `390x844` passed with page-level horizontal overflow `0`.

## Known Limitations

- The videos are copied without transcoding; `robert-2.mp4` is roughly 19 MB and should be compressed before deployment.
- The horizontal rail is intentionally user-controlled rather than vertical-scroll-driven to avoid the reported conflict.
- Reduced-motion mode relies on CSS and existing Framer checks; deeper browser-level reduced-motion validation is still useful.
