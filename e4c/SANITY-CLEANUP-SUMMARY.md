# Sanity CMS Cleanup & Updates Summary

## ✅ Tasks Completed

### 1. **Resources Page** - Already Using Sanity ✅
The resources page was already configured to fetch data from Sanity CMS using the `fetchResources()` function. No changes needed for the resources data itself.

**Location:** `src/app/resources/page.tsx`

---

### 2. **About Page Approaches** - Confirmed Static ✅
The "Our Approaches" section in the about page is already using static data (hardcoded). No Sanity integration was present or needed.

**Location:** `src/app/about/page.tsx` (lines 225-246)

**Static Approaches:**
- Training and Mentorship
- Structured Dialogues
- Domestic Resource Mobilization
- Strengthening Women-Led CSOs

---

### 3. **Fixed: Strengthening Women-Led CSOs Image** ✅

**Problem:** Image path was incorrect (`/about/women.png`)
**Solution:** Updated to correct path (`/about/women.jpg`)

**File Updated:** `src/app/about/page.tsx:244`

```diff
- image: '/about/women.png',
+ image: '/about/women.jpg',
```

---

### 4. **Removed Unused Sanity Schemas** ✅

Removed the following schemas that are no longer needed:

#### Deleted Schema Files:
1. ✅ `sanity/schemas/heroSlide.ts` - Hero slides (now static in homepage)
2. ✅ `sanity/schemas/teamMember.ts` - Team members (now static in homepage and about page)
3. ✅ `sanity/schemas/approach.ts` - Approaches (now static in about page)
4. ✅ `sanity/schemas/pageBanner.ts` - Page banners (now static in resources and gallery pages)

#### Updated Schema Index:
**File:** `sanity/schemas/index.ts`

```typescript
// BEFORE
export const schemaTypes = [
  project,
  event,
  resource,
  gallery,
  job,
  heroSlide,      // ❌ Removed
  teamMember,     // ❌ Removed
  pageBanner,     // ❌ Removed
  approach,       // ❌ Removed
]

// AFTER
export const schemaTypes = [
  project,
  event,
  resource,
  gallery,
  job,
]
```

---

### 5. **Removed Unused Queries** ✅

**File:** `lib/queries.ts`

Removed the following GROQ queries:
- ✅ `getTeamMembers` - Team members query
- ✅ `getPageBannerByPage` - Page banner by page query
- ✅ `getAllPageBanners` - All page banners query
- ✅ `getApproaches` - Approaches query

---

### 6. **Removed Unused API Functions** ✅

**File:** `lib/api.ts`

Removed the following API functions and their imports:
- ✅ `fetchPageBanner()`
- ✅ `fetchAllPageBanners()`
- ✅ `fetchApproaches()`

**Updated Imports:**
```typescript
// BEFORE
import {
  getProjects,
  getEvents,
  getFeaturedEvents,
  getEventBySlug,
  getResources,
  getFeaturedResources,
  getGalleryImages,
  getFeaturedGalleryImages,
  getJobs,
  getJobBySlug,
  getPageBannerByPage,     // ❌ Removed
  getAllPageBanners,       // ❌ Removed
  getApproaches,           // ❌ Removed
} from './queries'

// AFTER
import {
  getProjects,
  getEvents,
  getFeaturedEvents,
  getEventBySlug,
  getResources,
  getFeaturedResources,
  getGalleryImages,
  getFeaturedGalleryImages,
  getJobs,
  getJobBySlug,
} from './queries'
```

---

### 7. **Updated Resources Page** ✅

**File:** `src/app/resources/page.tsx`

**Changes:**
- ✅ Removed `fetchPageBanner` import and usage
- ✅ Made HeaderBanner component static (no longer accepts banner prop)
- ✅ Uses static banner image and text

```typescript
// BEFORE
import { fetchResources, fetchPageBanner } from '@/lib/api';

const HeaderBanner = ({ banner }: { banner: any }) => {
  const bannerImage = banner?.backgroundImage
    ? urlForImage(banner.backgroundImage).url()
    : '/gallery/gallery-1.jpg';
  // ...
};

export default async function Resources() {
  [resources, banner] = await Promise.all([
    fetchResources(),
    fetchPageBanner('resources')  // ❌ Removed
  ]);
  return <HeaderBanner banner={banner} />;  // ❌ Removed prop
}

// AFTER
import { fetchResources } from '@/lib/api';

const HeaderBanner = () => {
  const bannerImage = '/gallery/gallery-1.jpg';
  const heading = 'Resources';
  const subheading = 'Knowledge, insights, and tools to empower women and girls';
  // ...
};

export default async function Resources() {
  resources = await fetchResources();
  return <HeaderBanner />;
}
```

---

### 8. **Updated Gallery Page** ✅

**File:** `src/app/gallery/page.tsx`

**Changes:**
- ✅ Removed `fetchPageBanner` import and usage
- ✅ Made HeaderBanner component static (no longer accepts banner prop)
- ✅ Uses static banner image and text

```typescript
// BEFORE
import { fetchGalleryImages, fetchPageBanner } from '@/lib/api';

const HeaderBanner = ({ banner }: { banner: any }) => {
  // Dynamic banner from Sanity
};

export default async function Gallery() {
  [galleryImages, banner] = await Promise.all([
    fetchGalleryImages(),
    fetchPageBanner('gallery')  // ❌ Removed
  ]);
  return <HeaderBanner banner={banner} />;  // ❌ Removed prop
}

// AFTER
import { fetchGalleryImages } from '@/lib/api';

const HeaderBanner = () => {
  const bannerImage = '/gallery/gallery-1.jpg';
  const heading = 'Our Gallery';
  const subheading = 'Moments of impact, empowerment, and positive change in our communities';
  // ...
};

export default async function Gallery() {
  galleryImages = await fetchGalleryImages();
  return <HeaderBanner />;
}
```

---

## 📊 Summary of Active Sanity Schemas

After cleanup, your Sanity CMS now only manages:

1. ✅ **Projects** - Project listings and details
2. ✅ **Events** - Event listings and details
3. ✅ **Resources** - Articles, downloads, and educational content
4. ✅ **Gallery** - Photo gallery images
5. ✅ **Jobs** - Job/volunteer opportunity listings

---

## 🗑️ What Was Removed from Sanity

The following are now **static** (hardcoded in components):

1. ❌ **Hero Slides** - Homepage slideshow (static in `src/app/page.tsx`)
2. ❌ **Team Members** - Board and staff (static in `src/app/page.tsx` and `src/app/about/page.tsx`)
3. ❌ **Approaches** - Our technical approaches (static in `src/app/about/page.tsx`)
4. ❌ **Page Banners** - Resources and gallery page banners (static in respective pages)

---

## 🎯 Benefits of This Cleanup

1. **Simpler Sanity Studio** - Less clutter, easier to manage
2. **Faster Page Loads** - Fewer API calls to Sanity
3. **Static Content Where It Makes Sense** - Team members and approaches rarely change
4. **Cleaner Codebase** - Removed unused queries and functions
5. **Consistent Architecture** - Clear separation between dynamic (Sanity) and static content

---

## 📝 Files Modified

### Sanity Schemas
- ✅ `sanity/schemas/index.ts` - Removed 4 schema imports
- ✅ Deleted: `heroSlide.ts`, `teamMember.ts`, `approach.ts`, `pageBanner.ts`

### API/Queries
- ✅ `lib/queries.ts` - Removed 4 unused queries
- ✅ `lib/api.ts` - Removed 3 unused functions

### Pages
- ✅ `src/app/about/page.tsx` - Fixed image path
- ✅ `src/app/resources/page.tsx` - Made banner static
- ✅ `src/app/gallery/page.tsx` - Made banner static

---

## ✨ All Changes Complete!

Your E4C website is now:
- ✅ Using Sanity for dynamic content (resources, events, projects, gallery, jobs)
- ✅ Using static data for rarely-changing content (team, approaches, banners)
- ✅ Free of unused schemas and queries
- ✅ All images displaying correctly

The "Strengthening Women-Led CSOs" image is now showing properly with the correct path.
