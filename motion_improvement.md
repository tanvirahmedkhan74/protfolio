Based on your motion breakdown, this prompt is designed as the **immediate next Codex turn**: not a full rebuild, but a focused motion/transition pass using the Lando-style scroll storytelling, staggered typography, parallax layering, image grids, dark cinematic panels, and final anchor section described in your reference notes. 

You are GPT-5.5 Codex acting as a senior creative developer, motion designer, frontend animation engineer, and UI/UX interaction director.

Current Situation:
The portfolio website already exists and the build is complete, but the UI still feels too basic and AI-generated. The main problem is that the experience is mostly vertical scrolling with simple hover animations. We now need an immediate focused pass on motion, transitions, dynamic layout rhythm, and cinematic interaction quality.

This is not a content rewrite task.
This is not a deployment task.
This is not a full rebuild from scratch.

Primary Goal:
Create a strong, cohesive motion and transition system for the existing portfolio so it feels like a premium cinematic research portfolio rather than a basic static resume site.

Main References:
Use the provided motion analysis of the Lando Norris website as the primary motion reference. Conceptually borrow:

* Smooth scroll-driven storytelling.
* Layered hero motion.
* Parallax image/shape movement.
* Massive staggered typography reveals.
* Highlight wipes across important words.
* Signature/line scribble-style animations.
* Cinematic section transitions.
* Magazine-like image grids.
* Collection/gallery sections with rich card motion.
* Strong final closing hero/footer composition.
* Smooth easing and scroll-tied animation timing.

Also conceptually consider the MONOLOG reference for:

* Premium typography.
* Editorial pacing.
* Minimal but high-impact layout.
* Large confident statements.
* Layered modal/card-like interactions.
* Smooth transition between story sections.

Do not copy assets, layout, branding, exact animations, colors, text, or copyrighted material from any reference site.

Portfolio Identity:
All motion must support Tanvir Ahmed Khan’s identity as an AI/computer-vision researcher and software engineer working around:

* Multimodal learning.
* Computer vision.
* Speech-to-avatar systems.
* 3D Gaussian Splatting.
* World models and cognitive AI.
* RAG/memory systems.
* GPU/distributed inference.
* Research + engineering.

Motion should feel like:

* Intelligence forming.
* Memory unfolding.
* Research systems connecting.
* Visual perception and neural geometry.
* Cinematic dark-blue technical atmosphere.

Do not make it feel like:

* A racing website.
* A game fan site.
* A generic cyberpunk template.
* A portfolio with random decoration.

Design Language:
Use a dark / dark-blue cinematic research aesthetic.

Preferred atmosphere:

* Deep navy.
* Graphite black.
* Midnight blue.
* Fog gray.
* Bone/off-white typography.
* Muted steel-blue UI.
* Subtle bronze/desert-gold accents.
* Occasional ember/crimson only for tiny emphasis.

Avoid:

* Neon green from the Lando reference.
* Generic purple/blue gradient blobs.
* Basic Tailwind cards.
* Excessive glassmorphism.
* Too many glowing effects.
* Animation without purpose.

Immediate Task:
Inspect the current implementation and add a complete motion/transition layer across the site.

You must implement or significantly improve the following motion systems:

1. Smooth Scroll Foundation

* Add a smooth scrolling system if not already present.
* Prefer Lenis + GSAP ScrollTrigger, or another stable free option.
* Ensure scroll animations are tied to scroll position where appropriate.
* Refresh ScrollTrigger/layout calculations after media loads if needed.
* Respect `prefers-reduced-motion`.

2. Cinematic Hero Transition
   Upgrade the hero so it has layered motion:

* Background layer moves slower than foreground.
* Main portrait or visual asset moves with subtle scale/parallax.
* Abstract overlay layer such as neural lines, fog, particles, or Gaussian point cloud moves independently.
* Hero title reveals in staggered lines or words.
* Key words should get dark-blue/bronze highlight wipes.
* CTA buttons should enter after the title with smooth delay.
* On scroll, the hero should transition into the next section with a mask, fade, scale, or dark-panel takeover.

Do not use only fade-in. Make the hero feel like an opening cinematic.

3. Massive Research Statement Section
   Create or upgrade a section similar in spirit to the Lando “REDEFINING LIMITS...” moment, but aligned to Tanvir’s research identity.

Possible statement:
“BUILDING INTELLIGENT MULTIMODAL SYSTEMS THAT SEE, SPEAK, REMEMBER, AND REASON.”

Or generate a better equivalent from the existing portfolio tone.

Requirements:

* Very large typography.
* Word-by-word or line-by-line reveal.
* Highlight important words such as SEE, SPEAK, REMEMBER, REASON, MULTIMODAL, or 3D.
* Use staggered scroll-based animation.
* Add subtle animated underline/progress stroke.
* Add one original signature-like line/scribble SVG animation as a recurring motif.
* Keep it professional and not cheesy.

4. Section Transition System
   Replace abrupt section changes with a consistent transition language.

Use a few of:

* Dark-blue panel wipe.
* Clip-path reveal.
* Masked image reveal.
* SVG line wipe.
* Fog/particle dissolve.
* Horizontal slide transition.
* Large typography pushing the next section into view.
* Section number or micro-label entering before content.

Every major section should feel connected to the next.

5. Horizontal Motion Section
   At least one major section must move horizontally or side-to-side during scroll.

Best candidates:

* Selected Projects.
* Publications.
* Research Experience timeline.
* Gallery.

Implementation idea:

* Use a sticky wrapper.
* Convert vertical scroll distance into horizontal transform.
* Cards/panels should move horizontally with depth/parallax.
* Add progress indicator or section label.
* Keep mobile fallback vertical and usable.

This section should feel like a curated research/memory reel, not a basic carousel.

6. Circular / Orbital Visualization
   Create one meaningful circular/orbital motion graphic.

Best candidate:
Research Focus or Technical Skills.

Concept:

* Central node: “Multimodal AI / Cognitive Systems / 3D Neural Rendering.”
* Orbiting nodes: Computer Vision, NLP, Speech, 3DGS, RAG, World Models, GPU Systems, Audio.
* Use slow orbital motion, cursor influence, or scroll-based rotation.
* On hover/focus, a node can reveal short details.
* Keep it accessible and readable.
* Provide reduced-motion fallback.

Do not make it a random spinning decoration. It must explain the research ecosystem.

7. Recursive / Memory Graph Motion
   Add one recursive or layered visual metaphor related to memory/reasoning.

Possible implementation:

* Animated graph nodes and edges.
* Nested cards appearing inside larger cards.
* Repeated timeline nodes.
* Layered visual planes.
* A “memory cache” style visualization with pointers/edges.
* Particles connecting project/research cards.

Use this to support:

* RAG systems.
* Knowledge graphs.
* FAISS/memory.
* World models.
* Long-term AI systems.

8. Image Motion and Gallery Upgrade
   Re-audit existing images and improve how images are used.

Use remaining images if they improve the visual quality:

* Personal photos.
* Campus photos.
* Saudi scenery/travel photos.
* Scenery/nature images.
* Reference/moodboard images only as inspiration unless license-safe.

For production UI:

* Do not directly use Pinterest/game/reference images unless license is verified.
* If reference images have license issues, generate original visual assets inspired by their mood using CSS/SVG/Canvas/WebGL.
* Create dark-blue overlays, masks, duotone treatments, or blurred texture layers from local personal/scenery photos.
* Use images in dynamic layouts:

  * layered hero composition,
  * parallax photo wall,
  * horizontal gallery,
  * tilted overlapping cards,
  * masked image reveals,
  * background atmosphere panels.

Avoid flat image grids unless the motion and layout make them premium.

9. Typography Animation System
   Improve text motion across the site:

* Split large headings into lines/words.
* Add staggered reveals.
* Add highlight wipes.
* Add micro-label fade/slide.
* Add scroll-triggered line masks.
* Use consistent easing.
* Avoid every heading using the same animation.

Typography should feel editorial and cinematic.

10. Button and CTA Motion
    Upgrade CTAs:

* Magnetic hover or subtle cursor pull on desktop.
* Animated border/underline.
* Background fill transition.
* Icon slide or arrow movement.
* Good focus states.
* No annoying effects.

11. Final Closing Section
    Create a strong final hero/footer moment.

It should feel equivalent in strength to a final cinematic anchor:

* Big closing statement.
* Strong background visual or image layer.
* Resume/contact CTA.
* Subtle signature/scribble line animation.
* Clean navigation/social links.
* Research identity preserved.

Possible closing line:
“BUILDING SYSTEMS THAT PERCEIVE, REMEMBER, AND MOVE.”

Or generate a better line from the site’s tone.

Implementation Constraints:

* Keep the site locally runnable.
* Do not break existing content.
* Do not invent resume content.
* Do not upload personal files externally.
* Use only free/open-source libraries and assets.
* Avoid unnecessary dependency bloat.
* Keep mobile usable.
* Add reduced-motion fallback.
* Avoid heavy effects that cause jank.
* Use GPU-friendly transforms: transform, opacity, clip-path carefully.
* Avoid animating layout-heavy properties when possible.

Recommended Technical Choices:
Use what fits the existing codebase.

Good options:

* GSAP + ScrollTrigger for scroll-tied animation.
* Lenis for smooth scrolling.
* Framer Motion for component-level reveals.
* React Three Fiber / Three.js only if already present or clearly useful.
* CSS/SVG clip-path and masks.
* CSS variables for motion timing/easing.
* IntersectionObserver only for simpler reveal animations.

If a library is added, explain why it is needed.

Validation:
After implementation, run the site locally and visually validate.

Required steps:

1. Run install if dependencies changed.
2. Start local dev server.
3. Open desktop browser.
4. Inspect the page at multiple scroll positions.
5. Take screenshots or Playwright screenshots if browser automation is available:

   * hero,
   * big statement section,
   * horizontal section,
   * orbital/research visualization,
   * gallery/media section,
   * final footer.
6. Check mobile viewport.
7. Check console errors.
8. Check reduced-motion mode if possible.
9. Fix obvious visual or motion issues.

Create or update a short file:
`MOTION_REDESIGN_NOTES.md`

Include:

* What motion systems were added.
* Which sections were changed.
* Which images/assets were used or transformed.
* Which libraries were added and why.
* Any known limitations.
* What still needs manual design review.

Git Requirement:
Check whether Git is initialized.

If not:

* Run `git init`.
* Create/update `.gitignore`.

Ensure `.gitignore` includes:

* `node_modules/`
* `dist/`
* `.env`
* `.env.*`
* log files
* OS junk files
* temporary screenshots if large
* local cache files

If the repo is clean enough:

* Commit the pre-motion baseline if not already committed.
* Commit the motion redesign separately.

Suggested commit names:

* `baseline: portfolio before motion redesign`
* `redesign: add cinematic motion and transition system`

Do not commit secrets or unnecessary huge files.

Acceptance Criteria:
The final result should no longer feel like a vertically stacked portfolio with hover effects.

It must include:

* Smooth scroll-driven storytelling.
* Strong cinematic hero transition.
* Massive staggered research statement.
* At least one horizontal scroll/progression section.
* At least one circular/orbital research visualization.
* At least one recursive/layered memory or graph visual.
* Improved image motion and gallery treatment.
* Better typography animation.
* Strong final CTA/footer moment.
* Reduced-motion fallback.
* Localhost working without errors.

Final Response:
After completing the task, provide:

* Summary of motion/transition systems added.
* Sections redesigned.
* Libraries/assets used.
* Commands to run locally.
* Screenshot locations if created.
* Git status and commit hashes if commits were made.
* Honest limitations and next recommended UI/UX improvements.

Use this prompt **immediately after the current build**, because it assumes Codex already has the project and should now act like a motion-design engineer, not a general website generator.
