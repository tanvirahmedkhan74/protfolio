from __future__ import annotations

import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageOps


ROOT = Path(__file__).resolve().parents[1]
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".jfif", ".png", ".webp", ".avif"}
FOLDERS = [
    ROOT / "iCloud Photos" / "iCloud Photos",
    ROOT / "iCloud Photos_2" / "iCloud Photos",
    ROOT / "reference_images",
]
OUT_DIR = ROOT / "tmp" / "media-audit"


def iter_images(folder: Path) -> list[Path]:
    if not folder.exists():
        return []
    return sorted(
        path
        for path in folder.rglob("*")
        if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS
    )


def image_meta(path: Path) -> dict[str, object]:
    with Image.open(path) as img:
        width, height = img.size
        mode = img.mode
        oriented = ImageOps.exif_transpose(img)
        rgb = oriented.convert("RGB").resize((1, 1))
        avg = rgb.getpixel((0, 0))
    return {
        "path": str(path.relative_to(ROOT)),
        "folder": path.parent.name,
        "width": width,
        "height": height,
        "mode": mode,
        "extension": path.suffix.lower(),
        "megapixels": round(width * height / 1_000_000, 2),
        "average_rgb": avg,
    }


def make_contact_sheet(folder: Path, images: list[Path]) -> Path | None:
    if not images:
        return None

    thumb_w, thumb_h = 260, 190
    label_h = 42
    gap = 14
    cols = 4
    rows = (len(images) + cols - 1) // cols
    sheet_w = cols * thumb_w + (cols + 1) * gap
    sheet_h = rows * (thumb_h + label_h) + (rows + 1) * gap
    sheet = Image.new("RGB", (sheet_w, sheet_h), (11, 16, 28))
    draw = ImageDraw.Draw(sheet)

    for idx, path in enumerate(images):
        row, col = divmod(idx, cols)
        x = gap + col * (thumb_w + gap)
        y = gap + row * (thumb_h + label_h + gap)
        with Image.open(path) as img:
            oriented = ImageOps.exif_transpose(img).convert("RGB")
            oriented.thumbnail((thumb_w, thumb_h))
            canvas = Image.new("RGB", (thumb_w, thumb_h), (18, 25, 40))
            px = (thumb_w - oriented.width) // 2
            py = (thumb_h - oriented.height) // 2
            canvas.paste(oriented, (px, py))
        sheet.paste(canvas, (x, y))
        label = f"{idx + 1:02d} {path.name}"
        draw.text((x + 6, y + thumb_h + 8), label, fill=(219, 226, 239))

    out = OUT_DIR / f"{folder.parent.name if folder.name == 'iCloud Photos' else folder.name}.jpg"
    sheet.save(out, quality=88)
    return out


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    all_meta: list[dict[str, object]] = []
    sheets: list[str] = []

    for folder in FOLDERS:
        images = iter_images(folder)
        all_meta.extend(image_meta(path) for path in images)
        sheet = make_contact_sheet(folder, images)
        if sheet:
            sheets.append(str(sheet.relative_to(ROOT)))

    (OUT_DIR / "image-metadata.json").write_text(
        json.dumps(all_meta, indent=2), encoding="utf-8"
    )
    print(json.dumps({"image_count": len(all_meta), "sheets": sheets}, indent=2))


if __name__ == "__main__":
    main()
