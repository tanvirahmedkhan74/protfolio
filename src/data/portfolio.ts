export type LinkItem = {
  label: string;
  href: string;
};

export type FocusArea = {
  title: string;
  detail: string;
};

export type Publication = {
  status: "Accepted" | "Under Review";
  title: string;
  venue: string;
  year: string;
  href?: string;
  note?: string;
};

export type Project = {
  title: string;
  period: string;
  description: string;
  href: string;
  tags: string[];
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type GalleryImage = {
  src: string;
  alt: string;
  title: string;
  label: string;
};

export const resumeHref = "/Tanvir_Ahmed_Khan_Resume.pdf";

export const profile = {
  name: "Tanvir Ahmed Khan",
  identity:
    "AI Researcher | Computer Vision | Multimodal Learning | 3D Gaussian Splatting | Speech-to-Avatar Systems",
  shortIdentity: "Researcher-engineer building intelligent multimodal systems.",
  email: "tanvirahmedkhan74@gmail.com",
  links: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/tanvir-ahmed-khan-98654835a/",
    },
    {
      label: "Google Scholar",
      href: "https://scholar.google.com/citations?hl=en&user=Q5rEac8AAAAJ",
    },
    {
      label: "GitHub",
      href: "https://github.com/tanvirahmedkhan74",
    },
  ] satisfies LinkItem[],
};

export const navigation = [
  { label: "About", href: "#about" },
  { label: "Research", href: "#research" },
  { label: "Publications", href: "#publications" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export const researchFocus: FocusArea[] = [
  {
    title: "Computer Vision and Video",
    detail: "Deep learning, pattern recognition, video generation, saliency, and neural rendering systems.",
  },
  {
    title: "Multimodal Learning",
    detail: "Vision-language models, calibration, gating, gradient conflict reduction, and modality balance.",
  },
  {
    title: "Speech and Avatars",
    detail: "TTS, Audio2Face, ARKit blend shapes, lip-sync refinement, and real-time talking-head pipelines.",
  },
  {
    title: "Memory and Retrieval",
    detail: "RAG systems, FAISS, SQL, knowledge graphs, long-term memory, and context-aware evaluation.",
  },
  {
    title: "Dynamical Systems",
    detail: "SDEs, flow matching, numerical methods, and data-driven modeling for uncertain systems.",
  },
  {
    title: "Deployment",
    detail: "Distributed inference, multi-GPU systems, Docker, GCP, Linux, Runpod, Jetson Nano, and DGX Spark.",
  },
];

export const publications: Publication[] = [
  {
    status: "Accepted",
    title:
      "When a Nation Speaks: Machine Learning and NLP in People's Sentiment Analysis During Bangladesh's 2024 Mass Uprising.",
    venue: "IEEE International Conference on Computer and Information Technology (ICCIT)",
    year: "2025",
    href: "https://arxiv.org/abs/2512.15547",
  },
  {
    status: "Accepted",
    title:
      "Ensemble and Temporal Feature-Based Framework for Rainfall Classification in Bangladesh.",
    venue: "PLOS ONE",
    year: "2025",
    href: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0342646",
  },
  {
    status: "Under Review",
    title:
      "CAT-GS: Calibrated Adaptive Gating for Balanced and Robust Multimodal Learning.",
    venue: "Neurocomputing",
    year: "2026",
    note:
      "Addresses modality imbalance, confidence miscalibration, and gradient interference with temperature-scaled calibration, margin-thresholded gating, gradient-budget preservation, and fusion-layer gradient surgery.",
  },
];

export const education = [
  {
    institution: "North South University, Department of Electrical and Computer Engineering",
    degree: "Bachelor of Science in Computer Science and Engineering",
    period: "2021 - 2025",
    details: ["CGPA: 3.80/4.00 | Summa Cum Laude", "Coursework: Deep Learning, Pattern Recognition, NLP, Numerical Analysis"],
  },
  {
    institution: "Rajuk Uttara Model College",
    degree: "Higher Secondary Certificate (HSC)",
    period: "2018 - 2020",
    details: ["GPA: 5.00/5.00"],
  },
];

export const researchExperience = {
  lab: "Machine Intelligence Lab (MILab)",
  organization: "North South University",
  period: "Mar 2025 - Present",
  role: "Research Assistant",
  advisors: "Dr. Nabeel Mohammed and Dr. Shafin Rahman",
  points: [
    "Engineered distributed multi-GPU inference pipelines for real-time talking avatars with sub-4s latency.",
    "Integrated NVIDIA Audio2Face with Three.js and decoded ARKit blend shapes via linear optimization.",
    "Trained custom UNet and DiT architectures for high-fidelity 512 x 512 lip-sync mouth refinement.",
    "Proposed spatio-temporal geometric metrics for evaluating idle facial movements in generative talking faces.",
    "Developing containerized LLM + TTS conversational agents for Jetson Nano and DGX Spark deployment.",
    "Designing a unified real-time architecture integrating a speech-to-speech LM with 3D Gaussian Splatting for end-to-end audio-driven talking-head synthesis.",
  ],
};

export const projects: Project[] = [
  {
    title: "Automated Grading System with LLMs",
    period: "Apr 2023 - Jan 2024",
    description:
      "Full-stack grading system with FastAPI and MERN, using a RAG pipeline for context-aware evaluation of student submissions.",
    href: "https://github.com/tanvirahmedkhan74/Automated_Grading_System_CSE299.git",
    tags: ["FastAPI", "MERN", "RAG", "LLMs"],
  },
  {
    title: "DynApex: Dynamic CPU/GPU Parallelization",
    period: "Aug 2024 - Dec 2024",
    description:
      "C++ parallelization tool with data dependency analysis and runtime profiling for dynamic CUDA/OpenMP dispatch.",
    href: "https://github.com/tanvirahmedkhan74/DynApex.git",
    tags: ["C++", "CUDA", "OpenMP", "Profiling"],
  },
  {
    title: "Unsupervised Saliency Detection via Knowledge Distillation",
    period: "Aug 2024 - Dec 2024",
    description:
      "Knowledge distillation approach enabling compact architectures to achieve competitive saliency detection without ground-truth supervision.",
    href: "https://github.com/tanvirahmedkhan74/Periphery.git",
    tags: ["Computer Vision", "Distillation", "Saliency"],
  },
  {
    title: "WreckItAll: Physics-Based Game",
    period: "May 2025 - May 2025",
    description: "Physics-based destruction game in Unreal Engine 5.",
    href: "https://github.com/tanvirahmedkhan74/WreckItAll-UE5",
    tags: ["Unreal Engine 5", "Physics"],
  },
];

export const industryExperience = {
  company: "Tuctuc",
  location: "Spain (Remote)",
  period: "Jan 2022 - June 2026",
  role: "Junior Software Engineer",
  points: [
    "3+ years of industry experience.",
    "Maintained and extended Odoo-based ERP systems.",
    "Developed cross-platform mobile applications using React Native.",
    "Managed GCP cloud infrastructure for scalable deployments.",
  ],
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Deep Learning",
    items: ["PyTorch", "Transformers", "Diffusion Models", "GANs", "VAEs", "Knowledge Distillation", "Multi-GPU Distributive Training", "NeRF", "3DGS"],
  },
  {
    title: "Vision-Language",
    items: ["VLM", "World Model", "CLIP", "LipSync"],
  },
  {
    title: "Retrieval and Memory",
    items: ["FAISS", "Knowledge Graphs", "SQL", "RAG Systems"],
  },
  {
    title: "NLP",
    items: ["Large Language Models", "Sentiment Analysis", "Topic Modeling"],
  },
  {
    title: "Audio Processing",
    items: ["Mel-Spectrogram Analysis", "TTS", "NVIDIA Audio2Face"],
  },
  {
    title: "Programming",
    items: ["Python", "C++", "Golang", "JavaScript (MERN)"],
  },
  {
    title: "Tools and Platforms",
    items: ["Git", "Docker", "GCP", "FastAPI", "Runpod", "Linux"],
  },
];

export const awards = [
  "Academic Scholarship, North South University - 2023",
  "Preliminary Qualifier, ICPC Asia Dhaka Regional - 2021",
  "Second Prize, Battle of the Bands, NDC Bangladesh - 2019",
];

export const galleryImages: GalleryImage[] = [
  {
    src: "/assets/gallery/memory-sky.webp",
    alt: "Sunset cloudscape reflected over water",
    title: "Temporal sky",
    label: "Atmospheric memory",
  },
  {
    src: "/assets/gallery/forest-lake.webp",
    alt: "Dark lakeside scene with trees and reflected lights",
    title: "Low-light field",
    label: "Depth and perception",
  },
  {
    src: "/assets/gallery/aerial-neural.webp",
    alt: "Aerial view of coastline and clouds from an airplane",
    title: "Neural coastline",
    label: "Point-cloud palette",
  },
  {
    src: "/assets/gallery/saudi-city.webp",
    alt: "Saudi city architecture with mountains in the distance",
    title: "Saudi geometry",
    label: "Personal atmosphere",
  },
  {
    src: "/assets/gallery/saudi-cafe-twilight.webp",
    alt: "Saudi cafe at twilight with warm signage and evening sky",
    title: "Twilight field",
    label: "Ambient memory",
  },
  {
    src: "/assets/gallery/campus-ideathon.webp",
    alt: "North South University campus during an academic ideathon",
    title: "Campus ideathon",
    label: "Academic signal",
  },
  {
    src: "/assets/gallery/road-crossing-memory.webp",
    alt: "Night road crossing arranged as a journey motif",
    title: "Crossing path",
    label: "Research journey",
  },
  {
    src: "/assets/gallery/shoreline.webp",
    alt: "Calm shoreline at sunset",
    title: "Waveform shore",
    label: "Audio motif",
  },
  {
    src: "/assets/gallery/campus-night.webp",
    alt: "Campus building at night",
    title: "Campus signal",
    label: "Academic context",
  },
];
