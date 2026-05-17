const canvas = document.querySelector("#posterCanvas");
const ctx = canvas.getContext("2d");

const fields = {
  title: document.querySelector("#titleInput"),
  date: document.querySelector("#dateInput"),
  time: document.querySelector("#timeInput"),
  place: document.querySelector("#placeInput"),
  description: document.querySelector("#descriptionInput"),
};

const presets = [
  {
    id: "creative",
    label: "Creative Lab",
    paper: "#fffdf6",
    ink: "#141414",
    muted: "#5f6570",
    band: "#141414",
    soft: "#ead8b8",
    accent: "#e64b3c",
    second: "#2f6f9f",
  },
  {
    id: "market",
    label: "Night Market",
    paper: "#fff5df",
    ink: "#151820",
    muted: "#6e5d4f",
    band: "#151820",
    soft: "#f5c17a",
    accent: "#e64b3c",
    second: "#f08a3c",
  },
  {
    id: "tech",
    label: "Tech Talk",
    paper: "#f8fbf8",
    ink: "#1f2e40",
    muted: "#53687a",
    band: "#1f2e40",
    soft: "#d7ece7",
    accent: "#2f6f9f",
    second: "#4f9b8f",
  },
  {
    id: "campus",
    label: "Campus Fair",
    paper: "#fff8e8",
    ink: "#282315",
    muted: "#6b5e45",
    band: "#282315",
    soft: "#e8b84a",
    accent: "#4f9b8f",
    second: "#e64b3c",
  },
  {
    id: "music",
    label: "Music Session",
    paper: "#fbf4ee",
    ink: "#211a1d",
    muted: "#725c66",
    band: "#211a1d",
    soft: "#f2c7c2",
    accent: "#e64b3c",
    second: "#1f2e40",
  },
  {
    id: "print",
    label: "Print Club",
    paper: "#fffdf6",
    ink: "#111111",
    muted: "#5f6570",
    band: "#111111",
    soft: "#e6e1df",
    accent: "#f08a3c",
    second: "#2f6f9f",
  },
];

const accents = ["#e64b3c", "#2f6f9f", "#f08a3c", "#4f9b8f", "#e8b84a", "#1f2e40"];

let activePreset = presets[0];
let activeAccent = activePreset.accent;
let uploadedImage = null;

function roundedRect(x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function fillRoundedRect(x, y, width, height, radius, fill) {
  roundedRect(x, y, width, height, radius);
  ctx.fillStyle = fill;
  ctx.fill();
}

function wrapLines(text, maxWidth, font) {
  ctx.font = font;
  const words = String(text || "").trim().split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width <= maxWidth || !current) {
      current = test;
    } else {
      lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function drawTextBlock(text, x, y, maxWidth, lineHeight, font, fill, limit, transform = "none") {
  const content = transform === "uppercase" ? String(text || "").toUpperCase() : text;
  const lines = wrapLines(content, maxWidth, font).slice(0, limit);
  ctx.font = font;
  ctx.fillStyle = fill;
  ctx.textBaseline = "top";
  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * lineHeight);
  });
  return y + lines.length * lineHeight;
}

function drawHalftone(x, y, width, height, color, spacing = 8, radius = 1.2, alpha = 0.16) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.clip();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  for (let dotY = y; dotY < y + height; dotY += spacing) {
    for (let dotX = x + ((dotY / spacing) % 2) * (spacing / 2); dotX < x + width; dotX += spacing) {
      ctx.beginPath();
      ctx.arc(dotX, dotY, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

function drawPaperGrain() {
  ctx.save();
  ctx.globalAlpha = 0.08;
  for (let i = 0; i < 2600; i += 1) {
    const value = 130 + Math.random() * 80;
    ctx.fillStyle = `rgb(${value}, ${value}, ${value})`;
    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
  }
  ctx.restore();
}

function drawRegistrationMarks(x, y, width, height, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.45;
  ctx.lineWidth = 3;
  const size = 26;
  const inset = 18;
  const points = [
    [x + inset, y + inset, 1, 1],
    [x + width - inset, y + inset, -1, 1],
    [x + inset, y + height - inset, 1, -1],
    [x + width - inset, y + height - inset, -1, -1],
  ];

  points.forEach(([px, py, sx, sy]) => {
    ctx.beginPath();
    ctx.moveTo(px, py + sy * size);
    ctx.lineTo(px, py);
    ctx.lineTo(px + sx * size, py);
    ctx.stroke();
  });
  ctx.restore();
}

function drawCoverImage(image, x, y, width, height) {
  const scale = Math.max(width / image.width, height / image.height);
  const scaledWidth = image.width * scale;
  const scaledHeight = image.height * scale;
  const sx = (width - scaledWidth) / 2;
  const sy = (height - scaledHeight) / 2;

  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.clip();
  ctx.filter = "grayscale(0.85) contrast(1.2) brightness(0.82)";
  ctx.drawImage(image, x + sx, y + sy, scaledWidth, scaledHeight);
  ctx.filter = "none";
  ctx.globalCompositeOperation = "multiply";
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = activeAccent;
  ctx.fillRect(x, y, width, height);
  ctx.restore();
  drawHalftone(x, y, width, height, "#111111", 7, 1.35, 0.18);
}

function drawDefaultArt(preset) {
  const x = 72;
  const y = 298;
  const width = 624;
  const height = 432;

  ctx.fillStyle = preset.soft;
  ctx.fillRect(x, y, width, height);
  drawHalftone(x, y, width, height, preset.ink, 8, 1.3, 0.12);

  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.clip();

  ctx.globalAlpha = 0.92;
  ctx.fillStyle = preset.ink;
  ctx.beginPath();
  ctx.ellipse(x + 145, y + 120, 250, 92, -0.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = activeAccent;
  ctx.globalAlpha = 0.82;
  ctx.beginPath();
  ctx.ellipse(x + 420, y + 145, 260, 76, -0.7, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = preset.second;
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.ellipse(x + 360, y + 318, 360, 70, 0.15, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 1;
  ctx.strokeStyle = preset.paper;
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.moveTo(x + 20, y + height - 34);
  ctx.bezierCurveTo(x + 170, y + 230, x + 350, y + 350, x + width - 28, y + 30);
  ctx.stroke();
  ctx.restore();

  drawRegistrationMarks(x, y, width, height, preset.ink);
}

function drawPoster() {
  const preset = { ...activePreset, accent: activeAccent };
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = preset.paper;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawHalftone(0, 0, canvas.width, canvas.height, preset.ink, 6, 1, 0.12);

  ctx.fillStyle = preset.paper;
  ctx.fillRect(48, 38, 672, 1010);
  drawPaperGrain();

  ctx.fillStyle = preset.ink;
  ctx.font = "700 18px 'IBM Plex Sans', sans-serif";
  ctx.textBaseline = "top";
  ctx.fillText("EVENT POSTER / HALFTONE STUDIO", 72, 66);

  ctx.fillStyle = activeAccent;
  ctx.fillRect(72, 94, 172, 8);

  drawTextBlock(
    fields.title.value || "Untitled Event",
    72,
    118,
    624,
    82,
    "800 72px 'Playfair Display', serif",
    preset.ink,
    2,
    "uppercase",
  );

  ctx.fillStyle = preset.ink;
  ctx.fillRect(72, 262, 624, 5);

  if (uploadedImage) {
    drawCoverImage(uploadedImage, 72, 298, 624, 432);
  } else {
    drawDefaultArt(preset);
  }

  ctx.fillStyle = preset.band;
  ctx.fillRect(72, 768, 624, 126);
  drawHalftone(72, 768, 624, 126, preset.paper, 6, 1.1, 0.08);

  drawTextBlock(
    fields.description.value || "A hands-on creative workshop event.",
    102,
    800,
    552,
    34,
    "400 25px Manrope, sans-serif",
    preset.paper,
    3,
  );

  ctx.fillStyle = preset.ink;
  ctx.fillRect(72, 936, 624, 2);

  const cards = [
    ["DATE", fields.date.value || "TBC"],
    ["TIME", fields.time.value || "TBC"],
    ["LOCATION", fields.place.value || "TBC"],
  ];

  cards.forEach(([label, value], index) => {
    const x = 72 + index * 208;
    ctx.fillStyle = "rgba(20, 20, 20, 0.08)";
    ctx.fillRect(x + 188, 960, 1, 76);
    ctx.fillStyle = preset.ink;
    ctx.font = "700 15px 'IBM Plex Sans', sans-serif";
    ctx.fillText(label, x, 966);
    drawTextBlock(
      value,
      x,
      998,
      168,
      26,
      "700 21px Manrope, sans-serif",
      preset.ink,
      1,
      "uppercase",
    );
  });
}

function renderPresetButtons() {
  const grid = document.querySelector("#presetGrid");
  grid.innerHTML = "";
  presets.forEach((preset) => {
    const button = document.createElement("button");
    button.className = "preset-button";
    button.type = "button";
    button.textContent = preset.label;
    button.setAttribute("aria-pressed", String(preset.id === activePreset.id));
    button.addEventListener("click", () => {
      activePreset = preset;
      activeAccent = preset.accent;
      document.querySelector("#activePresetLabel").textContent = preset.label;
      renderPresetButtons();
      renderSwatches();
      drawPoster();
    });
    grid.append(button);
  });
}

function renderSwatches() {
  const row = document.querySelector("#swatchRow");
  row.innerHTML = "";
  accents.forEach((accent) => {
    const button = document.createElement("button");
    button.className = "swatch-button";
    button.type = "button";
    button.style.background = accent;
    button.setAttribute("aria-label", `Use accent color ${accent}`);
    button.setAttribute("aria-pressed", String(accent === activeAccent));
    button.addEventListener("click", () => {
      activeAccent = accent;
      renderSwatches();
      drawPoster();
    });
    row.append(button);
  });
}

function loadImageFile(file) {
  if (!file || !file.type.startsWith("image/")) return;

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const image = new Image();
    image.addEventListener("load", () => {
      uploadedImage = image;
      drawPoster();
    });
    image.src = reader.result;
  });
  reader.readAsDataURL(file);
}

function resetPoster() {
  fields.title.value = "The Print Revolution";
  fields.date.value = "Oct 24, 2026";
  fields.time.value = "18:00 - 21:00";
  fields.place.value = "Metro Design Lab, Sydney";
  fields.description.value = "Exploring the intersection of tactile risograph textures and modern digital design principles.";
  uploadedImage = null;
  activePreset = presets[0];
  activeAccent = activePreset.accent;
  document.querySelector("#activePresetLabel").textContent = activePreset.label;
  renderPresetButtons();
  renderSwatches();
  drawPoster();
}

Object.values(fields).forEach((field) => {
  field.addEventListener("input", drawPoster);
});

document.querySelector("#imageInput").addEventListener("change", (event) => {
  loadImageFile(event.target.files[0]);
});

const uploadZone = document.querySelector("#uploadZone");
["dragenter", "dragover"].forEach((name) => {
  uploadZone.addEventListener(name, (event) => {
    event.preventDefault();
    uploadZone.classList.add("drag-over");
  });
});

["dragleave", "drop"].forEach((name) => {
  uploadZone.addEventListener(name, (event) => {
    event.preventDefault();
    uploadZone.classList.remove("drag-over");
  });
});

uploadZone.addEventListener("drop", (event) => {
  loadImageFile(event.dataTransfer.files[0]);
});

document.querySelector("#downloadButton").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "imaginex-halftone-poster.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

document.querySelector("#resetButton").addEventListener("click", resetPoster);
document.querySelector("#newProjectButton").addEventListener("click", resetPoster);

document.fonts.ready.then(() => {
  renderPresetButtons();
  renderSwatches();
  drawPoster();
});
