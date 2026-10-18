"""Create responsive and installable assets from the project image sources."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parents[1]
images = root / "public" / "images"
icons = root / "public" / "icons"
icons.mkdir(parents=True, exist_ok=True)

hero = Image.open(images / "studio-hero.png").convert("RGB")
hero.save(images / "studio-hero.webp", "WEBP", quality=88, method=6)

neon_hero = images / "studio-hero-neon.png"
if neon_hero.exists():
    Image.open(neon_hero).convert("RGB").save(
        neon_hero.with_suffix(".webp"), "WEBP", quality=89, method=6
    )

symbol = Image.open(images / "simbolo-jmstudio.png").convert("RGBA")
bounds = symbol.getbbox()
symbol = symbol.crop(bounds) if bounds else symbol
symbol.save(images / "simbolo-jmstudio.webp", "WEBP", quality=95, method=6)

font_path = Path("C:/Windows/Fonts/arialbd.ttf")
font = ImageFont.truetype(str(font_path), 150) if font_path.exists() else ImageFont.load_default()
wordmark = Image.new("RGBA", (1550, 340), (0, 0, 0, 0))
mark = symbol.copy()
mark.thumbnail((306, 306), Image.Resampling.LANCZOS)
wordmark.alpha_composite(mark, ((330 - mark.width) // 2, (340 - mark.height) // 2))
draw = ImageDraw.Draw(wordmark)
draw.text((345, 79), "JMSTUDIO", font=font, fill=(255, 255, 255, 255))
wordmark.save(images / "logo-jmstudio.png")
wordmark.save(images / "logo-jmstudio.webp", "WEBP", quality=95, method=6)

for size in (192, 512):
    for maskable in (False, True):
        canvas = Image.new("RGBA", (size, size), (5, 5, 7, 255))
        safe_size = round(size * (0.66 if maskable else 0.84))
        icon = symbol.copy()
        icon.thumbnail((safe_size, safe_size), Image.Resampling.LANCZOS)
        canvas.alpha_composite(icon, ((size - icon.width) // 2, (size - icon.height) // 2))
        name = f"icon-{'maskable-' if maskable else ''}{size}.png"
        canvas.convert("RGB").save(icons / name)

print("Generated wordmark, WebP assets, and PWA icons.")
