import {
  ArrowUpRight,
  BookOpenText,
  BrainCircuit,
  Cpu,
  Download,
  FileText,
  Github,
  GraduationCap,
  Layers3,
  Mail,
  Map,
  Mic2,
  Move3D,
  Network,
  Orbit,
  PlayCircle,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Trophy,
  Waves,
  X,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import NeuralFieldCanvas from "./components/NeuralFieldCanvas";
import SectionReveal from "./components/SectionReveal";
import {
  awards,
  education,
  galleryImages,
  industryExperience,
  navigation,
  profile,
  projects,
  publications,
  researchExperience,
  researchFocus,
  resumeHref,
  skillGroups,
  type Project,
} from "./data/portfolio";

const focusIcons = [BrainCircuit, Move3D, Mic2, Network, Waves, Cpu];
const heroMetrics = [
  ["sub-4s", "avatar inference target"],
  ["512", "lip-sync refinement"],
  ["3DGS", "audio-driven heads"],
  ["RAG", "memory systems"],
];

const statementWords = [
  "Building",
  "intelligent",
  "multimodal",
  "systems",
  "that",
  "see,",
  "speak,",
  "remember,",
  "and",
  "reason.",
];

const highlightedStatementWords = new Set(["multimodal", "see,", "speak,", "remember,", "reason."]);

const pneumaLayers = [
  {
    label: "SQL",
    title: "Structured temporal memory",
    detail: "Episodic events, timestamps, entities, and explainable state.",
  },
  {
    label: "FAISS",
    title: "Vector similarity memory",
    detail: "Fast semantic retrieval for natural-language memory questions.",
  },
  {
    label: "KG",
    title: "Knowledge graph reasoning",
    detail: "Linked entities, relationships, temporal trails, and context.",
  },
];

const avatarPipeline = [
  "Audio stream",
  "Chunked features",
  "Avatar inference",
  "3D / video render",
  "Robotic face output",
];

const gaussianFieldPoints = Array.from({ length: 42 }, (_, index) => ({
  x: `${8 + ((index * 17) % 84)}%`,
  y: `${6 + ((index * 29) % 86)}%`,
  z: `${-190 + ((index * 47) % 360)}px`,
  scale: `${0.58 + ((index % 7) * 0.08)}`,
  delay: `${index * -0.11}s`,
}));

const academicVocabulary = [
  { term: "Deep Learning", detail: "PyTorch, transformers, diffusion, GANs, VAEs" },
  { term: "3DGS", detail: "Gaussian rendering and audio-driven head research" },
  { term: "FLAME", detail: "Public geometry vocabulary only" },
  { term: "Vision-Language", detail: "VLMs, CLIP, world models" },
  { term: "Memory", detail: "SQL, FAISS, knowledge graphs, RAG" },
  { term: "Audio", detail: "TTS, spectrograms, Audio2Face" },
  { term: "Systems", detail: "FastAPI, Docker, Linux, GCP" },
  { term: "Parallel", detail: "CUDA, OpenMP, multi-GPU inference" },
];

const deploymentPractice = [
  "Containerized agents",
  "Jetson Nano",
  "DGX Spark",
  "GCP infrastructure",
  "FastAPI services",
  "Linux tooling",
  "CUDA profiling",
  "Production ERP",
];

const researchJourney = [
  {
    label: "Memory",
    title: "PNEUMA",
    detail:
      "Model-agnostic long-term egocentric memory using SQL, FAISS/vector retrieval, and knowledge graphs for privacy-preserving edge-first assistants.",
    tags: ["SQL", "FAISS", "Knowledge Graphs"],
  },
  {
    label: "Speech to Face",
    title: "Real-time talking avatars",
    detail:
      "Applied MILab research around audio-to-visual synchronization, chunked streaming, Audio2Face, Three.js, ARKit blendshapes, and lip-region refinement.",
    tags: ["Audio2Face", "Three.js", "Streaming"],
  },
  {
    label: "3D Neural Rendering",
    title: "Audio-driven 3D heads",
    detail:
      "Research direction connecting speech signals, 3D Gaussian Splatting, FLAME-style geometry, and replay-compatible talking-head motion.",
    tags: ["3DGS", "FLAME", "Geometry"],
  },
  {
    label: "Ongoing",
    title: "DINA research teaser",
    detail:
      "High-level ongoing work on geometry-aware audio-to-face articulation for stable jaw, lip, and lower-face motion.",
    tags: ["Ongoing", "FLAME", "High level"],
  },
];

function usePointerAtmosphere() {
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const x = `${Math.round((event.clientX / window.innerWidth) * 100)}%`;
      const y = `${Math.round((event.clientY / window.innerHeight) * 100)}%`;
      document.documentElement.style.setProperty("--pointer-x", x);
      document.documentElement.style.setProperty("--pointer-y", y);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
}

function useHashAnchorRestore() {
  useEffect(() => {
    if (!window.location.hash) {
      return;
    }
    const anchor = window.location.hash.slice(1);
    const timeout = window.setTimeout(() => {
      document.getElementById(anchor)?.scrollIntoView({ block: "start" });
    }, 160);
    return () => window.clearTimeout(timeout);
  }, []);
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.2,
  });

  return (
    <aside className="progress-rail" aria-hidden="true">
      <span>00</span>
      <motion.i style={{ scaleY: progress }} />
      <span>01</span>
    </aside>
  );
}

function IntroCurtain() {
  const reduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(!reduceMotion);

  useEffect(() => {
    if (reduceMotion) {
      setIsVisible(false);
      return;
    }
    const timeout = window.setTimeout(() => setIsVisible(false), 2300);
    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);

  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      className="intro-curtain"
      initial={{ y: 0 }}
      animate={{ y: "-105%" }}
      transition={{ duration: 1.25, delay: 0.8, ease: [0.83, 0, 0.17, 1] }}
      aria-hidden="true"
    >
      <motion.div
        className="intro-mark"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <span>TAK</span>
        <strong>Neural field loading</strong>
      </motion.div>
      <div className="intro-scan" />
    </motion.div>
  );
}

function MagneticLink({
  href,
  children,
  variant = "secondary",
  download,
  target,
  rel,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  download?: boolean;
  target?: string;
  rel?: string;
}) {
  return (
    <motion.a
      className={`button ${variant} magnetic`}
      href={href}
      download={download}
      target={target}
      rel={rel}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.a>
  );
}

function ResearchOrbit() {
  return (
    <div className="orbit-system" aria-label="Research focus orbit">
      <div className="orbit-core">
        <Orbit size={28} aria-hidden="true" />
        <span>Multimodal core</span>
      </div>
      {researchFocus.map((item, index) => {
        const Icon = focusIcons[index] ?? BrainCircuit;
        return (
          <article
            className="orbit-node"
            style={{ "--orbit-index": index } as CSSProperties}
            key={item.title}
          >
            <Icon size={18} aria-hidden="true" />
            <strong>{item.title}</strong>
            <p>{item.detail}</p>
          </article>
        );
      })}
      <div className="orbit-ring ring-one" />
      <div className="orbit-ring ring-two" />
    </div>
  );
}

function ResearchStatement() {
  return (
    <SectionReveal id="statement" className="section statement-section">
      <div className="statement-wrap">
        <div className="section-kicker">
          <Sparkles size={18} aria-hidden="true" />
          Research Statement
        </div>
        <h2 aria-label="Building intelligent multimodal systems that see, speak, remember, and reason.">
          {statementWords.map((word, index) => (
            <span
              className={highlightedStatementWords.has(word.toLowerCase()) ? "statement-highlight" : ""}
              style={{ "--word-index": index } as CSSProperties}
              key={word}
            >
              {word}
            </span>
          ))}
        </h2>
        <svg className="signature-line" viewBox="0 0 760 88" aria-hidden="true">
          <path d="M18 58 C132 8 202 90 316 42 S494 4 562 48 686 82 742 24" />
        </svg>
      </div>
    </SectionReveal>
  );
}

function PneumaMemoryGraph() {
  return (
    <div className="pneuma-graph" aria-label="PNEUMA triadic memory visualization">
      <div className="query-token">
        <small>Query</small>
        <strong>Where is the remembered context?</strong>
      </div>
      <svg viewBox="0 0 720 420" role="img" aria-label="Query paths through SQL, FAISS, and knowledge graph memory">
        <path className="memory-path path-a" d="M74 208 C176 76 320 70 430 150 S594 230 650 112" />
        <path className="memory-path path-b" d="M76 216 C210 276 354 268 506 238 S620 262 658 318" />
        <path className="memory-path path-c" d="M90 242 C176 354 348 356 450 284 S574 148 664 188" />
      </svg>
      <div className="memory-pulse pulse-one" />
      <div className="memory-pulse pulse-two" />
      <div className="memory-pulse pulse-three" />
      {pneumaLayers.map((layer, index) => (
        <article
          className={`pneuma-layer layer-${index + 1}`}
          style={{ "--memory-index": index } as CSSProperties}
          key={layer.label}
        >
          <span>{layer.label}</span>
          <h3>{layer.title}</h3>
          <p>{layer.detail}</p>
        </article>
      ))}
      <div className="memory-result">
        <small>Resolved answer</small>
        <strong>Temporal context + semantic match + relational trail</strong>
      </div>
    </div>
  );
}

type DeepDiveItem = {
  label: string;
  title: string;
  detail: string;
  tags: string[];
  project?: Project;
};

function ResearchDeepDiveCard({
  item,
  index,
  total,
  progress,
  onProjectClick,
}: {
  item: DeepDiveItem;
  index: number;
  total: number;
  progress: ReturnType<typeof useSpring>;
  onProjectClick: (project: Project) => void;
}) {
  const center = (index + 1) / (total + 1);
  const start = Math.max(0, center - 0.2);
  const end = Math.min(1, center + 0.2);
  const side = index % 2 === 0 ? -1 : 1;
  const x = useTransform(progress, [start, center, end], [side * 230, 0, side * -170]);
  const y = useTransform(progress, [start, center, end], [105, 0, -88]);
  const opacity = useTransform(progress, [start, center, end], [0, 1, 0.2]);
  const scale = useTransform(progress, [start, center, end], [0.78, 1, 0.9]);
  const rotate = useTransform(progress, [start, center, end], [side * -7, 0, side * 4]);

  return (
    <motion.article
      className="deep-card"
      style={{ x, y, opacity, scale, rotate, "--card-index": index } as unknown as CSSProperties}
      tabIndex={0}
    >
      <span className="runway-index">{item.project ? `P${index + 1}` : `R${index + 1}`}</span>
      <small>{item.label}</small>
      <h3>{item.title}</h3>
      <p>{item.detail}</p>
      <div className="tag-row">
        {item.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      {item.project ? (
        <div className="runway-actions">
          <a
            className="icon-link"
            href={item.project.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open GitHub project: ${item.project.title}`}
          >
            <Github size={19} aria-hidden="true" />
          </a>
          <button type="button" className="text-link" onClick={() => onProjectClick(item.project as Project)}>
            Detail layer
          </button>
        </div>
      ) : null}
    </motion.article>
  );
}

function ResearchDeepDive({ onProjectClick }: { onProjectClick: (project: Project) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 92,
    damping: 24,
    mass: 0.35,
  });
  const windowScale = useTransform(progress, [0, 0.5, 1], [0.94, 1, 0.96]);

  const items: DeepDiveItem[] = [
    ...researchJourney,
    ...projects.map((project) => ({
      label: project.period,
      title: project.title,
      detail: project.description,
      tags: project.tags,
      project,
    })),
  ];

  return (
    <section className="section deep-dive-section" id="projects" ref={sectionRef}>
      <div className="deep-stage">
        <motion.div className="deep-window" style={{ scale: windowScale }}>
          <div className="deep-heading">
            <div>
              <div className="section-kicker">
                <Cpu size={18} aria-hidden="true" />
                Research Deep Dive
              </div>
              <h2>Perception to memory to speech to 3D embodiment.</h2>
            </div>
            <p>
              Vertical scroll now drives the research map. The cards move through
              a broad lab window in sequence, so normal mouse-wheel and trackpad
              scrolling can inspect the work without horizontal scroll conflict.
            </p>
          </div>
          <div className="deep-progress" aria-hidden="true">
            <motion.span style={{ scaleX: progress }} />
          </div>
          <div className="deep-map" aria-label="Scroll-driven research trajectory">
            <div className="deep-axis" aria-hidden="true" />
            {items.map((item, index) => (
              <ResearchDeepDiveCard
                item={item}
                index={index}
                total={items.length}
                progress={progress}
                onProjectClick={onProjectClick}
                key={`${item.label}-${item.title}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const dinaReelPanels = [
  {
    phase: "01 / Geometry",
    icon: Move3D,
    title: "3DGS / FLAME initialization",
    detail:
      "The geometry step frames render_stable.mp4 as the visual bridge between mesh initialization, Gaussian structure, and future audio-driven facial motion.",
    src: "/assets/video/render-stable.mp4",
    poster: "/assets/gallery/aerial-neural.webp",
    tags: ["3DGS", "FLAME", "Geometry"],
  },
  {
    phase: "02 / Training Variants",
    icon: Layers3,
    title: "From GaussianTalker experiments toward DINA",
    detail:
      "v7_14000.mp4 is presented as a large comparison board for high-level training and architecture variants connected to the DINA research lineage.",
    src: "/assets/video/training-variants-v7.mp4",
    poster: "/assets/gallery/campus-ideathon.webp",
    tags: ["Variant comparison", "GaussianTalker", "Custom training"],
    primary: true,
  },
  {
    phase: "03 / Applied Output",
    icon: Mic2,
    title: "Real-time talking-avatar output",
    detail:
      "robert_2.mp4 anchors the applied avatar direction: speech features, streaming inference, visual articulation, and robotic-face behavior.",
    src: "/assets/video/robert-2.mp4",
    poster: "/assets/gallery/road-crossing-memory.webp",
    tags: ["Audio stream", "Avatar demo", "Real-time"],
  },
];

function DinaLabSection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-90, 90]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [1, 1, 1] : [1.08, 1.18, 1.1]);
  const meshX = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-80, 76]);
  const meshRotate = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-5, 6]);
  const copyX = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [0, 0, 0] : [-36, 0, 26]);
  const boardX = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [0, 0, 0] : [58, 0, -34]);
  const boardY = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [0, 0, 0] : [26, -10, 18]);
  const boardRotate = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [0, 0, 0] : [-4, 0, 3]);

  return (
    <SectionReveal id="dina" className="section dina-lab-section">
      <div className="dina-stage" ref={stageRef}>
        <motion.video
          className="dina-stage-bg"
          style={{ y: bgY, scale: bgScale }}
          src="/assets/video/render-stable.mp4"
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          aria-hidden="true"
        />
        <motion.div className="dina-stage-mesh" style={{ x: meshX, rotate: meshRotate }} aria-hidden="true" />
        <motion.svg
          className="dina-flame-wire"
          viewBox="0 0 920 680"
          style={{ x: meshX, rotate: meshRotate }}
          aria-hidden="true"
        >
          <path d="M122 522 C236 214 344 118 498 122 C666 128 766 238 814 540" />
          <path d="M244 318 C342 258 526 252 646 324" />
          <path d="M318 436 C406 472 522 474 612 438" />
          <path d="M454 122 L386 342 L464 410 L546 342 Z" />
          <path d="M248 318 L386 342 L318 436 L198 514" />
          <path d="M646 324 L546 342 L612 438 L760 520" />
          {Array.from({ length: 20 }, (_, index) => (
            <circle
              cx={150 + ((index * 83) % 660)}
              cy={136 + ((index * 61) % 420)}
              r={index % 4 === 0 ? 4 : 2.4}
              key={index}
            />
          ))}
        </motion.svg>
        <div className="dina-gaussian-field" aria-hidden="true">
          {gaussianFieldPoints.map((point, index) => (
            <i
              style={
                {
                  "--gx": point.x,
                  "--gy": point.y,
                  "--gz": point.z,
                  "--gs": point.scale,
                  "--gd": point.delay,
                } as CSSProperties
              }
              key={`${point.x}-${point.y}-${index}`}
            />
          ))}
        </div>
        <div className="dina-camera-rail" aria-hidden="true">
          <span>FLAME topology</span>
          <span>Gaussian field</span>
          <span>Audio-driven face</span>
        </div>
        <motion.div className="dina-stage-copy" style={{ x: copyX }}>
          <div className="section-kicker">
            <Move3D size={18} aria-hidden="true" />
            From GaussianTalker to DINA
          </div>
          <h2 aria-label="From GaussianTalker to DINA toward stable audio-driven 3D faces">
            <span>From</span>
            <strong>Gaussian<wbr />Talker</strong>
            <span>to</span>
            <strong>DINA</strong>
          </h2>
          <p className="dina-subtitle">Toward stable audio-driven 3D faces.</p>
          <p>
            Ongoing geometry-aware audio-to-face articulation research, framed
            publicly through geometry, comparison runs, and real-time talking-face
            direction without exposing private architecture or training internals.
          </p>
        </motion.div>

        <motion.article
          className="comparison-board"
          style={{ x: boardX, y: boardY, rotateY: boardRotate }}
          whileHover={{ y: -18, x: 12, rotate: 0.25 }}
          tabIndex={0}
        >
          <div className="comparison-meta">
            <span>Experiment table</span>
            <strong>GaussianTalker lineage comparison</strong>
          </div>
          <div className="comparison-media">
            <video
              src="/assets/video/training-variants-v7.mp4"
              muted
              loop
              playsInline
              autoPlay
              preload="auto"
            />
            <div className="variant-ruler cinematic" aria-hidden="true">
              {Array.from({ length: 6 }, (_, marker) => (
                <i key={marker}>V{marker + 1}</i>
              ))}
            </div>
          </div>
          <div className="comparison-chips" aria-label="GaussianTalker comparison metadata">
            {["variant comparison", "training run", "facial motion", "GaussianTalker lineage"].map((tag, tagIndex) => (
              <span style={{ "--chip-index": tagIndex } as CSSProperties} key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </motion.article>

        <div className="dina-teaser">
          <span>DINA direction</span>
          <p>
            Public-safe teaser only: stable jaw, lip, and lower-face articulation
            for geometry-aware talking faces.
          </p>
        </div>
      </div>
    </SectionReveal>
  );
}

const robotMediaPanels = [
  {
    phase: "Robot context",
    title: "Humanoid robotic face work",
    detail: "MILab / Robotbulls applied systems context for robotic-face presentation and avatar embodiment.",
    src: "/assets/video/humanoid-robot.mp4",
    poster: "/assets/gallery/campus-ideathon.webp",
    tags: ["Humanoid robot", "Applied systems", "Embodiment"],
  },
  {
    phase: "Avatar output",
    title: "Talking-face output demo",
    detail: "Speech-driven avatar output, streaming chunks, visual articulation, and robotic-face behavior.",
    src: "/assets/video/robert-2.mp4",
    poster: "/assets/gallery/road-crossing-memory.webp",
    tags: ["Speech", "Avatar inference", "Real-time"],
  },
];

function RobotbullsMilabSection() {
  return (
    <SectionReveal id="avatar" className="section robotbulls-section">
      <div className="robotbulls-header">
        <div>
          <div className="section-kicker">
            <Mic2 size={18} aria-hidden="true" />
            Robotbulls x MILab Applied Systems
          </div>
          <h2>Audio streams, avatar inference, and robotic-face output.</h2>
        </div>
        <p>
          A public-facing applied research view: no partner-sensitive deployment
          details, just the visible pipeline from speech to embodied face.
        </p>
      </div>
      <div className="robot-pipeline" aria-label="Robotbulls and MILab avatar pipeline">
        {["Audio", "Streaming chunks", "Avatar inference", "Robotic face"].map((step, index) => (
          <span style={{ "--pipeline-index": index } as CSSProperties} key={step}>
            {step}
          </span>
        ))}
      </div>
      <div className="robot-media-grid">
        {robotMediaPanels.map((panel, index) => (
          <motion.article className={`robot-media-panel panel-${index + 1}`} key={panel.title} whileHover={{ y: -16, x: index === 0 ? -8 : 8 }}>
            <div className="robot-media">
              <video src={panel.src} muted loop playsInline autoPlay preload="metadata" poster={panel.poster} />
              <div className="robot-waveform" aria-hidden="true">
                {Array.from({ length: 24 }, (_, waveIndex) => (
                  <i style={{ "--wave-index": waveIndex } as CSSProperties} key={waveIndex} />
                ))}
              </div>
            </div>
            <div className="robot-media-copy">
              <span>{panel.phase}</span>
              <h3>{panel.title}</h3>
              <p>{panel.detail}</p>
              <div className="tag-row">
                {panel.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionReveal>
  );
}

function ResearchSystemsGallery() {
  return (
    <SectionReveal className="section systems-gallery-section">
      <div className="systems-gallery-heading">
        <div>
          <div className="section-kicker">
            <Sparkles size={18} aria-hidden="true" />
            Experiment Archive
          </div>
          <h2>Research artifacts as an active systems gallery.</h2>
        </div>
        <p>
          A dark research archive for proof-of-work visuals: videos, memory
          systems, projects, and deployment-facing experiments with diagonal,
          non-linear hover motion.
        </p>
      </div>
      <div className="systems-grid">
        {[...dinaReelPanels, robotMediaPanels[0]].map((panel) => (
          <motion.article className="system-tile media-tile" key={`grid-${panel.title}`} whileHover={{ y: -13, x: 9, rotate: 0.35 }}>
            <video src={panel.src} muted loop playsInline autoPlay preload="metadata" poster={panel.poster} />
            <div className="system-tile-copy">
              <small>{panel.phase}</small>
              <h3>{panel.title}</h3>
            </div>
          </motion.article>
        ))}
        <motion.article className="system-tile memory-tile" whileHover={{ y: -13, x: 9, rotate: 0.35 }}>
          <div className="mini-memory-graph" aria-hidden="true">
            <span />
            <span />
            <span />
            <i />
          </div>
          <div className="system-tile-copy">
            <small>PNEUMA</small>
            <h3>Triadic memory resolver</h3>
          </div>
        </motion.article>
        {projects.slice(0, 2).map((project) => (
          <motion.article className="system-tile project-tile" key={`grid-${project.title}`} whileHover={{ y: -13, x: 9, rotate: 0.35 }}>
            <div className="project-signal" aria-hidden="true" />
            <div className="system-tile-copy">
              <small>{project.period}</small>
              <h3>{project.title}</h3>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionReveal>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  if (!project) {
    return null;
  }

  return (
    <motion.div
      className="modal-shell"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} detail`}
    >
      <button className="modal-backdrop" type="button" onClick={onClose} aria-label="Close detail layer" />
      <motion.article
        className="project-modal"
        initial={{ y: 28, clipPath: "inset(20% 0 0 0)" }}
        animate={{ y: 0, clipPath: "inset(0% 0 0 0)" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close detail layer">
          <X size={20} aria-hidden="true" />
        </button>
        <small>{project.period}</small>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <div className="tag-row">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <a className="button primary" href={project.href} target="_blank" rel="noreferrer">
          <Github size={18} aria-hidden="true" />
          GitHub
        </a>
      </motion.article>
    </motion.div>
  );
}

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  usePointerAtmosphere();
  useHashAnchorRestore();

  return (
    <div className="site-shell">
      <IntroCurtain />
      <ScrollProgress />
      <div className="pointer-glow" aria-hidden="true" />
      <a className="skip-link" href="#about">
        Skip to content
      </a>

      <header className="site-header">
        <a className="brand-mark" href="#top" aria-label="Tanvir Ahmed Khan home">
          <span>TAK</span>
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-contact" href={`mailto:${profile.email}`}>
          <Mail size={17} aria-hidden="true" />
          Contact
        </a>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <NeuralFieldCanvas />
          <div className="hero-atmosphere" aria-hidden="true" />
          <div className="hero-type-ghost" aria-hidden="true">
            MULTIMODAL
          </div>
          <div className="hero-visual-stack" aria-hidden="true">
            <img src="/assets/portraits/portrait-hero.webp" alt="" loading="eager" />
            <span className="visual-slab slab-one" />
            <span className="visual-slab slab-two" />
          </div>

          <div className="hero-content">
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.05 }}
            >
              AI research portfolio
            </motion.p>
            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 28, clipPath: "inset(30% 0 0 0)" }}
              animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 0.9, delay: 1.12, ease: [0.22, 1, 0.36, 1] }}
            >
              Tanvir <span>Ahmed</span> Khan
            </motion.h1>
            <motion.p
              className="hero-identity"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.24 }}
            >
              {profile.identity}
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.34 }}
            >
              <MagneticLink href={resumeHref} target="_blank" rel="noreferrer" variant="primary">
                <FileText size={18} aria-hidden="true" />
                View Resume
              </MagneticLink>
              <MagneticLink href={resumeHref} download>
                <Download size={18} aria-hidden="true" />
                Download
              </MagneticLink>
              <MagneticLink href="#research" variant="ghost">
                <Sparkles size={18} aria-hidden="true" />
                View Research
              </MagneticLink>
            </motion.div>
          </div>

          <div className="hero-metrics" aria-label="Research signal summary">
            {heroMetrics.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <SectionReveal id="about" className="section about-section">
          <div className="editorial-grid">
            <div className="vertical-label">Perception Memory Speech</div>
            <div className="editorial-copy">
              <div className="section-kicker">
                <ScrollText size={18} aria-hidden="true" />
                About
              </div>
              <h2>
                Research engineer building systems where vision, speech, memory,
                and deployment meet.
              </h2>
              <p className="lead">
                Tanvir Ahmed Khan works across deep learning, computer vision,
                speech, multimodal systems, and deployment. Recent research at
                Machine Intelligence Lab focuses on real-time talking avatars,
                Audio2Face and Three.js pipelines, ARKit blend-shape decoding,
                lip-sync refinement, LLM + TTS agents, and audio-driven 3D
                Gaussian Splatting.
              </p>
            </div>
            <div className="memory-frame">
              <img src="/assets/portraits/portrait-about.webp" alt="Tanvir Ahmed Khan portrait" loading="lazy" />
              <div className="memory-caption">
                <span>Research identity</span>
                Computer vision, speech systems, memory, and neural rendering.
              </div>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal id="research" className="section research-section">
          <div className="section-heading giant">
            <div>
              <div className="section-kicker">
                <BrainCircuit size={18} aria-hidden="true" />
                Research Focus
              </div>
              <h2>Orbiting one research question: how intelligent systems perceive, remember, and speak.</h2>
            </div>
            <p>
              Vision, speech, memory, numerical modeling, and deployment work
              converge around one question: how AI systems keep context while
              acting in the world.
            </p>
          </div>
          <ResearchOrbit />
        </SectionReveal>

        <ResearchStatement />

        <SectionReveal id="pneuma" className="section memory-section">
          <div className="memory-layout">
            <div>
              <div className="section-kicker">
                <Layers3 size={18} aria-hidden="true" />
                PNEUMA Memory
              </div>
              <h2>Triadic memory for perception that can retrieve, relate, and explain.</h2>
              <p>
                PNEUMA is represented as a model-agnostic, edge-first long-term
                memory architecture: structured temporal records, vector similarity,
                and graph reasoning resolving into one answer path.
              </p>
            </div>
            <PneumaMemoryGraph />
          </div>
        </SectionReveal>

        <SectionReveal id="publications" className="section publication-section">
          <div className="paper-wall">
            <div className="paper-wall-copy">
              <div className="section-kicker">
                <BookOpenText size={18} aria-hidden="true" />
                Publications
              </div>
              <h2>Research cards with paper-like cadence, not resume rows.</h2>
            </div>
            {publications.map((paper, index) => (
              <article className="paper-card" key={paper.title}>
                <div className="paper-index">0{index + 1}</div>
                <div>
                  <span className={`status-pill ${paper.status === "Accepted" ? "accepted" : ""}`}>
                    {paper.status}
                  </span>
                  <h3>{paper.title}</h3>
                  <p className="paper-venue">
                    {paper.venue}, {paper.year}
                  </p>
                  {paper.note ? <p>{paper.note}</p> : null}
                </div>
                {paper.href ? (
                  <a
                    className="icon-link"
                    href={paper.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open publication: ${paper.title}`}
                  >
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </SectionReveal>

        <ResearchDeepDive onProjectClick={setSelectedProject} />

        <SectionReveal id="experience" className="section experience-section">
          <div className="experience-lab">
            <div className="experience-visual" aria-label="Speech, memory, and deployment signal board">
              <div className="signal-board">
                <div className="signal-header">
                  <PlayCircle size={24} aria-hidden="true" />
                  <span>Avatar and memory systems</span>
                </div>
                <div className="signal-stream" aria-hidden="true">
                  {Array.from({ length: 22 }, (_, index) => (
                    <i style={{ "--signal-index": index } as CSSProperties} key={index} />
                  ))}
                </div>
                <div className="signal-nodes">
                  <span>Audio2Face</span>
                  <span>ARKit blendshapes</span>
                  <span>3DGS</span>
                  <span>FAISS</span>
                  <span>Jetson</span>
                  <span>DGX Spark</span>
                </div>
              </div>
              <img src="/assets/gallery/campus-ideathon.webp" alt="North South University campus during an academic ideathon" loading="lazy" />
            </div>
            <div className="experience-copy">
              <div className="section-kicker">
                <ShieldCheck size={18} aria-hidden="true" />
                Research and Industry
              </div>
              <h2>Real-time avatars, deployed agents, and production systems.</h2>
              <article className="timeline-panel research-panel">
                <div className="panel-topline">
                  <span>{researchExperience.period}</span>
                  <span>{researchExperience.role}</span>
                </div>
                <h3>{researchExperience.lab}</h3>
                <p className="muted">
                  {researchExperience.organization} - Advisors: {researchExperience.advisors}
                </p>
                <ul className="system-list">
                  {researchExperience.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
              <article className="timeline-panel industry-panel">
                <div className="panel-topline">
                  <span>{industryExperience.period}</span>
                  <span>{industryExperience.location}</span>
                </div>
                <h3>{industryExperience.company}</h3>
                <p className="muted">{industryExperience.role}</p>
                <ul className="system-list">
                  {industryExperience.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="section education-section">
          <div className="education-story">
            <div className="road-crossing-panel">
              <img src="/assets/gallery/road-crossing-memory.webp" alt="Night road crossing used as a research journey metaphor" loading="lazy" />
              <div>
                <span>Journey note</span>
                <h2>Crossed a few roads before finding the research lane.</h2>
                <p>
                  Education, with a little Abbey Road energy: the route into
                  computer vision, speech systems, and Gaussian splats started
                  with campus corridors and a lot of late-night debugging.
                </p>
              </div>
            </div>
          </div>
          <div className="academic-stage">
            <img src="/assets/gallery/campus-ideathon.webp" alt="North South University campus during an ideathon" loading="lazy" />
            <div className="academic-stage-copy">
              <div className="section-kicker">
                <GraduationCap size={18} aria-hidden="true" />
                Education and Skills
              </div>
              <h2>Academic Foundation</h2>
              <p>
                Technical vocabulary and deployment practice branch from the same
                campus foundation: coursework, lab research, production systems,
                and the tools needed to move models into real interfaces.
              </p>
            </div>
            <div className="academic-flow" aria-label="Academic, technical vocabulary, and deployment practice">
              <motion.article className="academic-zone foundation-zone" whileHover={{ y: -14, x: -8, rotate: -0.35 }} tabIndex={0}>
                <span>01 / Academic Foundation</span>
                <div className="foundation-stack">
                  {education.map((item) => (
                    <div className="foundation-entry" key={item.institution}>
                      <small>{item.period}</small>
                      <h3>{item.institution}</h3>
                      <p>{item.degree}</p>
                      <ul>
                        {item.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.article>

              <motion.article className="academic-zone vocabulary-zone" whileHover={{ y: -18, x: 10, rotate: 0.45 }} tabIndex={0}>
                <span>02 / Technical Vocabulary</span>
                <h3>Research terms become working materials.</h3>
                <div className="vocabulary-cloud">
                  {academicVocabulary.map((item, index) => (
                    <span
                      className="vocab-chip"
                      data-detail={item.detail}
                      style={{ "--vocab-index": index } as CSSProperties}
                      tabIndex={0}
                      key={item.term}
                    >
                      {item.term}
                    </span>
                  ))}
                </div>
              </motion.article>

              <motion.article className="academic-zone deployment-zone" whileHover={{ y: -12, x: 14, rotate: 0.25 }} tabIndex={0}>
                <span>03 / Deployment Practice</span>
                <h3>Clean engineering path from prototype to runtime.</h3>
                <div className="deployment-console" aria-label="Deployment practice labels">
                  {deploymentPractice.map((item, index) => (
                    <i style={{ "--deploy-index": index } as CSSProperties} key={item}>
                      {item}
                    </i>
                  ))}
                </div>
              </motion.article>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal id="gallery" className="section gallery-section">
          <div className="gallery-stage">
            <div className="gallery-copy">
              <div className="section-kicker">
                <Map size={18} aria-hidden="true" />
                Visual Memory
              </div>
              <h2>Field notes from research, travel, and campus life.</h2>
              <p>
                Personal images carry the surrounding context for the work:
                labs, lectures, night walks, and the places where projects
                became concrete.
              </p>
            </div>
            <div className="depth-gallery">
              {galleryImages.map((image, index) => (
                <figure
                  className={`gallery-item item-${index + 1}`}
                  style={{ "--gallery-index": index } as CSSProperties}
                  tabIndex={0}
                  key={image.src}
                >
                  <img src={image.src} alt={image.alt} loading="lazy" />
                  <figcaption>
                    <span>{image.label}</span>
                    {image.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </SectionReveal>

        <DinaLabSection />

        <RobotbullsMilabSection />

        <ResearchSystemsGallery />

        <SectionReveal className="section awards-section">
          <div className="award-stage">
            <div>
              <div className="section-kicker">
                <Trophy size={18} aria-hidden="true" />
                Awards and Honors
              </div>
              <h2>Recognition across academics, programming, and music.</h2>
            </div>
            <div className="award-row">
              {awards.map((award) => (
                <div className="award-card" key={award}>
                  <Trophy size={20} aria-hidden="true" />
                  <span>{award}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal id="contact" className="section contact-section">
          <div className="contact-art" aria-hidden="true">
            <img src="/assets/gallery/saudi-night.webp" alt="" loading="lazy" />
          </div>
          <div>
            <div className="section-kicker">
              <Mail size={18} aria-hidden="true" />
              Contact
            </div>
            <h2>Open to research collaboration, graduate opportunities, and AI engineering work.</h2>
          </div>
          <div className="contact-actions">
            <MagneticLink href={`mailto:${profile.email}`} variant="primary">
              <Mail size={18} aria-hidden="true" />
              Email
            </MagneticLink>
            {profile.links.map((link) => (
              <MagneticLink href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                <ArrowUpRight size={18} aria-hidden="true" />
                {link.label}
              </MagneticLink>
            ))}
          </div>
        </SectionReveal>
      </main>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}

export default App;
