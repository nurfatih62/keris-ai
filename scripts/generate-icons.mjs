import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { deflateSync } from "node:zlib";

const here = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(here, "..", "public", "icons");
mkdirSync(outputDir, { recursive: true });

const SIZE = 512;
const SUPERSAMPLE = 4;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(edge0, edge1, value) {
  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function mix(a, b, t) {
  return a + (b - a) * t;
}

function mixColor(from, to, t) {
  return [
    Math.round(mix(from[0], to[0], t)),
    Math.round(mix(from[1], to[1], t)),
    Math.round(mix(from[2], to[2], t)),
  ];
}

const GOLD = [232, 198, 122];
const GOLD_DARK = [165, 116, 44];
const GOLD_LIGHT = [246, 226, 177];

function artworkColor(x, y) {
  const cx = 0.5;
  const cy = 0.5;
  const distCenter = Math.hypot(x - cx, y - cy);

  const glow = clamp(1 - distCenter / 0.62, 0, 1);
  let color = mixColor([38, 23, 15], [93, 58, 37], glow * 0.9);

  const ringDist = Math.abs(distCenter - 0.42);
  if (ringDist < 0.006) {
    color = mixColor(color, GOLD_DARK, 0.85);
  }

  for (let i = 0; i < 24; i += 1) {
    const angle = (i / 24) * Math.PI * 2;
    const dotX = cx + Math.cos(angle) * 0.465;
    const dotY = cy + Math.sin(angle) * 0.465;
    if (Math.hypot(x - dotX, y - dotY) < 0.0045) {
      color = mixColor(color, GOLD, 0.9);
    }
  }

  const bladeTop = 0.12;
  const bladeBottom = 0.67;
  if (y >= bladeTop && y <= bladeBottom) {
    const t = (y - bladeTop) / (bladeBottom - bladeTop);
    const wave = Math.sin(t * Math.PI * 3.2 - 0.4) * 0.045 * (0.35 + t * 0.65);
    const halfWidth = 0.011 + 0.032 * Math.pow(t, 1.35);
    const bladeX = cx + wave;
    const distance = Math.abs(x - bladeX) / halfWidth;

    if (distance <= 1) {
      const edge = smoothstep(1, 0.82, distance);
      const sheen = clamp(1 - Math.abs(x - (bladeX - halfWidth * 0.28)) / (halfWidth * 0.6), 0, 1);
      const bladeColor = mixColor(GOLD, GOLD_LIGHT, sheen * 0.55);
      color = mixColor(color, bladeColor, 0.45 + edge * 0.55);

      const pamor = Math.abs(x - (bladeX + Math.sin(y * 90) * 0.008));
      if (pamor < 0.0035 && t > 0.12) {
        color = mixColor(color, GOLD_DARK, 0.55);
      }

      if (t > 0.80) {
        const curve = Math.abs(y - (0.61 + Math.pow(Math.abs(x - bladeX), 1.2) * 1.4));
        if (curve < 0.004) color = mixColor(color, GOLD_LIGHT, 0.5);
      }
    }
  }

  if (y > 0.655 && y < 0.685) {
    const halfWidth = 0.075 - Math.abs(y - 0.67) * 0.9;
    if (Math.abs(x - cx) < halfWidth) {
      color = mixColor(color, GOLD_DARK, 0.95);
    }
  }

  if (y >= 0.68 && y <= 0.80) {
    const t = (y - 0.68) / 0.12;
    const hiltHalf = 0.033 + Math.sin(t * Math.PI) * 0.012;
    if (Math.abs(x - cx) < hiltHalf) {
      const sheen = clamp(1 - Math.abs(x - (cx - hiltHalf * 0.3)) / hiltHalf, 0, 1);
      color = mixColor(GOLD_DARK, GOLD, 0.4 + sheen * 0.6);
    }
  }

  if (y > 0.79 && y < 0.84) {
    const halfWidth = 0.058 - Math.abs(y - 0.815) * 1.4;
    if (halfWidth > 0 && Math.abs(x - cx) < halfWidth) {
      color = mixColor(color, GOLD, 0.9);
    }
  }

  if (Math.hypot(x - cx, y - 0.865) < 0.032) {
    color = mixColor(GOLD, GOLD_LIGHT, 0.25);
  }

  return color;
}

function renderMaster() {
  const size = SIZE * SUPERSAMPLE;
  const data = new Uint8ClampedArray(size * size * 4);
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const [r, g, b] = artworkColor(x / size, y / size);
      const offset = (y * size + x) * 4;
      data[offset] = r;
      data[offset + 1] = g;
      data[offset + 2] = b;
      data[offset + 3] = 255;
    }
  }
  return { data, size };
}

function downsample(master, target) {
  const ratio = master.size / target;
  const output = new Uint8ClampedArray(target * target * 4);
  for (let y = 0; y < target; y += 1) {
    for (let x = 0; x < target; x += 1) {
      let r = 0;
      let g = 0;
      let b = 0;
      let a = 0;
      let count = 0;
      const startX = Math.floor(x * ratio);
      const startY = Math.floor(y * ratio);
      const endX = Math.min(master.size, Math.floor((x + 1) * ratio));
      const endY = Math.min(master.size, Math.floor((y + 1) * ratio));
      for (let sy = startY; sy < endY; sy += 1) {
        for (let sx = startX; sx < endX; sx += 1) {
          const offset = (sy * master.size + sx) * 4;
          r += master.data[offset];
          g += master.data[offset + 1];
          b += master.data[offset + 2];
          a += master.data[offset + 3];
          count += 1;
        }
      }
      const offset = (y * target + x) * 4;
      output[offset] = Math.round(r / count);
      output[offset + 1] = Math.round(g / count);
      output[offset + 2] = Math.round(b / count);
      output[offset + 3] = Math.round(a / count);
    }
  }
  return output;
}

function makeMaskable(pixels, target) {
  const output = new Uint8ClampedArray(target * target * 4);
  const safeScale = 0.74;
  for (let y = 0; y < target; y += 1) {
    for (let x = 0; x < target; x += 1) {
      const offset = (y * target + x) * 4;
      const sourceX = (x - target / 2) / safeScale + target / 2;
      const sourceY = (y - target / 2) / safeScale + target / 2;
      if (sourceX >= 0 && sourceY >= 0 && sourceX < target && sourceY < target) {
        const sourceOffset =
          (Math.floor(sourceY) * target + Math.floor(sourceX)) * 4;
        output[offset] = pixels[sourceOffset];
        output[offset + 1] = pixels[sourceOffset + 1];
        output[offset + 2] = pixels[sourceOffset + 2];
        output[offset + 3] = 255;
      } else {
        const glow = clamp(1 - Math.hypot(x / target - 0.5, y / target - 0.5) / 0.7, 0, 1);
        const bg = mixColor([38, 23, 15], [93, 58, 37], glow * 0.9);
        output[offset] = bg[0];
        output[offset + 1] = bg[1];
        output[offset + 2] = bg[2];
        output[offset + 3] = 255;
      }
    }
  }
  return output;
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (let i = 0; i < buffer.length; i += 1) {
    crc ^= buffer[i];
    for (let j = 0; j < 8; j += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const name = Buffer.from(type, "ascii");
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const checksum = Buffer.alloc(4);
  checksum.writeUInt32BE(crc32(Buffer.concat([name, data])), 0);
  return Buffer.concat([length, name, data, checksum]);
}

function encodePng(pixels, target) {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(target, 0);
  header.writeUInt32BE(target, 4);
  header[8] = 8;
  header[9] = 6;
  header[10] = 0;
  header[11] = 0;
  header[12] = 0;

  const raw = Buffer.alloc((target * 4 + 1) * target);
  for (let y = 0; y < target; y += 1) {
    raw[y * (target * 4 + 1)] = 0;
    pixels
      .subarray(y * target * 4, (y + 1) * target * 4)
      .forEach((value, index) => {
        raw[y * (target * 4 + 1) + 1 + index] = value;
      });
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const master = renderMaster();
const variants = [
  { name: "icon-512.png", size: 512, maskable: false },
  { name: "icon-192.png", size: 192, maskable: false },
  { name: "apple-touch-icon.png", size: 180, maskable: false },
  { name: "favicon-32.png", size: 32, maskable: false },
  { name: "icon-maskable-512.png", size: 512, maskable: true },
];

for (const variant of variants) {
  const pixels = downsample(master, variant.size);
  const finalPixels = variant.maskable ? makeMaskable(pixels, variant.size) : pixels;
  writeFileSync(resolve(outputDir, variant.name), encodePng(finalPixels, variant.size));
  console.log(`Ikon dibuat: ${variant.name} (${variant.size}×${variant.size})`);
}
