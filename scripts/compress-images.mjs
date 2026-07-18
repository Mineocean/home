import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const imagesDir = path.join(root, 'public/images');
const placeholdersPath = path.join(root, 'src/assets/placeholders.json');

async function convertWallpaper(jpgPath) {
  const webpPath = jpgPath.replace(/\.jpg$/, '.webp');

  if (fs.existsSync(webpPath)) {
    const jpgStat = fs.statSync(jpgPath);
    const webpStat = fs.statSync(webpPath);
    if (webpStat.mtimeMs >= jpgStat.mtimeMs) {
      return; // WebP is newer, skip
    }
  }

  await sharp(jpgPath)
    .webp({ quality: 35 })
    .toFile(webpPath);

  const jpgSize = (fs.statSync(jpgPath).size / 1024).toFixed(0);
  const webpSize = (fs.statSync(webpPath).size / 1024).toFixed(0);
  console.log(`  ${path.basename(jpgPath)}: ${jpgSize}KB → ${webpSize}KB WebP`);
}

async function generatePlaceholder(jpgPath) {
  const buffer = await sharp(jpgPath)
    .resize(24)
    .jpeg({ quality: 40 })
    .toBuffer();

  return `data:image/jpeg;base64,${buffer.toString('base64')}`;
}

async function optimizeIcon(pngPath) {
  const original = fs.readFileSync(pngPath);
  const compressed = await sharp(pngPath)
    .png({ quality: 80, compressionLevel: 9 })
    .toBuffer();

  if (compressed.length < original.length) {
    fs.writeFileSync(pngPath, compressed);
    const saved = ((1 - compressed.length / original.length) * 100).toFixed(0);
    console.log(`  ${path.basename(pngPath)}: ${(original.length/1024).toFixed(0)}KB → ${(compressed.length/1024).toFixed(0)}KB (-${saved}%)`);
  }
}

async function main() {
  console.log('🖼  Image Compression\n');

  // 1. Wallpapers: JPG → WebP
  console.log('Wallpapers (JPG → WebP):');
  const wallpapers = fs.readdirSync(imagesDir)
    .filter(f => /^background\d+\.jpg$/.test(f))
    .sort();

  for (const file of wallpapers) {
    await convertWallpaper(path.join(imagesDir, file));
  }

  // 2. Generate placeholders.json
  console.log('\nPlaceholders:');
  const placeholders = {};
  for (const file of wallpapers) {
    const num = file.match(/\d+/)[0];
    placeholders[num] = await generatePlaceholder(path.join(imagesDir, file));
    console.log(`  background${num}: placeholder generated`);
  }
  fs.writeFileSync(placeholdersPath, JSON.stringify(placeholders, null, 2) + '\n');
  console.log(`  → ${placeholdersPath}`);

  // 3. Optimize PNG icons
  console.log('\nIcons (PNG optimize):');
  const iconsDir = path.join(imagesDir, 'icon');
  const icons = fs.readdirSync(iconsDir).filter(f => f.endsWith('.png'));
  for (const file of icons) {
    await optimizeIcon(path.join(iconsDir, file));
  }

  console.log('\n✅ Done');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
