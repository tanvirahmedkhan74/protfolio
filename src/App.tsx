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

function ResearchJourneyRail({ onProjectClick }: { onProjectClick: (project: Project) => void }) {
  const railRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  const updateProgress = () => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }
    const max = rail.scrollWidth - rail.clientWidth;
    setProgress(max <= 0 ? 0 : rail.scrollLeft / max);
  };

  useEffect(() => {
    updateProgress();
    window.addEventListener("resize", updateProgress);
    return () => window.removeEventListener("resize", updateProgress);
  }, []);

  const moveRail = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }
    rail.scrollBy({
      left: direction * Math.min(rail.clientWidth * 0.82, 620),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section className="section rail-section" id="projects">
      <div className="rail-heading">
        <div>
          <div className="section-kicker">
            <Cpu size={18} aria-hidden="true" />
            Research Trajectory
          </div>
          <h2>Perception to memory to speech to 3D embodiment.</h2>
          <p>
            Milestones that trace the path from RAG systems and saliency work
            toward long-term memory, talking avatars, and geometry-aware facial motion.
          </p>
        </div>
        <div className="rail-controls" aria-label="Research reel controls">
          <button type="button" onClick={() => moveRail(-1)} aria-label="Scroll research reel left">
            <ArrowUpRight size={18} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => moveRail(1)} aria-label="Scroll research reel right">
            <ArrowUpRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="rail-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${Math.max(0.08, progress)})` }} />
      </div>
      <div className="research-rail" ref={railRef} onScroll={updateProgress} tabIndex={0}>
        {researchJourney.map((item, index) => (
          <article className="journey-card" key={item.title}>
            <span className="runway-index">J{index + 1}</span>
            <small>{item.label}</small>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
            <div className="tag-row">
              {item.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
        {projects.map((project, index) => (
          <article className="journey-card project-runway-card" key={project.title}>
            <span className="runway-index">P{index + 1}</span>
            <small>{project.period}</small>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tag-row">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="runway-actions">
              <a
                className="icon-link"
                href={project.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open GitHub project: ${project.title}`}
              >
                <Github size={19} aria-hidden="true" />
              </a>
              <button type="button" className="text-link" onClick={() => onProjectClick(project)}>
                Detail layer
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AvatarPipelineSection() {
  return (
    <SectionReveal id="avatar" className="section avatar-section">
      <div className="avatar-grid">
        <div className="avatar-copy">
          <div className="section-kicker">
            <Mic2 size={18} aria-hidden="true" />
            Speech to Face
          </div>
          <h2>Real-time talking avatar work, framed as an applied research pipeline.</h2>
          <p>
            MILab research and industry-relevant collaboration around audio-to-visual
            lip synchronization, streaming inference, Audio2Face/Three.js integration,
            ARKit blendshape decoding, and high-resolution mouth refinement.
          </p>
          <div className="pipeline-strip" aria-label="Real-time avatar pipeline">
            {avatarPipeline.map((step, index) => (
              <span style={{ "--pipeline-index": index } as CSSProperties} key={step}>
                {step}
              </span>
            ))}
          </div>
        </div>
        <div className="avatar-video-card">
          <div className="waveform" aria-hidden="true">
            {Array.from({ length: 28 }, (_, index) => (
              <i style={{ "--wave-index": index } as CSSProperties} key={index} />
            ))}
          </div>
          <video
            src="/assets/video/robert-2.mp4"
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            poster="/assets/gallery/lab-interface.webp"
          />
          <span>
            <PlayCircle size={18} aria-hidden="true" />
            real-time talking avatar demo
          </span>
        </div>
      </div>
    </SectionReveal>
  );
}

function DinaRenderSection() {
  return (
    <SectionReveal id="dina" className="section dina-section">
      <div className="dina-video-plane">
        <video
          src="/assets/video/render-stable.mp4"
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          poster="/assets/gallery/aerial-neural.webp"
        />
        <div className="mesh-overlay" aria-hidden="true" />
      </div>
      <div className="dina-copy">
        <div className="section-kicker">
          <Move3D size={18} aria-hidden="true" />
          Ongoing Research
        </div>
        <h2>Geometry-aware audio-to-face articulation.</h2>
        <p>
          DINA is kept intentionally high level: ongoing research on stable jaw,
          lip, and lower-face motion for FLAME-compatible talking-head systems,
          within a broader direction in 3D Gaussian Splatting and real-time faces.
        </p>
        <div className="dina-tags" aria-label="DINA public research scope">
          <span>FLAME mesh</span>
          <span>Lower-face motion</span>
          <span>3DGS direction</span>
        </div>
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

        <ResearchJourneyRail onProjectClick={setSelectedProject} />

        <SectionReveal id="experience" className="section experience-section">
          <div className="experience-console">
            <div className="console-media">
              <img src="/assets/gallery/lab-interface.webp" alt="Local technical workspace texture" loading="lazy" />
              <div className="console-overlay">
                <PlayCircle size={24} aria-hidden="true" />
                <span>Distributed inference console</span>
              </div>
            </div>
            <div className="console-copy">
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

        <SectionReveal className="section skills-section">
          <div className="section-heading">
            <div>
              <div className="section-kicker">
                <GraduationCap size={18} aria-hidden="true" />
                Education and Skills
              </div>
              <h2>Academic foundation, technical vocabulary, and deployment practice.</h2>
            </div>
          </div>
          <div className="education-ribbon">
            {education.map((item) => (
              <article className="education-card" key={item.institution}>
                <span>{item.period}</span>
                <h3>{item.institution}</h3>
                <p>{item.degree}</p>
                <ul>
                  {item.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="skill-constellation">
            {skillGroups.map((group, index) => (
              <article
                className="skill-group"
                style={{ "--skill-index": index } as CSSProperties}
                key={group.title}
              >
                <h3>{group.title}</h3>
                <div>
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
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

        <AvatarPipelineSection />

        <DinaRenderSection />

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
