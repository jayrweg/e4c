const fs = require('fs');
const path = require('path');

const replacements = [
  // Slides
  { old: '/slides/slide-1.jpg', new: '/slides/slide-1.webp' },
  { old: '/slides/slide-2.jpg', new: '/slides/slide-2.webp' },
  { old: '/slides/slide-3.jpg', new: '/slides/slide-3.webp' },
  { old: '/slides/slide11.jpg', new: '/slides/slide11.webp' },
  { old: '/slides/slide22.jpg', new: '/slides/slide22.webp' },
  { old: '/slides/slide33.jpg', new: '/slides/slide33.webp' },

  // Gallery
  { old: '/gallery/gallery-1.jpg', new: '/gallery/gallery-1.webp' },
  { old: '/gallery/gallery-2.jpg', new: '/gallery/gallery-2.webp' },
  { old: '/gallery/gallery-3.jpg', new: '/gallery/gallery-3.webp' },
  { old: '/gallery/gallery-4.jpg', new: '/gallery/gallery-4.webp' },
  { old: '/gallery/gallery-5.jpg', new: '/gallery/gallery-5.webp' },
  { old: '/gallery/gallery-6.jpg', new: '/gallery/gallery-6.webp' },

  // About
  { old: '/about/about-preview.jpg', new: '/about/about-preview.webp' },
  { old: '/about/dialogue.png', new: '/about/dialogue.webp' },
  { old: '/about/domestic.png', new: '/about/domestic.webp' },
  { old: '/about/slide-2.jpg', new: '/about/slide-2.webp' },
  { old: '/about/training.jpg', new: '/about/training.webp' },
  { old: '/about/women.jpg', new: '/about/women.webp' },
  { old: '/about/x.png', new: '/about/x.webp' },

  // Team
  { old: '/team/Agusta Kinunda1.jpg', new: '/team/Agusta Kinunda1.webp' },
  { old: '/team/alice-henry-mbowe.jpg', new: '/team/alice-henry-mbowe.webp' },
  { old: '/team/angeline.jpg', new: '/team/angeline.webp' },
  { old: '/team/judith-justine-kweka.jpg', new: '/team/judith-justine-kweka.webp' },
  { old: '/team/Lightness-Limbe.jpg', new: '/team/Lightness-Limbe.webp' },
  { old: '/team/mwiru-siima.jpg', new: '/team/mwiru-siima.webp' },
  { old: '/team/Rita mbeba.jpg', new: '/team/Rita mbeba.webp' },
  { old: '/team/Rita.jpg', new: '/team/Rita.webp' },

  // Logo
  { old: '/logo/logo.png', new: '/logo/logo.webp' },

  // Partners
  { old: '/partners/partner-1.png', new: '/partners/partner-1.webp' },
  { old: '/partners/partner-2.png', new: '/partners/partner-2.webp' },
];

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;
  let count = 0;

  replacements.forEach(({ old, new: newPath }) => {
    if (content.includes(old)) {
      content = content.replaceAll(old, newPath);
      updated = true;
      count++;
    }
  });

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${path.relative(process.cwd(), filePath)} (${count} refs)`);
    return count;
  }

  return 0;
}

function findAndUpdateFiles(dir, extensions = ['.tsx', '.ts', '.jsx', '.js']) {
  let totalUpdates = 0;
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (file === 'node_modules' || file === '.next' || file === '.git') {
        return;
      }
      totalUpdates += findAndUpdateFiles(filePath, extensions);
    } else {
      const ext = path.extname(file);
      if (extensions.includes(ext)) {
        totalUpdates += updateFile(filePath);
      }
    }
  });

  return totalUpdates;
}

console.log('🔄 Updating image references to WebP...\n');

const srcDir = path.join(__dirname, '..', 'src');
const totalUpdates = findAndUpdateFiles(srcDir);

console.log('\n' + '='.repeat(60));
console.log(`✨ Updated ${totalUpdates} image references!`);
console.log('='.repeat(60));
