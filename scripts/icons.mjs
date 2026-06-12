// Generates GOAT Mode app icons: goat on ink-navy, gold accent ring.
import sharp from "sharp";
import { mkdirSync, existsSync } from "node:fs";

const GOAT = "tmp-goat.png"; // downloaded Noto emoji goat (512px)
mkdirSync("public/icons", { recursive: true });

const SIZE = 1024;

async function base() {
  const ring = Buffer.from(
    `<svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
       <rect width="${SIZE}" height="${SIZE}" fill="#020e1b"/>
       <circle cx="512" cy="512" r="400" fill="none" stroke="#ffcf00" stroke-width="22"/>
       <circle cx="512" cy="512" r="356" fill="none" stroke="#00cccc" stroke-width="6" opacity="0.55"/>
     </svg>`
  );
  const goat = await sharp(GOAT).resize(560, 560).toBuffer();
  return sharp(ring)
    .composite([{ input: goat, left: (SIZE - 560) / 2, top: (SIZE - 560) / 2 }])
    .png()
    .toBuffer();
}

const master = await base();
await sharp(master).resize(512, 512).toFile("public/icons/icon-512.png");
await sharp(master).resize(192, 192).toFile("public/icons/icon-192.png");
await sharp(master).resize(180, 180).toFile("public/icons/apple-touch-icon.png");
await sharp(master).resize(512, 512).toFile("app/icon.png");
console.log("icons done", existsSync("public/icons/icon-512.png"));
