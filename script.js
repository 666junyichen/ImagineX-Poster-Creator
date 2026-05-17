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
    backgroundTop: "#1f2e40",
    backgroundBottom: "#fff8ea",
    paper: "#fffdf6",
    ink: "#1f2e40",
    muted: "#5e707e",
    band: "#1f2e40",
    accent: "#f4be5f",
    soft: "#f0f7f3",
  },
  {
    id: "market",
    label: "Night Market",
    backgroundTop: "#151820",
    backgroundBottom: "#ffd7a8",
    paper: "#fff4da",
    ink: "#151820",
    muted: "#6e5d4f",
    band: "#151820",
    accent: "#e85b6f",
    soft: "#ffecef",
  },
  {
    id: "tech",
    label: "Tech Talk",
    backgroundTop: "#20364f",
    backgroundBottom: "#d7ece7",
    paper: "#f8fbf8",
    ink: "#20364f",
    muted: "#53687a",
    band: "#20364f",
    accent: "#5fa48e",
    soft: "#e7f3f0",
  },
];

const accents = ["#f4be5f", "#5fa48e", "#e85b6f", "#3f7cac", "#151820"];

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

  if (current) {
    lines.push(current);
  }

  return lines;
}

function drawTextBlock(text, x, y, maxWidth, lineHeight, font, fill, limit) {
  const lines = wrapLines(text, maxWidth, font).slice(0, limit);
  ctx.font = font;
  ctx.fillStyle = fill;
  ctx.textBaseline = "top";
  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * lineHeight);
  });
  return y + lines.length * lineHeight;
}

function drawCoverImage(image, x, y, width, height, radius) {
  const scale = Math.max(width / image.width, height / image.height);
  const scaledWidth = image.width * scale;
  const scaledHeight = image.height * scale;
  const sx = (width - scaledWidth) / 2;
  const sy = (height - scaledHeight) / 2;

  ctx.save();
  roundedRect(x, y, width, height, radius);
  ctx.clip();
  ctx.drawImage(image, x + sx, y + sy, scaledWidth, scaledHeight);
  ctx.restore();
}

function drawDefaultArt(preset) {
  fillRoundedRect(72, 258, 624, 426, 42, preset.soft);

  ctx.fillStyle = "#5fa48e";
  ctx.beginPath();
  ctx.arc(205, 407, 96, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = activeAccent;
  ctx.beginPath();
  ctx.arc(553, 389, 86, 0, Math.PI * 2);
  ctx.fill();

  fillRoundedRect(170, 518, 440, 76, 38, preset.ink);
  fillRoundedRect(220, 560, 328, 78, 38, "#407c97");

  ctx.strokeStyle = "#fffdf6";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(120, 630);
  ctx.lineTo(648, 330);
  ctx.stroke();

  ctx.strokeStyle = "#5b7e9a";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(120, 654);
  ctx.lineTo(648, 354);
  ctx.stroke();

  ["#e85b6f", "#fffdf6", "#5177b3"].forEach((color, index) => {
    const points = [
      [350, 374],
      [430, 438],
      [510, 392],
    ];
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(points[index][0], points[index][1], 20, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawPoster() {
  const preset = { ...activePreset, accent: activeAccent };
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, preset.backgroundTop);
  gradient.addColorStop(1, preset.backgroundBottom);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#5fa48e";
  ctx.beginPath();
  ctx.arc(40, 70, 202, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = preset.accent;
  ctx.beginPath();
  ctx.arc(700, 260, 172, 0, Math.PI * 2);
  ctx.fill();

  fillRoundedRect(36, 36, 696, 1014, 48, preset.paper);

  ctx.fillStyle = preset.muted;
  ctx.font = "700 18px Manrope, sans-serif";
  ctx.textBaseline = "top";
  ctx.fillText("EVENT POSTER", 72, 74);

  drawTextBlock(
    fields.title.value || "Untitled Event",
    72,
    108,
    610,
    64,
    "800 58px Fraunces, serif",
    preset.ink,
    2,
  );

  if (uploadedImage) {
    drawCoverImage(uploadedImage, 72, 258, 624, 426, 42);
  } else {
    drawDefaultArt(preset);
  }

  fillRoundedRect(72, 724, 624, 156, 30, preset.band);

  ctx.fillStyle = preset.accent;
  ctx.font = "800 22px Manrope, sans-serif";
  ctx.fillText("ABOUT", 106, 756);

  drawTextBlock(
    fields.description.value || "A hands-on creative workshop event.",
    106,
    796,
    548,
    35,
    "400 26px Manrope, sans-serif",
    preset.paper,
    3,
  );

  const cards = [
    ["DATE", fields.date.value || "TBC"],
    ["TIME", fields.time.value || "TBC"],
    ["PLACE", fields.place.value || "TBC"],
  ];

  cards.forEach(([label, value], index) => {
    const x = 72 + index * 217;
    fillRoundedRect(x, 916, 190, 92, 24, preset.soft);
    ctx.fillStyle = preset.muted;
    ctx.font = "800 22px Manrope, sans-serif";
    ctx.fillText(label, x + 22, 940);

    drawTextBlock(
      value,
      x + 22,
      970,
      146,
      30,
      "800 26px Manrope, sans-serif",
      preset.ink,
      1,
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
  link.download = "imaginex-poster.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

document.querySelector("#resetButton").addEventListener("click", () => {
  fields.title.value = "ImagineX Creative Lab";
  fields.date.value = "11 May 2026";
  fields.time.value = "2:00 PM";
  fields.place.value = "Google Workshop";
  fields.description.value = "A hands-on mini challenge for turning ideas into polished event posters.";
  uploadedImage = null;
  activePreset = presets[0];
  activeAccent = activePreset.accent;
  document.querySelector("#activePresetLabel").textContent = activePreset.label;
  renderPresetButtons();
  renderSwatches();
  drawPoster();
});

renderPresetButtons();
renderSwatches();
drawPoster();
