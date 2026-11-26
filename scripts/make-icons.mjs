// Generates the app icons as PNGs with no dependencies. Flat design: a cream speech bubble
// with three dots on a clay background. Run with `npm run icons`.
import { deflateSync } from 'node:zlib';
import { writeFileSync } from 'node:fs';

const OUT = new URL('../public/icons/', import.meta.url);
const BG = [0xa3, 0x46, 0x1f];
const BUBBLE = [0xf6, 0xf2, 0xec];
const DOT = [0xa3, 0x46, 0x1f];
const SAMPLES = 4; // supersampling per axis for clean edges

// Kept inside the central 60% so it survives maskable cropping.
const CX = 0.5;
const CY = 0.47;
const RX = 0.25;
const RY = 0.19;
const DOTS = [0.41, 0.5, 0.59];
const DOT_R = 0.03;

/** Whether (u, v) is inside the triangle a, b, c. */
function inTriangle(u, v, [ax, ay], [bx, by], [cx, cy]) {
  const d1 = (u - bx) * (ay - by) - (ax - bx) * (v - by);
  const d2 = (u - cx) * (by - cy) - (bx - cx) * (v - cy);
  const d3 = (u - ax) * (cy - ay) - (cx - ax) * (v - ay);
  const neg = d1 < 0 || d2 < 0 || d3 < 0;
  const pos = d1 > 0 || d2 > 0 || d3 > 0;
  return !(neg && pos);
}

function colorAt(u, v) {
  if (DOTS.some((x) => Math.hypot(u - x, v - CY) <= DOT_R)) return DOT;
  const inBubble = ((u - CX) / RX) ** 2 + ((v - CY) / RY) ** 2 <= 1;
  const inTail = inTriangle(u, v, [0.36, 0.58], [0.47, 0.62], [0.33, 0.73]);
  return inBubble || inTail ? BUBBLE : BG;
}

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function png(size) {
  const stride = size * 3 + 1;
  const raw = Buffer.alloc(stride * size);
  for (let y = 0; y < size; y++) {
    raw[y * stride] = 0; // filter: none
    for (let x = 0; x < size; x++) {
      const sum = [0, 0, 0];
      for (let sy = 0; sy < SAMPLES; sy++) {
        for (let sx = 0; sx < SAMPLES; sx++) {
          const c = colorAt((x + (sx + 0.5) / SAMPLES) / size, (y + (sy + 0.5) / SAMPLES) / size);
          for (let ch = 0; ch < 3; ch++) sum[ch] += c[ch];
        }
      }
      const o = y * stride + 1 + x * 3;
      for (let ch = 0; ch < 3; ch++) raw[o + ch] = Math.round(sum[ch] / (SAMPLES * SAMPLES));
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type: RGB
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

for (const [name, size] of [
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
]) {
  writeFileSync(new URL(name, OUT), png(size));
  console.log(`wrote public/icons/${name}`);
}
