import sharp from "sharp";
import fs from "fs";
import path from "path";

const IMAGES_DIR = path.resolve("public/images");
const PLACEHOLDERS_OUT = path.resolve("src/assets/placeholders.json");
const WEBP_QUALITY = 35;
const PLACEHOLDER_WIDTH = 24;

const placeholders = {};

for (let i = 1; i <= 10; i++) {
  const src = path.join(IMAGES_DIR, `background${i}.jpg`);
  if (!fs.existsSync(src)) continue;

  const webpOut = path.join(IMAGES_DIR, `background${i}.webp`);
  const placeholderBuf = await sharp(src).resize(PLACEHOLDER_WIDTH).webp({ quality: WEBP_QUALITY }).toBuffer();

  placeholders[`background${i}`] = `data:image/webp;base64,${placeholderBuf.toString("base64")}`;

  await sharp(src).webp({ quality: WEBP_QUALITY }).toFile(webpOut);

  const origSize = fs.statSync(src).size;
  const webpSize = fs.statSync(webpOut).size;
  console.log(`background${i}: ${(origSize / 1024).toFixed(1)}KB → ${(webpSize / 1024).toFixed(1)}KB (${((1 - webpSize / origSize) * 100).toFixed(0)}% saved)`);
}

fs.writeFileSync(PLACEHOLDERS_OUT, JSON.stringify(placeholders, null, 2));
console.log(`\nplaceholders.json saved (${(JSON.stringify(placeholders).length / 1024).toFixed(1)}KB)`);
