const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Track total savings
let totalOriginalSize = 0;
let totalOptimizedSize = 0;
let processedCount = 0;

async function optimizeImage(inputPath, maxWidth = 1920, quality = 80) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    const dir = path.dirname(inputPath);
    const name = path.basename(inputPath, ext);
    const outputPath = path.join(dir, `${name}.webp`);

    // Skip if already optimized
    if (ext === '.webp') {
      console.log(`⏭️  Skipping ${path.basename(inputPath)} (already WebP)`);
      return;
    }

    // Get original size
    const inputSize = fs.statSync(inputPath).size;
    totalOriginalSize += inputSize;

    // Optimize image
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
    const sizeMB = (inputSize / 1024 / 1024).toFixed(2);
    const newSizeMB = (outputSize / 1024 / 1024).toFixed(2);

    console.log(`✅ ${path.basename(inputPath)}`);
    console.log(`   ${sizeMB}MB → ${newSizeMB}MB (saved ${savings}%)`);

    // Delete original file
    fs.unlinkSync(inputPath);
    console.log(`   🗑️  Deleted original ${ext} file`);

  } catch (error) {
    console.error(`❌ Failed to optimize ${path.basename(inputPath)}:`, error.message);
  }
}

async function optimizeFolder(folderPath, maxWidth = 1920) {
  const fullPath = path.join(__dirname, '..', folderPath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⏭️  Skipping ${folderPath} (folder doesn't exist)`);
    return;
  }

  console.log(`\n📁 Processing ${folderPath}...`);
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
  console.log('🚀 Starting image optimization...\n');
  console.log('This will convert all JPG/PNG images to optimized WebP format.\n');

  const startTime = Date.now();

  // Optimize each folder with appropriate max width
  await optimizeFolder('public/slides', 1920);
  await optimizeFolder('public/gallery', 1200);
  await optimizeFolder('public/about', 1200);
  await optimizeFolder('public/team', 800);
  await optimizeFolder('public/logo', 600);
  await optimizeFolder('public/partners', 400);
  await optimizeFolder('public/projects', 1200);

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  const totalSavings = ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1);
  const originalMB = (totalOriginalSize / 1024 / 1024).toFixed(2);
  const optimizedMB = (totalOptimizedSize / 1024 / 1024).toFixed(2);

  console.log('\n' + '='.repeat(60));
  console.log('✨ OPTIMIZATION COMPLETE!');
  console.log('='.repeat(60));
  console.log(`📊 Processed: ${processedCount} images`);
  console.log(`📦 Original size: ${originalMB}MB`);
  console.log(`📦 Optimized size: ${optimizedMB}MB`);
  console.log(`💾 Total savings: ${totalSavings}% (${(totalOriginalSize - totalOptimizedSize) / 1024 / 1024} MB)`);
  console.log(`⏱️  Time taken: ${duration} seconds`);
  console.log('='.repeat(60));

  console.log('\n⚠️  NEXT STEPS:');
  console.log('1. Update image references in code (.jpg → .webp)');
  console.log('2. Test your website locally');
  console.log('3. Commit the changes');
  console.log('\nOr run: node scripts/update-image-references.js (to auto-update)');
}

main().catch(console.error);
