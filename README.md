# Tanvir Ahmed Khan Portfolio

Phase 1 is a localhost-first portfolio website built from the local resume and media assets. It uses Vite, React, TypeScript, Three.js, Framer Motion, and local CSS.

## Local Setup

```bash
pnpm install
pnpm run dev
```

Open the local URL printed by Vite, usually `http://127.0.0.1:5173/`.

If `pnpm` is not on PATH in this Codex workspace, use the bundled executable:

```powershell
& 'C:\Users\tanvi\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\pnpm.cmd' install
& 'C:\Users\tanvi\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\pnpm.cmd' run dev
```

## Asset Notes

- Resume content comes from `main.tex` and `Tanvir_s_Resume_Latest.pdf`.
- Public contact keeps email, LinkedIn, Google Scholar, and GitHub/project links.
- Home address and phone number from the resume are intentionally not shown.
- Selected personal/scenery images are processed locally into `public/assets`.
- `humanoid_robot.mp4` is copied locally for the phase 1 video showcase.
- `reference_images` are used only as visual mood references because license safety is not established.
- No external paid assets or remote image services are used.

The generated asset manifest is available at `public/assets/asset-manifest.json`.

## Phase 1 Scope

- Cinematic dark-blue research portfolio.
- Interactive Three.js point-cloud/neural-field hero.
- Resume-driven About, Research Focus, Publications, Experience, Projects, Skills, Awards, Gallery, Video, and Contact sections.
- Reduced-motion handling and responsive layouts for desktop and mobile.

## Validation

```bash
pnpm run build
```

The phase 1 build currently includes a large JavaScript chunk because Three.js and Framer Motion are included for the local cinematic version. This is acceptable for localhost review; phase 2 should split or simplify that bundle for GitHub Pages.

## Before GitHub Pages

Phase 2 should harden the static deployment:

- Confirm the final repository name and set the Vite `base` path.
- Re-run `npm run build` and `npm run preview`.
- Compress or replace video assets if the deployed bundle is too heavy.
- Add GitHub Pages deployment instructions or a GitHub Actions workflow.
