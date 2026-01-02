# Image Optimization Guide for E4C Website

## Critical Issue: Large Image Sizes

Your website has **very large images** (many over 1MB) which are the main cause of slow loading:

```
Current sizes:
- slide11.jpg: 685KB
- slide22.jpg: 1.3MB  ⚠️
- slide33.jpg: 982KB
- gallery-2.jpg: 1.2MB  ⚠️
- gallery-4.jpg: 1.3MB  ⚠️
- Lightness-Limbe.jpg: 1022KB
- Rita: 1.3MB  ⚠️
- logo.png: 583KB
```

**Target sizes**: Images should be **under 200KB** each, preferably under 100KB.

## Quick Fix: Use Online Tools

### Option 1: TinyPNG (Easiest)
1. Go to https://tinypng.com
2. Upload your images (up to 20 at once)
3. Download compressed versions
4. Replace files in `e4c/public/` folders

**Expected savings**: 60-80% reduction

### Option 2: Squoosh (Best Quality)
1. Go to https://squoosh.app
2. Upload one image
3. Settings:
   - **Format**: WebP
   - **Quality**: 75-80%
   - **Resize**: Max width 1920px for slides, 800px for others
4. Download and replace

### Option 3: Bulk Optimization Script

Install sharp (image processor):
```bash
cd e4c
npm install --save-dev sharp
```

Create `scripts/optimize-images.js`:
```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImage(inputPath, outputPath, maxWidth = 1920) {
  try {
    await sharp(inputPath)
      .resize(maxWidth, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: 80 })
      .toFile(outputPath);

    const inputSize = fs.statSync(inputPath).size;
    const outputSize = fs.statSync(outputPath).size;
    const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);

    console.log(`✓ ${path.basename(inputPath)} → ${(outputSize / 1024).toFixed(0)}KB (saved ${savings}%)`);
  } catch (error) {
    console.error(`✗ Failed to optimize ${inputPath}:`, error.message);
  }
}

async function optimizeFolder(folderPath, maxWidth = 1920) {
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const ext = path.extname(file).toLowerCase();

    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const outputPath = filePath.replace(ext, '.webp');
      await optimizeImage(filePath, outputPath, maxWidth);
    }
  }
}

// Optimize all image folders
(async () => {
  console.log('Starting image optimization...\n');

  await optimizeFolder('./public/slides', 1920);
  await optimizeFolder('./public/gallery', 1200);
  await optimizeFolder('./public/about', 1200);
  await optimizeFolder('./public/team', 800);
  await optimizeFolder('./public/logo', 600);

  console.log('\n✓ All images optimized!');
  console.log('\nNext steps:');
  console.log('1. Delete old .jpg/.png files');
  console.log('2. Update image references in code to use .webp');
})();
```

Run it:
```bash
node scripts/optimize-images.js
```

## Priority: Optimize These First

1. **Slides** (shown on homepage immediately):
   - slide11.jpg, slide22.jpg, slide33.jpg
   - Target: Under 150KB each

2. **Gallery images** (lazy loaded but still heavy):
   - All gallery-*.jpg files
   - Target: Under 200KB each

3. **Team photos**:
   - Target: Under 100KB each

4. **Logo**:
   - logo.png (583KB is way too large for a logo)
   - Target: Under 50KB

## After Optimization

Update image extensions in your code if you converted to WebP:

```tsx
// Before
<Image src="/slides/slide11.jpg" />

// After
<Image src="/slides/slide11.webp" />
```

## Expected Performance Gains

- **Homepage load time**: 5-10 seconds → 1-2 seconds
- **Total page size**: ~10MB → ~2MB
- **Time to Interactive**: Much faster
- **Mobile performance**: Dramatically improved

## Deployment Performance Tips

1. **Enable compression** on your hosting (Gzip/Brotli)
2. **Use CDN** if available (Vercel, Netlify have built-in CDNs)
3. **Enable caching** headers for static assets
4. **Use HTTP/2** (most modern hosts support this)

## Next.js Image Optimization

Next.js automatically:
- ✅ Serves images in WebP/AVIF format
- ✅ Lazy loads images below the fold
- ✅ Prevents Cumulative Layout Shift
- ✅ Generates responsive sizes

But it **still needs small source images** to work well!

## Verify Optimizations

After optimizing, test your site:

1. **Lighthouse** (built into Chrome DevTools):
   - Open Chrome → DevTools → Lighthouse tab
   - Run test → Look for "Performance" score
   - Target: 90+ score

2. **Network Tab**:
   - DevTools → Network → Reload page
   - Total transferred should be under 3MB

3. **Real-world test**:
   - Test on slow 3G connection
   - Use Chrome's Network Throttling

## Need Help?

If image optimization seems complex:
1. Use TinyPNG (easiest, no coding needed)
2. Or send images to a designer for optimization
3. Or deploy to Vercel (has automatic image optimization)
