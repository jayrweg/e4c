# Logo and Partners Setup Guide

## 📁 Directory Structure

```
public/
├── logo/
│   └── logo.png                    # Main organization logo
└── partners/
    ├── partner-1.png              # Partner logo 1
    ├── partner-2.png              # Partner logo 2
    └── partner-3.png              # Partner logo 3 (add as needed)
```

## 🎯 Where Logos Are Used

### 1. **Main Logo (Navbar)**
- **Location**: Top-left corner of the website
- **File**: `/public/logo/logo.png`
- **Size**: 48x48px (displays as 12x12 in Tailwind)
- **Format**: PNG, JPG, or SVG
- **Background**: Transparent or white

### 2. **Partner Logos (Homepage)**
- **Location**: Partners section on homepage
- **Files**: `/public/partners/partner-1.png`, `partner-2.png`, etc.
- **Size**: 200x100px (displays as 96x64px)
- **Format**: PNG or JPG
- **Background**: White (recommended for consistency)

## 🖼️ Logo Specifications

### Main Logo Requirements:
- **Dimensions**: 200x200px (square format)
- **Format**: PNG with transparent background (preferred)
- **File Size**: Under 100KB
- **Style**: Should work well on both light and dark backgrounds

### Partner Logo Requirements:
- **Dimensions**: 200x100px (rectangular format)
- **Format**: PNG or JPG
- **Background**: White or transparent
- **File Size**: Under 50KB each
- **Style**: Clean, professional, readable at small sizes

## 🔧 How to Add Your Logos

### Step 1: Prepare Your Images
1. **Main Logo**: Resize to 200x200px, save as PNG
2. **Partner Logos**: Resize to 200x100px, save as PNG/JPG

### Step 2: Replace Placeholder Files
1. Replace `/public/logo/logo.png` with your main logo
2. Replace `/public/partners/partner-1.png` with first partner logo
3. Replace `/public/partners/partner-2.png` with second partner logo
4. Add more partner logos as needed (partner-3.png, etc.)

### Step 3: Update Partner List (if needed)
If you have more than 2 partners, edit `/src/components/Partners.tsx`:

```javascript
const partners = [
  {
    id: 1,
    name: 'Partner 1',
    logo: '/partners/partner-1.png',
    website: '#',
  },
  {
    id: 2,
    name: 'Partner 2',
    logo: '/partners/partner-2.png',
    website: '#',
  },
  {
    id: 3,
    name: 'Partner 3',
    logo: '/partners/partner-3.png',
    website: '#',
  },
  // Add more partners here
];
```

## 🎨 Logo Design Tips

### Main Logo:
- Keep it simple and recognizable at small sizes
- Use your brand colors (orange theme)
- Ensure it works on both light and dark backgrounds
- Consider including "E4C" or "Empowered for Change" text

### Partner Logos:
- Use white backgrounds for consistency
- Ensure logos are readable at small sizes
- Maintain aspect ratios (2:1 ratio recommended)
- Use high contrast colors

## 🔄 After Adding Logos

1. **Clear browser cache** (Ctrl+F5)
2. **Restart development server** if needed
3. **Check all pages** to ensure logos display correctly
4. **Test on mobile** to ensure responsive design works

## 📱 Responsive Behavior

- **Desktop**: Logo shows with text
- **Mobile**: Only logo shows (text hidden)
- **Partners**: Automatically adjusts grid layout based on screen size

## 🛠️ Troubleshooting

If logos don't appear:
1. Check file paths are correct
2. Ensure file names match exactly (case-sensitive)
3. Clear browser cache
4. Check file permissions
5. Verify image formats are supported

## 📝 Notes

- The main logo will appear in the navbar on all pages
- Partner logos only appear on the homepage
- All logos are optimized for web performance
- Hover effects are included for better user experience
