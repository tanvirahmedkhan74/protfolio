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
  PauseCircle,
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

function useIsNarrow() {
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 760px)");
    const update = () => setIsNarrow(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isNarrow;
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

  if (reduceMotion) {
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

function MemoryGraph() {
  const nodes = [
    "Speech",
    "Avatar",
    "3DGS",
    "RAG",
    "FAISS",
    "SQL",
    "KG",
    "TTS",
    "VLM",
  ];

  return (
    <div className="memory-graph" aria-label="Recursive memory system visualization">
      <svg viewBox="0 0 620 360" role="img" aria-label="Memory graph connections">
        <path d="M80 180 C160 70 300 70 390 174 S520 292 574 154" />
        <path d="M88 226 C190 292 350 268 500 92" />
        <path d="M118 102 C260 190 360 206 540 242" />
      </svg>
      {nodes.map((node, index) => (
        <span
          className="memory-node"
          style={{ "--memory-index": index } as CSSProperties}
          key={node}
        >
          {node}
        </span>
      ))}
      <div className="memory-card">
        <small>Recursive retrieval</small>
        <strong>SQL + FAISS + Knowledge Graphs</strong>
        <p>Designed as layered memory, not a flat search box.</p>
      </div>
    </div>
  );
}

function HorizontalRunway({ onProjectClick }: { onProjectClick: (project: Project) => void }) {
  const runwayRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isNarrow = useIsNarrow();
  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-57%"]);

  return (
    <section className="runway-section" ref={runwayRef} id="projects">
      <div className="runway-sticky">
        <div className="runway-copy">
          <div className="section-kicker">
            <Cpu size={18} aria-hidden="true" />
            Horizontal Systems Runway
          </div>
          <h2>Applied systems moving from language to vision to deployment.</h2>
          <p>
            Selected builds across grading intelligence, CUDA profiling,
            emotion-aware speech systems, and deployed AI research workflows.
          </p>
        </div>
        <motion.div className="runway-track" style={{ x: reduceMotion || isNarrow ? 0 : x }}>
          {projects.map((project, index) => (
            <article className="runway-card project-runway-card" key={project.title}>
              <span className="runway-index">P{index + 1}</span>
              <div>
                <small>{project.period}</small>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
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
          {publications.map((paper, index) => (
            <article className="runway-card paper-runway-card" key={paper.title}>
              <span className="runway-index">R{index + 1}</span>
              <span className={`status-pill ${paper.status === "Accepted" ? "accepted" : ""}`}>
                {paper.status}
              </span>
              <h3>{paper.title}</h3>
              <p className="paper-venue">
                {paper.venue}, {paper.year}
              </p>
              {paper.note ? <p>{paper.note}</p> : null}
              {paper.href ? (
                <a className="text-link" href={paper.href} target="_blank" rel="noreferrer">
                  Open paper <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ) : null}
            </article>
          ))}
        </motion.div>
      </div>
    </section>
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

        <SectionReveal className="section memory-section">
          <div className="memory-layout">
            <div>
              <div className="section-kicker">
                <Layers3 size={18} aria-hidden="true" />
                Recursive Memory
              </div>
              <h2>Not a list of skills. A layered retrieval architecture.</h2>
              <p>
                The portfolio now visualizes the resume's RAG, FAISS, SQL, and
                knowledge-graph work as a recursive system. The diagram is original
                CSS/SVG, inspired by neural graphs and research notebooks.
              </p>
            </div>
            <MemoryGraph />
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

        <HorizontalRunway onProjectClick={setSelectedProject} />

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

        <SectionReveal className="section media-section">
          <div className="video-panel">
            <div className="video-copy">
              <div className="section-kicker">
                <Move3D size={18} aria-hidden="true" />
                Video Showcase
              </div>
              <h2>Robotics and avatar media in motion.</h2>
              <p>
                A short study loop connects the visual system back to embodied
                AI, 3D perception, and speech-driven avatar research.
              </p>
            </div>
            <div className="video-mask">
              <video
                className="showcase-video"
                src="/assets/video/humanoid-robot.mp4"
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                poster="/assets/gallery/forest-lake.webp"
              />
              <span>
                <PauseCircle size={18} aria-hidden="true" />
                muted study loop
              </span>
            </div>
          </div>
        </SectionReveal>

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
