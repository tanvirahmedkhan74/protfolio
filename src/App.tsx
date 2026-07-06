import {
  ArrowUpRight,
  BookOpenText,
  BrainCircuit,
  Cpu,
  Download,
  FileText,
  Github,
  GraduationCap,
  Mail,
  Map,
  Mic2,
  Move3D,
  Network,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Trophy,
  Waves,
} from "lucide-react";
import { motion } from "framer-motion";
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
} from "./data/portfolio";

const focusIcons = [BrainCircuit, Move3D, Mic2, Network, Waves, Cpu];

function App() {
  return (
    <div className="site-shell">
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
          <img
            className="hero-portrait"
            src="/assets/portraits/portrait-hero.webp"
            alt="Portrait of Tanvir Ahmed Khan"
            loading="eager"
          />

          <div className="hero-content">
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              AI research portfolio
            </motion.p>
            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08 }}
            >
              {profile.name}
            </motion.h1>
            <motion.p
              className="hero-identity"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.16 }}
            >
              {profile.identity}
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.24 }}
            >
              <a className="button primary" href={resumeHref} target="_blank" rel="noreferrer">
                <FileText size={18} aria-hidden="true" />
                View Resume
              </a>
              <a className="button secondary" href={resumeHref} download>
                <Download size={18} aria-hidden="true" />
                Download
              </a>
              <a className="button ghost" href="#research">
                <Sparkles size={18} aria-hidden="true" />
                View Research
              </a>
            </motion.div>
          </div>

          <div className="hero-signal-strip" aria-label="Research focus summary">
            <span>Distributed inference</span>
            <span>Speech-to-avatar systems</span>
            <span>3D Gaussian Splatting</span>
            <span>RAG and memory</span>
          </div>
        </section>

        <SectionReveal id="about" className="section about-section">
          <div className="section-kicker">
            <ScrollText size={18} aria-hidden="true" />
            About
          </div>
          <div className="about-layout">
            <div>
              <h2>Researcher-engineer building intelligent multimodal systems.</h2>
              <p className="lead">
                Tanvir Ahmed Khan works across deep learning, computer vision, speech,
                multimodal systems, and deployment. His recent research at Machine
                Intelligence Lab focuses on real-time talking avatars, Audio2Face and
                Three.js pipelines, ARKit blend-shape decoding, lip-sync refinement,
                LLM + TTS agents, and audio-driven 3D Gaussian Splatting.
              </p>
              <p>
                The work is grounded in both research and engineering: GPU inference
                systems, containerized deployment, RAG pipelines, and production software
                experience across Odoo ERP, React Native, and GCP.
              </p>
            </div>
            <figure className="about-portrait">
              <img
                src="/assets/portraits/portrait-about.webp"
                alt="Tanvir Ahmed Khan in a dark cinematic portrait crop"
                loading="lazy"
              />
              <figcaption>
                Computer vision, speech systems, memory, and neural rendering.
              </figcaption>
            </figure>
          </div>
        </SectionReveal>

        <SectionReveal id="research" className="section research-section">
          <div className="section-heading">
            <div>
              <div className="section-kicker">
                <BrainCircuit size={18} aria-hidden="true" />
                Research Focus
              </div>
              <h2>Perception, memory, speech, and real-time neural systems.</h2>
            </div>
            <p>
              A focused map of the areas explicitly represented in the resume, organized
              for research labs, graduate programs, and AI engineering teams.
            </p>
          </div>

          <div className="focus-grid">
            {researchFocus.map((item, index) => {
              const Icon = focusIcons[index] ?? BrainCircuit;
              return (
                <article className="focus-card" key={item.title}>
                  <Icon size={24} aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </article>
              );
            })}
          </div>
        </SectionReveal>

        <SectionReveal id="publications" className="section publication-section">
          <div className="section-heading">
            <div>
              <div className="section-kicker">
                <BookOpenText size={18} aria-hidden="true" />
                Publications
              </div>
              <h2>Peer-reviewed and under-review research.</h2>
            </div>
          </div>

          <div className="paper-stack">
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

        <SectionReveal id="experience" className="section experience-section">
          <div className="section-heading">
            <div>
              <div className="section-kicker">
                <ShieldCheck size={18} aria-hidden="true" />
                Experience
              </div>
              <h2>Research systems and production engineering.</h2>
            </div>
          </div>

          <div className="experience-grid">
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

            <article className="timeline-panel">
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
        </SectionReveal>

        <SectionReveal id="projects" className="section project-section">
          <div className="section-heading">
            <div>
              <div className="section-kicker">
                <Cpu size={18} aria-hidden="true" />
                Selected Projects
              </div>
              <h2>Applied systems spanning LLMs, CUDA, vision, and simulation.</h2>
            </div>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-card-head">
                  <span>{project.period}</span>
                  <a
                    className="icon-link"
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open GitHub project: ${project.title}`}
                  >
                    <Github size={19} aria-hidden="true" />
                  </a>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tag-row">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal className="section skills-section">
          <div className="section-heading">
            <div>
              <div className="section-kicker">
                <GraduationCap size={18} aria-hidden="true" />
                Education and Skills
              </div>
              <h2>Academic foundation with a deployment-oriented toolchain.</h2>
            </div>
          </div>

          <div className="education-grid">
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

          <div className="skill-cloud">
            {skillGroups.map((group) => (
              <article className="skill-group" key={group.title}>
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
          <div className="section-heading">
            <div>
              <div className="section-kicker">
                <Map size={18} aria-hidden="true" />
                Visual Gallery
              </div>
              <h2>Personal visual memory translated into research atmosphere.</h2>
            </div>
            <p>
              Selected local photos are color-graded and compressed as derivative assets.
              Reference images informed mood only and are not used in production.
            </p>
          </div>

          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <figure className={`gallery-item item-${index + 1}`} key={image.src}>
                <img src={image.src} alt={image.alt} loading="lazy" />
                <figcaption>
                  <span>{image.label}</span>
                  {image.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal className="section media-section">
          <div className="video-panel">
            <div className="video-copy">
              <div className="section-kicker">
                <Move3D size={18} aria-hidden="true" />
                Video Showcase
              </div>
              <h2>Local robotics/avatar media for the first review build.</h2>
              <p>
                The local MP4 is included as a muted, looping showcase. It is not uploaded
                externally and can be compressed or replaced after the localhost review.
              </p>
            </div>
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
          </div>
        </SectionReveal>

        <SectionReveal className="section awards-section">
          <div className="section-heading">
            <div>
              <div className="section-kicker">
                <Trophy size={18} aria-hidden="true" />
                Awards and Honors
              </div>
              <h2>Recognition from academics, programming, and music.</h2>
            </div>
          </div>
          <div className="award-row">
            {awards.map((award) => (
              <div className="award-card" key={award}>
                <Trophy size={20} aria-hidden="true" />
                <span>{award}</span>
              </div>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal id="contact" className="section contact-section">
          <div>
            <div className="section-kicker">
              <Mail size={18} aria-hidden="true" />
              Contact
            </div>
            <h2>Open to research collaboration, graduate opportunities, and AI engineering work.</h2>
          </div>
          <div className="contact-actions">
            <a className="button primary" href={`mailto:${profile.email}`}>
              <Mail size={18} aria-hidden="true" />
              Email
            </a>
            {profile.links.map((link) => (
              <a className="button secondary" href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                <ArrowUpRight size={18} aria-hidden="true" />
                {link.label}
              </a>
            ))}
          </div>
        </SectionReveal>
      </main>
    </div>
  );
}

export default App;
