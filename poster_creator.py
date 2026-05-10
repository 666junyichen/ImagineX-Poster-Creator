from dataclasses import dataclass
from pathlib import Path
from textwrap import wrap

from PIL import Image, ImageDraw, ImageFont


POSTER_SIZE = (768, 1086)


@dataclass
class EventDetails:
    title: str
    date: str
    time: str
    place: str
    description: str


def load_font(size, bold=False):
    names = [
        "DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf",
        "Arial Bold.ttf" if bold else "Arial.ttf",
    ]
    for name in names:
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def wrap_text(text, max_chars):
    clean_text = " ".join(text.split())
    if not clean_text:
        return []
    return wrap(clean_text, width=max_chars, break_long_words=False)


def fit_cover(image, size):
    target_w, target_h = size
    scale = max(target_w / image.width, target_h / image.height)
    new_size = (round(image.width * scale), round(image.height * scale))
    image = image.resize(new_size)
    left = (image.width - target_w) // 2
    top = (image.height - target_h) // 2
    return image.crop((left, top, left + target_w, top + target_h))


def draw_vertical_gradient(draw, width, height, top_color, bottom_color):
    for y in range(height):
        ratio = y / max(height - 1, 1)
        color = tuple(
            round(top_color[i] * (1 - ratio) + bottom_color[i] * ratio)
            for i in range(3)
        )
        draw.line([(0, y), (width, y)], fill=color)


def draw_wrapped_text(draw, text, xy, font, fill, max_chars, line_gap=10, limit=None):
    x, y = xy
    lines = wrap_text(text, max_chars)
    if limit is not None:
        lines = lines[:limit]
    for line in lines:
        draw.text((x, y), line, font=font, fill=fill)
        bbox = draw.textbbox((x, y), line, font=font)
        y += bbox[3] - bbox[1] + line_gap
    return y


def draw_default_art(draw):
    draw.rounded_rectangle([(72, 258), (696, 684)], radius=42, fill=(240, 247, 243))
    draw.ellipse([(110, 312), (300, 502)], fill=(100, 172, 143))
    draw.ellipse([(468, 304), (638, 474)], fill=(245, 188, 92))
    draw.rounded_rectangle([(170, 518), (610, 594)], radius=38, fill=(32, 50, 62))
    draw.rounded_rectangle([(220, 560), (548, 638)], radius=38, fill=(64, 124, 151))
    draw.line([(120, 630), (648, 330)], fill=(255, 255, 255), width=10)
    draw.line([(120, 654), (648, 354)], fill=(91, 126, 154), width=5)
    for x, y, color in [
        (350, 374, (234, 91, 111)),
        (430, 438, (255, 255, 255)),
        (510, 392, (81, 119, 179)),
    ]:
        draw.ellipse([(x - 20, y - 20), (x + 20, y + 20)], fill=color)


def paste_event_image(poster, image_path):
    image = Image.open(image_path).convert("RGB")
    image = fit_cover(image, (624, 426))
    mask = Image.new("L", image.size, 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([(0, 0), image.size], radius=42, fill=255)
    poster.paste(image, (72, 258), mask)


def create_event_poster(details, output_path="your_poster.png", image_path=None):
    width, height = POSTER_SIZE
    poster = Image.new("RGB", POSTER_SIZE, (255, 255, 255))
    draw = ImageDraw.Draw(poster)

    draw_vertical_gradient(draw, width, height, (31, 46, 64), (247, 238, 216))
    draw.ellipse([(-160, -120), (240, 300)], fill=(94, 164, 142))
    draw.ellipse([(530, 90), (870, 430)], fill=(244, 190, 95))
    draw.rounded_rectangle([(36, 36), (732, 1050)], radius=48, fill=(255, 252, 244))

    title_font = load_font(58, bold=True)
    label_font = load_font(22, bold=True)
    body_font = load_font(26)
    detail_font = load_font(28, bold=True)
    small_font = load_font(18)

    draw.text((72, 74), "EVENT POSTER", font=small_font, fill=(94, 112, 126))
    draw_wrapped_text(
        draw,
        details.title or "Untitled Event",
        (72, 108),
        title_font,
        (31, 46, 64),
        max_chars=17,
        line_gap=6,
        limit=2,
    )

    if image_path:
        paste_event_image(poster, image_path)
    else:
        draw_default_art(draw)

    draw.rounded_rectangle([(72, 724), (696, 880)], radius=30, fill=(31, 46, 64))
    draw.text((106, 756), "ABOUT", font=label_font, fill=(245, 188, 92))
    draw_wrapped_text(
        draw,
        details.description or "A hands-on creative workshop event.",
        (106, 796),
        body_font,
        (255, 252, 244),
        max_chars=39,
        line_gap=8,
        limit=3,
    )

    info_cards = [
        ("DATE", details.date or "TBC"),
        ("TIME", details.time or "TBC"),
        ("PLACE", details.place or "TBC"),
    ]
    card_w = 190
    for index, (label, value) in enumerate(info_cards):
        x = 72 + index * (card_w + 27)
        draw.rounded_rectangle([(x, 916), (x + card_w, 1008)], radius=24, fill=(240, 247, 243))
        draw.text((x + 22, 940), label, font=label_font, fill=(94, 112, 126))
        draw_wrapped_text(draw, value, (x + 22, 970), detail_font, (31, 46, 64), max_chars=11, line_gap=2, limit=1)

    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    poster.save(output_path, quality=95)
    return output_path
