# Image Structure and Naming Convention

This document outlines the standardized image structure for the Empower for Change website to make it easy to replace images.

## Directory Structure

```
public/
├── about/
│   └── about-preview.jpeg          # About page hero image
├── gallery/
│   ├── gallery-1.jpg               # Gallery image 1
│   ├── gallery-2.jpg               # Gallery image 2
│   ├── gallery-3.jpg               # Gallery image 3
│   ├── gallery-4.jpg               # Gallery image 4
│   ├── gallery-5.jpg               # Gallery image 5
│   └── gallery-6.jpg               # Gallery image 6
├── projects/
│   ├── project-education.jpg       # Education project image
│   ├── project-inclusion.jpg       # Disability inclusion project image
│   └── project-advocacy.jpg        # Advocacy project image
├── slides/
│   ├── slide-1.jpg                 # Homepage hero slide 1
│   ├── slide-2.jpg                 # Homepage hero slide 2
│   └── slide-3.jpg                 # Homepage hero slide 3
└── team/
    ├── alice-henry-mbowe.jpg       # Alice Henry Mbowe team member
    ├── judith-justine-kweka.jpg    # Judith Justine Kweka team member
    └── Mwiru Siima.jpg             # Mwiru Siima team member (note: spaces in filename)
```

## Image Usage by Page

### Homepage (src/app/page.tsx)
- **Hero Slideshow**: `/slides/slide-1.jpg`, `/slides/slide-2.jpg`, `/slides/slide-3.jpg`
- **About Preview**: `/about/about-preview.jpeg`
- **Projects Preview**: `/projects/project-education.jpg`, `/projects/project-inclusion.jpg`, `/projects/project-advocacy.jpg`
- **Team Section**: `/team/judith-justine-kweka.jpg`, `/team/alice-henry-mbowe.jpg`, `/team/Mwiru Siima.jpg`
- **Gallery Preview**: `/gallery/gallery-1.jpg` through `/gallery/gallery-6.jpg`

### About Page (src/app/about/page.tsx)
- **Header Banner**: `/about/about-preview.jpeg`
- **Organization Story**: `/about/about-preview.jpeg`
- **Our Approach**: `/projects/project-education.jpg`, `/projects/project-inclusion.jpg`, `/projects/project-advocacy.jpg`, `/projects/project-education.jpg`
- **Team Section**: `/team/judith-justine-kweka.jpg`, `/team/alice-henry-mbowe.jpg`, `/team/Mwiru Siima.jpg`, `/team/judith-justine-kweka.jpg`

### Projects Page (src/app/projects/page.tsx)
- **Header Banner**: `/projects/project-education.jpg`
- **Project Cards**: Various project images from `/projects/` directory

### Gallery Page (src/app/gallery/page.tsx)
- **Header Banner**: `/gallery/gallery-1.jpg`
- **Gallery Images**: `/gallery/gallery-1.jpg` through `/gallery/gallery-6.jpg` (reused for variety)

### Contact Page (src/app/contact/page.tsx)
- **Header Banner**: `/projects/project-education.jpg`

### Donate Page (src/app/donate/page.tsx)
- **Header Banner**: `/gallery/gallery-2.jpg`

### Volunteer Page (src/app/volunteer/page.tsx)
- **Header Banner**: `/projects/project-education.jpg`

### Services Page (src/app/services/page.tsx)
- **Header Banner**: `/projects/project-inclusion.jpg`

## How to Replace Images

1. **Replace the image file** in the appropriate directory with the same filename
2. **Keep the same filename** - do not change the file names as they are referenced in the code
3. **Maintain aspect ratios** - images are optimized for specific uses:
   - Hero images: 16:9 aspect ratio recommended
   - Team photos: Square aspect ratio (1:1) recommended
   - Gallery images: Various aspect ratios supported
   - Project images: 4:3 or 16:9 aspect ratio recommended

## Image Specifications

- **Format**: JPG or JPEG recommended for photos
- **Quality**: High quality (80-90% compression)
- **File Size**: Optimize for web (under 500KB per image when possible)
- **Dimensions**: 
  - Hero images: 1920x1080px or similar
  - Team photos: 400x400px or similar
  - Gallery images: 800x600px or similar
  - Project images: 800x600px or similar

## Troubleshooting

If images don't appear after replacement:
1. Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
2. Check that the filename matches exactly (case-sensitive)
3. Ensure the image file is in the correct directory
4. Restart the development server (`npm run dev`)

## Notes

- The team member "Mwiru Siima" uses a filename with spaces: `Mwiru Siima.jpg`
- All other filenames use hyphens instead of spaces
- Gallery images are reused across different gallery entries for variety
- Project images are shared between different project cards
