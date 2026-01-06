# Sanity CMS vs Static Images Analysis

## Summary

Your E4C website uses a **hybrid approach** combining Sanity CMS for dynamic content and static images from the `/public` folder for core website assets.

---

## Pages Using Sanity CMS

These pages import and use Sanity client to fetch dynamic content:

1. **Homepage** (`src/app/page.tsx`)
   - Imports: `client` and `urlForImage` from Sanity
   - **Currently configured to use static data** in the code
   - Has commented-out Sanity queries that can be re-enabled

2. **Resources Page** (`src/app/resources/page.tsx`)
   - Uses Sanity to fetch articles and resources

3. **Resource Detail Pages** (`src/app/resources/[slug]/page.tsx`)
   - Individual article/resource content from Sanity

4. **Gallery Page** (`src/app/gallery/page.tsx`)
   - Fetches gallery images from Sanity

5. **Events Detail Pages** (`src/app/events/[slug]/page.tsx`)
   - Individual event details from Sanity

6. **Projects Detail Pages** (`src/app/projects/[slug]/page.tsx`)
   - Individual project details from Sanity

7. **Volunteer Detail Pages** (`src/app/volunteer/[slug]/page.tsx`)
   - Individual volunteer opportunity details from Sanity

8. **Studio Page** (`src/app/studio/[[...index]]/page.tsx`)
   - Sanity admin interface for content management

9. **PortableText Component** (`src/components/PortableText.tsx`)
   - Renders rich text content from Sanity

---

## Pages Using Static Images

These pages use images directly from the `/public` folder:

1. **Homepage** (`src/app/page.tsx`)
   - `/about/slide-2.jpg` - About section image
   - `/gallery/gallery-1.jpg` through `/gallery/gallery-6.jpg` - Gallery preview
   - `/slides/slide11.jpg`, `/slides/slide22.jpg`, `/slides/slide33.jpg` - Hero slideshow
   - `/team/*.jpg` - Team member photos (hardcoded)

2. **About Page** (`src/app/about/page.tsx`)
   - Static team and organization images

3. **Contact Page** (`src/app/contact/page.tsx`)
   - Contact-related images

4. **Services Page** (`src/app/services/page.tsx`)
   - Service-related images

5. **Volunteer Page** (`src/app/volunteer/page.tsx`)
   - Volunteer-related images

6. **Projects Client** (`src/app/projects/ProjectsClient.tsx`)
   - Project listing images

---

## Static Data Currently in Code

The homepage (`src/app/page.tsx`) contains hardcoded static data for:

### Hero Slides (lines 767-786)
```javascript
{
  id: '1',
  title: 'Women empowerment 1',
  message: 'Empowered women make informed decisions...',
  image: '/slides/slide11.jpg',
}
// + 2 more slides
```

### Gallery Images (lines 750-757)
```javascript
{ id: '1', title: 'Community Event', image: '/gallery/gallery-1.jpg', ... }
// + 5 more images
```

### Team Members (lines 791-848)
Complete team roster with photos from `/team/` folder:
- Judith Justine Kweka (Board Chairperson)
- Alice Henry Mbowe (Board Member)
- Mwiru Siima (Board Member)
- Agusta Kinunda (Board Member)
- Rita Mbeba (Board Member)
- Lightness Charles Limbe (Program Manager)
- Angeline Bathsheba Kwame (Project Manager)

---

## Recommendations

### Current Setup (Hybrid)
✅ **Keep using static images for:**
- Core branding assets (hero slides, team photos)
- Images that rarely change
- Better performance (no API calls)

✅ **Keep using Sanity CMS for:**
- Blog posts and articles
- News updates
- Events
- Projects
- Resources
- Gallery updates
- Content that changes frequently

### Migration Options

If you want to move **everything** to Sanity:
1. Upload all static images to Sanity
2. Update homepage to fetch from Sanity instead of hardcoded arrays
3. Create Sanity schemas for: Hero Slides, Team Members, Gallery

If you want to move **everything** to static:
1. Remove Sanity dependency
2. Create JSON files for dynamic content
3. Load content from `/public/data/*.json`

**Current hybrid approach is recommended** - it provides the best balance of performance and flexibility.

---

## File Structure

```
/public
├── /about
│   └── slide-2.jpg
├── /gallery
│   ├── gallery-1.jpg
│   ├── gallery-2.jpg
│   ├── gallery-3.jpg
│   ├── gallery-4.jpg
│   ├── gallery-5.jpg
│   └── gallery-6.jpg
├── /slides
│   ├── slide11.jpg
│   ├── slide22.jpg
│   └── slide33.jpg
└── /team
    ├── judith-justine-kweka.jpg
    ├── alice-henry-mbowe.jpg
    ├── mwiru-siima.jpg
    ├── Agusta Kinunda1.jpg
    ├── Rita mbeba.jpg
    ├── Lightness-Limbe.jpg
    └── angeline.jpg
```

---

## Sanity Configuration

**Project ID:** `xw1lpmj9`
**Dataset:** `production`
**API Token:** Configured in `.env.local`

All Sanity content can be managed at: `https://yourdomain.com/studio`
