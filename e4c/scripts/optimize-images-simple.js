const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

let totalOriginalSize = 0;
let totalOptimizedSize = 0;
let processedCount = 0;

async function optimizeImage(inputPath, maxWidth = 1920, quality = 80) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    const dir = path.dirname(inputPath);
    const name = path.basename(inputPath, ext);
    const outputPath = path.join(dir, `${name}.webp`);

    // Skip if already WebP or if WebP already exists
    if (ext === '.webp') {
      return;
    }

    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  ${path.basename(outputPath)} already exists`);
      return;
    }

    const inputSize = fs.statSync(inputPath).size;
    totalOriginalSize += inputSize;

    await sharp(inputPath)
      .resize(maxWidth, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .webp({ quality })
      .toFile(outputPath);

    const outputSize = fs.statSync(outputPath).size;
    totalOptimizedSize += outputSize;
    processedCount++;

    const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);
    const newSizeKB = (outputSize / 1024).toFixed(0);

    console.log(`✅ ${path.basename(inputPath)} → ${newSizeKB}KB (${savings}% smaller)`);

  } catch (error) {
    console.error(`❌ ${path.basename(inputPath)}: ${error.message}`);
  }
}

async function optimizeFolder(folderPath, maxWidth = 1920) {
  const fullPath = path.join(__dirname, '..', folderPath);

  if (!fs.existsSync(fullPath)) {
    return;
  }

  console.log(`\n📁 ${folderPath}...`);
  const files = fs.readdirSync(fullPath);

  for (const file of files) {
    const filePath = path.join(fullPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) continue;

    const ext = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      await optimizeImage(filePath, maxWidth);
    }
  }
}

async function main() {
  console.log('🚀 Creating optimized WebP images...\n');

  await optimizeFolder('public/slides', 1920);
  await optimizeFolder('public/gallery', 1200);
  await optimizeFolder('public/about', 1200);
  await optimizeFolder('public/team', 800);
  await optimizeFolder('public/logo', 600);
  await optimizeFolder('public/partners', 400);

  if (processedCount > 0) {
    const totalSavings = ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1);
    const savedMB = ((totalOriginalSize - totalOptimizedSize) / 1024 / 1024).toFixed(2);

    console.log('\n' + '='.repeat(60));
    console.log(`✨ Created ${processedCount} optimized WebP images`);
    console.log(`💾 Saved ${savedMB}MB (${totalSavings}% reduction)`);
    console.log('='.repeat(60));
  } else {
    console.log('\n✅ All images already optimized!');
  }
}

main().catch(console.error);
