from __future__ import annotations

import json
import shutil
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageOps
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer
from xml.sax.saxutils import escape


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
ASSET_ROOT = PUBLIC / "assets"


def ensure_dirs() -> None:
    for folder in [
        ASSET_ROOT / "portraits",
        ASSET_ROOT / "gallery",
        ASSET_ROOT / "video",
        ASSET_ROOT / "og",
    ]:
        folder.mkdir(parents=True, exist_ok=True)


def crop_to_aspect(image: Image.Image, aspect: float, center: tuple[float, float]) -> Image.Image:
    width, height = image.size
    current = width / height

    if current > aspect:
        new_width = int(height * aspect)
        new_height = height
    else:
        new_width = width
        new_height = int(width / aspect)

    cx = int(width * center[0])
    cy = int(height * center[1])
    left = max(0, min(width - new_width, cx - new_width // 2))
    top = max(0, min(height - new_height, cy - new_height // 2))
    return image.crop((left, top, left + new_width, top + new_height))


def grade(
    image: Image.Image,
    overlay: tuple[int, int, int, int] = (6, 16, 31, 44),
    brightness: float = 0.88,
    contrast: float = 1.08,
    color: float = 0.9,
) -> Image.Image:
    image = ImageEnhance.Color(image).enhance(color)
    image = ImageEnhance.Contrast(image).enhance(contrast)
    image = ImageEnhance.Brightness(image).enhance(brightness)
    veil = Image.new("RGBA", image.size, overlay)
    return Image.alpha_composite(image.convert("RGBA"), veil).convert("RGB")


def make_webp(
    source: str,
    destination: str,
    size: tuple[int, int],
    center: tuple[float, float] = (0.5, 0.5),
    brightness: float = 0.88,
    contrast: float = 1.08,
    color: float = 0.9,
    overlay: tuple[int, int, int, int] = (6, 16, 31, 44),
) -> dict[str, object]:
    src = ROOT / source
    dest = PUBLIC / destination
    with Image.open(src) as raw:
      image = ImageOps.exif_transpose(raw).convert("RGB")
      cropped = crop_to_aspect(image, size[0] / size[1], center)
      treated = grade(cropped, overlay=overlay, brightness=brightness, contrast=contrast, color=color)
      treated = treated.resize(size, Image.Resampling.LANCZOS)
      treated.save(dest, "WEBP", quality=82, method=6)

    return {
        "source": source,
        "asset": destination,
        "size": size,
        "treatment": "cropped, dark-blue color grade, webp compression",
    }


def build_og_card() -> dict[str, object]:
    source = ASSET_ROOT / "gallery" / "memory-sky.webp"
    dest = ASSET_ROOT / "og" / "og-card.webp"
    with Image.open(source) as raw:
        base = raw.convert("RGB").resize((1200, 630), Image.Resampling.LANCZOS)
    overlay = Image.new("RGBA", base.size, (4, 10, 20, 166))
    card = Image.alpha_composite(base.convert("RGBA"), overlay)
    draw = ImageDraw.Draw(card)
    draw.rectangle((72, 72, 1128, 558), outline=(198, 162, 93, 120), width=3)
    draw.text((108, 154), "Tanvir Ahmed Khan", fill=(246, 250, 253, 255))
    draw.text((108, 214), "AI Researcher | Computer Vision | Multimodal Systems", fill=(214, 225, 235, 255))
    draw.text((108, 285), "Speech-to-Avatar Systems | 3D Gaussian Splatting | RAG", fill=(198, 162, 93, 255))
    card.convert("RGB").save(dest, "WEBP", quality=84, method=6)
    return {
        "source": "generated from public/assets/gallery/memory-sky.webp",
        "asset": "assets/og/og-card.webp",
        "size": [1200, 630],
        "treatment": "local generated open graph card",
    }


def para(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(text, style)


def bullet(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(f"&bull; {escape(text)}", style)


def section(title: str, story: list[object], styles: dict[str, ParagraphStyle]) -> None:
    story.append(Spacer(1, 0.13 * inch))
    story.append(para(escape(title), styles["Section"]))


def generate_public_resume() -> dict[str, object]:
    dest = PUBLIC / "Tanvir_Ahmed_Khan_Resume.pdf"
    base = getSampleStyleSheet()
    styles = {
        "Title": ParagraphStyle(
            "Title",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=24,
            leading=28,
            textColor=colors.HexColor("#101820"),
            spaceAfter=6,
        ),
        "Meta": ParagraphStyle(
            "Meta",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.8,
            leading=12,
            textColor=colors.HexColor("#334155"),
            alignment=1,
            spaceAfter=6,
        ),
        "Section": ParagraphStyle(
            "Section",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=13,
            textColor=colors.HexColor("#0f3554"),
            spaceBefore=4,
            spaceAfter=4,
        ),
        "Body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.8,
            leading=12,
            textColor=colors.HexColor("#1f2937"),
            spaceAfter=3,
        ),
        "BodyBold": ParagraphStyle(
            "BodyBold",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=12,
            textColor=colors.HexColor("#111827"),
            spaceAfter=2,
        ),
        "Bullet": ParagraphStyle(
            "Bullet",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.45,
            leading=11.2,
            leftIndent=10,
            firstLineIndent=-7,
            textColor=colors.HexColor("#243447"),
            spaceAfter=2,
        ),
    }

    story: list[object] = [
        para("Tanvir Ahmed Khan", styles["Title"]),
        para(
            "AI Researcher | Computer Vision | Multimodal Learning | 3D Gaussian Splatting | Speech-to-Avatar Systems",
            styles["Meta"],
        ),
        para(
            'Email: <link href="mailto:tanvirahmedkhan74@gmail.com">tanvirahmedkhan74@gmail.com</link> | '
            '<link href="https://www.linkedin.com/in/tanvir-ahmed-khan-98654835a/">LinkedIn</link> | '
            '<link href="https://scholar.google.com/citations?hl=en&amp;user=Q5rEac8AAAAJ">Google Scholar</link> | '
            '<link href="https://github.com/tanvirahmedkhan74">GitHub</link>',
            styles["Meta"],
        ),
    ]

    section("Research Interests", story, styles)
    story.append(
        para(
            "Deep Learning; Computer Vision and Video Generation; Multimodal Models and NLP; "
            "Speech Synthesis and Audio Processing; Data-Driven Dynamical Systems (SDEs, Flow Matching, Numerical Methods); "
            "World Models and Cognitive AI; 3D Gaussian Splatting.",
            styles["Body"],
        )
    )

    section("Education", story, styles)
    story.append(para("North South University, Department of Electrical and Computer Engineering - Bachelor of Science in Computer Science and Engineering (2021 - 2025)", styles["BodyBold"]))
    for item in ["CGPA: 3.80/4.00 | Summa Cum Laude", "Relevant Coursework: Deep Learning, Pattern Recognition, NLP, Numerical Analysis"]:
        story.append(bullet(item, styles["Bullet"]))
    story.append(para("Rajuk Uttara Model College - Higher Secondary Certificate (HSC), GPA: 5.00/5.00 (2018 - 2020)", styles["Body"]))

    section("Publications", story, styles)
    publications = [
        "[Accepted] T. A. Khan et al. \"When a Nation Speaks: Machine Learning and NLP in People's Sentiment Analysis During Bangladesh's 2024 Mass Uprising.\" IEEE International Conference on Computer and Information Technology (ICCIT), 2025.",
        "[Accepted] T. A. Khan et al. \"Ensemble and Temporal Feature-Based Framework for Rainfall Classification in Bangladesh.\" PLOS ONE, 2025.",
        "[Under Review] T. A. Khan et al. \"CAT-GS: Calibrated Adaptive Gating for Balanced and Robust Multimodal Learning.\" Neurocomputing, 2026.",
    ]
    for item in publications:
        story.append(bullet(item, styles["Bullet"]))

    section("Research Experience", story, styles)
    story.append(para("Machine Intelligence Lab (MILab), North South University - Research Assistant (Mar 2025 - Present)", styles["BodyBold"]))
    story.append(para("Advisors: Dr. Nabeel Mohammed and Dr. Shafin Rahman", styles["Body"]))
    for item in [
        "Engineered distributed multi-GPU inference pipelines for real-time talking avatars with sub-4s latency.",
        "Integrated NVIDIA Audio2Face with Three.js; decoded ARKit blend shapes via linear optimization with high accuracy.",
        "Trained custom UNet and DiT architectures for high-fidelity 512 x 512 lip-sync mouth refinement.",
        "Proposed spatio-temporal geometric metrics for evaluating idle facial movements in generative talking faces.",
        "Developing containerized LLM + TTS conversational agents for Jetson Nano and DGX Spark deployment.",
        "Designing a unified real-time architecture integrating a speech-to-speech LM with 3D Gaussian Splatting for end-to-end audio-driven talking-head synthesis.",
    ]:
        story.append(bullet(item, styles["Bullet"]))

    section("Selected Projects", story, styles)
    for item in [
        "Automated Grading System with LLMs - Full-stack grading system (FastAPI + MERN) with RAG pipeline for context-aware evaluation of student submissions.",
        "DynApex: Dynamic CPU/GPU Parallelization - C++ parallelization tool with data dependency analysis and runtime profiling for dynamic CUDA/OpenMP dispatch.",
        "Unsupervised Saliency Detection via Knowledge Distillation - Knowledge distillation enabling compact architectures to achieve competitive saliency detection without ground-truth supervision.",
        "WreckItAll: Physics-Based Game - Physics-based destruction game in Unreal Engine 5.",
    ]:
        story.append(bullet(item, styles["Bullet"]))

    section("Industry Experience", story, styles)
    story.append(para("Tuctuc, Spain (Remote) - Junior Software Engineer (Jan 2022 - June 2026)", styles["BodyBold"]))
    story.append(bullet("3+ years of industry experience maintaining and extending Odoo-based ERP systems, developing React Native mobile apps, and managing GCP cloud infrastructure for scalable deployments.", styles["Bullet"]))

    section("Technical Skills", story, styles)
    for item in [
        "Deep Learning: PyTorch, Transformers, Diffusion Models, GANs, VAEs, Knowledge Distillation, Multi-GPU Distributive Training, NeRF, 3DGS.",
        "Vision-Language: VLM, World Model, CLIP, LipSync.",
        "Retrieval and Memory: FAISS, Knowledge Graphs, SQL, RAG Systems.",
        "NLP: Large Language Models, Sentiment Analysis, Topic Modeling.",
        "Audio Processing: Mel-Spectrogram Analysis, TTS, NVIDIA Audio2Face.",
        "Programming: Python, C++, Golang, JavaScript (MERN).",
        "Tools and Platforms: Git, Docker, GCP, FastAPI, Runpod, Linux.",
        "Languages: English (Fluent), Bangla (Native).",
    ]:
        story.append(bullet(item, styles["Bullet"]))

    section("Awards and Honors", story, styles)
    for item in [
        "Academic Scholarship, North South University - 2023.",
        "Preliminary Qualifier, ICPC Asia Dhaka Regional - 2021.",
        "Second Prize, Battle of the Bands, NDC Bangladesh - 2019.",
    ]:
        story.append(bullet(item, styles["Bullet"]))

    doc = SimpleDocTemplate(
        str(dest),
        pagesize=letter,
        rightMargin=0.55 * inch,
        leftMargin=0.55 * inch,
        topMargin=0.45 * inch,
        bottomMargin=0.45 * inch,
        title="Tanvir Ahmed Khan - Public Resume",
    )
    doc.build(story)
    return {
        "source": "main.tex and Tanvir_s_Resume_Latest.pdf",
        "asset": str(dest.relative_to(PUBLIC)),
        "treatment": "generated public-safe PDF; address, phone, and private reference contacts omitted",
    }


def copy_static_assets() -> list[dict[str, object]]:
    copied: list[dict[str, object]] = []
    copied.append(generate_public_resume())

    video_src = ROOT / "humanoid_robot.mp4"
    video_dest = ASSET_ROOT / "video" / "humanoid-robot.mp4"
    shutil.copy2(video_src, video_dest)
    copied.append(
        {
            "source": str(video_src.relative_to(ROOT)),
            "asset": str(video_dest.relative_to(PUBLIC)),
            "treatment": "copied locally without transcoding",
        }
    )
    return copied


def main() -> None:
    ensure_dirs()
    generated = [
        make_webp(
            "iCloud Photos/iCloud Photos/IMG_4363.JPG",
            "assets/portraits/portrait-hero.webp",
            (900, 1200),
            center=(0.5, 0.72),
            brightness=0.8,
            contrast=1.14,
            color=0.78,
            overlay=(8, 18, 34, 72),
        ),
        make_webp(
            "iCloud Photos_2/iCloud Photos/IMG_1658.JPG",
            "assets/portraits/portrait-about.webp",
            (840, 1050),
            center=(0.52, 0.44),
            brightness=0.82,
            contrast=1.1,
            color=0.82,
            overlay=(8, 18, 34, 56),
        ),
        make_webp(
            "iCloud Photos_2/iCloud Photos/IMG_1261.JPEG",
            "assets/gallery/memory-sky.webp",
            (1600, 900),
            center=(0.48, 0.45),
            brightness=0.78,
            contrast=1.12,
            color=0.86,
            overlay=(5, 16, 32, 78),
        ),
        make_webp(
            "iCloud Photos_2/iCloud Photos/IMG_3026.JPEG",
            "assets/gallery/forest-lake.webp",
            (1100, 1400),
            center=(0.52, 0.52),
            brightness=0.76,
            contrast=1.16,
            color=0.82,
            overlay=(5, 14, 28, 48),
        ),
        make_webp(
            "iCloud Photos/iCloud Photos/IMG_4561.JPG",
            "assets/gallery/aerial-neural.webp",
            (1100, 1400),
            center=(0.5, 0.53),
            brightness=0.84,
            contrast=1.08,
            color=0.78,
            overlay=(4, 17, 34, 42),
        ),
        make_webp(
            "iCloud Photos/iCloud Photos/IMG_4924.JPG",
            "assets/gallery/saudi-city.webp",
            (1100, 1400),
            center=(0.52, 0.55),
            brightness=0.78,
            contrast=1.12,
            color=0.86,
            overlay=(7, 16, 30, 62),
        ),
        make_webp(
            "iCloud Photos_2/iCloud Photos/IMG_1914.JPEG",
            "assets/gallery/shoreline.webp",
            (1100, 1400),
            center=(0.5, 0.55),
            brightness=0.78,
            contrast=1.1,
            color=0.82,
            overlay=(7, 18, 32, 50),
        ),
        make_webp(
            "iCloud Photos/iCloud Photos/IMG_3795.JPG",
            "assets/gallery/campus-night.webp",
            (1100, 1400),
            center=(0.52, 0.46),
            brightness=0.72,
            contrast=1.16,
            color=0.82,
            overlay=(7, 16, 30, 64),
        ),
    ]
    generated.append(build_og_card())
    generated.extend(copy_static_assets())

    manifest = {
        "generated_locally": True,
        "external_assets": [],
        "notes": [
            "Reference images were used for mood analysis only and are not copied into public assets.",
            "Address and phone from the resume are intentionally omitted from the website.",
            "Video is copied for localhost review without transcoding because ffmpeg is unavailable.",
        ],
        "assets": generated,
    }
    (ASSET_ROOT / "asset-manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(json.dumps({"assets": len(generated), "manifest": "public/assets/asset-manifest.json"}, indent=2))


if __name__ == "__main__":
    main()
