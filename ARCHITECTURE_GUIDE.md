# Vienna Bakehouse & Kitchen - Hybrid Website Architecture

## Overview

Your website now follows a **hybrid structure** with:
1. **Scrollable Homepage** (`index.html`) - All sections in one page with anchor navigation
2. **Separate Pages** - Individual pages for Menu, About, Gallery, Events, and Contact
3. **Shared Layout System** - Reusable header and footer across all pages
4. **Smart Navigation** - Automatically detects which page you're on and routes accordingly

---

## File Structure

```
vienna/
├── index.html                    # Homepage with all sections
├── about.html                    # Separate About page
├── menu.html                     # Separate Menu page
├── gallery.html                  # Separate Gallery page
├── events.html                   # Separate Events page
├── contact.html                  # Separate Contact page
├── shared-layout.js              # Header/Footer injection system
├── script.js                     # Main interactive features
├── style.css                     # Responsive styles
├── config.js                     # Configuration
├── emailjs-integration.js        # Email integration
├── mobile-enhancements.js        # Mobile optimizations
└── media/                        # Images and videos
```

---

## How It Works

### Smart Navigation System

The `shared-layout.js` file automatically determines navigation behavior based on the current page:

#### On Homepage (`/`)
- Clicking "Menu" → Smooth scroll to `#menu` section
- Clicking "Contact" → Smooth scroll to `#contact` section
- URL pattern: `viennabakehouse.com/#menu`

#### On Separate Pages (`/menu.html`, `/about.html`, etc.)
- Clicking "Home" → Navigate to `/`
- Clicking "About" → Navigate to `/about.html`
- Clicking "Contact" → Navigate to `/contact.html`
- URL patterns: `viennabakehouse.com/menu.html`, `viennabakehouse.com/about.html`

### Dynamic Layout Injection

Every page automatically receives:
1. **Sticky Navigation Bar** - Injected at the top
2. **Footer** - Injected at the bottom
3. **Same Design System** - Consistent styling across all pages

```html
<!-- shared-layout.js injects this -->
<nav class="navbar">...</nav>

<!-- Your page content here -->
<section id="about">...</section>

<!-- shared-layout.js injects this -->
<footer class="footer">...</footer>
```

---

## Navigation Links

### Homepage Scroll Links
```
Home     → /
Menu     → #menu (smooth scroll)
About    → #about (smooth scroll)
Gallery  → #gallery (smooth scroll)
Events   → #events (smooth scroll)
Contact  → #contact (smooth scroll)
```

### Separate Page Links
```
Home     → /
Menu     → /menu.html
About    → /about.html
Gallery  → /gallery.html
Events   → /events.html
Contact  → /contact.html
```

---

## Key Features

### 1. Hybrid Structure
✓ Single-page experience on homepage with smooth scrolling
✓ Dedicated pages for SEO optimization
✓ Both URL patterns work: `/#contact` and `/contact.html`

### 2. Responsive Design
✓ Desktop: Max-width container with full navigation
✓ Tablet: Optimized spacing and layout
✓ Mobile: Hamburger menu, stacked layout, touch-friendly buttons

### 3. Reusable Components
✓ Header dynamically injected on all pages
✓ Footer automatically appended
✓ No code duplication across pages
✓ Easy to update navigation in one place

### 4. Smooth Interactions
✓ Hamburger menu toggle
✓ Smooth scroll to sections
✓ Auto-closing mobile menu after link click
✓ Active state indicators (can be added)

### 5. Production-Ready
✓ Semantic HTML5
✓ Mobile-first CSS
✓ Accessibility features (aria labels)
✓ Proper meta tags for SEO
✓ Organized file structure

---

## Responsive Breakpoints

```css
/* Mobile First */
- Base styles for mobile (< 480px)
- Tablet optimizations (480px - 768px)  
- Desktop layout (> 768px)

/* Key breakpoints in style.css */
@media (max-width: 480px)  /* Mobile */
@media (max-width: 768px)  /* Tablet */
@media (max-width: 1024px) /* Large Tablet */
@media (max-width: 1200px) /* Desktop */
```

---

## Mobile Features

### Hamburger Menu
- Appears on screens < 768px
- Smooth slide-down animation
- Auto-closes after selection
- Accessible with aria labels

### Responsive Images
- Fluid sizing with max-width: 100%
- Proper aspect ratio maintenance
- Optimized for mobile viewing

### Touch-Friendly
- Buttons: 48px minimum height
- Easy tap targets
- No hover-only functionality
- Proper spacing between elements

---

## Usage Examples

### Example 1: User on Homepage
1. User visits `viennabakehouse.com/`
2. All sections visible (Hero, Menu, About, Gallery, Events, Contact)
3. Clicks "Menu" → Page smoothly scrolls to Menu section
4. URL becomes `viennabakehouse.com/#menu`
5. Page position saved in browser history

### Example 2: User on Menu Page
1. User visits `viennabakehouse.com/menu.html`
2. Sees only Menu section with full layout
3. Header and footer injected automatically
4. Clicks "About" → Navigates to `viennabakehouse.com/about.html`
5. Page loads About section with fresh header/footer

### Example 3: Direct Navigation
1. User bookmarks `viennabakehouse.com/#contact`
2. Can directly link to sections on homepage
3. User bookmarks `viennabakehouse.com/contact.html`
4. Can directly link to dedicated pages

---

## Adding New Sections

To add a new section (e.g., "Blog"):

### 1. Add to Homepage (index.html)
```html
<section id="blog" class="blog">
    <!-- Blog content -->
</section>
```

### 2. Create Dedicated Page (blog.html)
```html
<body>
    <!-- shared-layout.js injects header -->
    <section id="blog" class="blog">
        <!-- Blog content -->
    </section>
    <!-- shared-layout.js injects footer -->
    <script src="/shared-layout.js"></script>
</body>
```

### 3. Update Navigation (shared-layout.js)
```javascript
<li><a href="#" class="nav-link" data-page="blog">Blog</a></li>
```

The system automatically handles routing!

---

## Performance Optimization

### Current Optimizations
- Semantic HTML reduces DOM size
- CSS variables for consistent theming
- Mobile-first approach (smaller initial CSS)
- Shared components reduce redundancy
- Lazy loading on images (add with data-lazy)

### Recommended Next Steps
1. Add image lazy loading
2. Minimize CSS/JS files
3. Implement service workers for offline access
4. Add WebP image format support
5. Cache header/footer (rarely changes)

---

## Browser Support

✓ Chrome/Edge (latest 2 versions)
✓ Firefox (latest 2 versions)
✓ Safari 12+
✓ Mobile browsers (iOS Safari 12+, Chrome Mobile)

---

## Troubleshooting

### Smooth Scroll Not Working
- Check browser supports `scroll-behavior: smooth`
- Verify section IDs match nav link hrefs
- Chrome/Edge support added in version 61+

### Navigation Not Routing Correctly
- Clear browser cache
- Check data-page attributes match filenames
- Verify all pages have `/shared-layout.js` script

### Images Not Loading
- Verify image paths start with `/`
- Check media folder exists and files are present
- Test on local server (not file://)

### Mobile Menu Not Closing
- Ensure hamburger button has ID="hamburger"
- Check nav-menu has ID="navMenu"
- Verify shared-layout.js is loaded

---

## Custom Styling

### Color Variables (edit in style.css)
```css
:root {
    --primary-beige: #f5f3f0;
    --warm-brown: #8b7355;
    --deep-brown: #5c4a42;
    --accent-gold: #d4af86;
}
```

### Typography
```css
--font-serif: 'Playfair Display', serif;    /* Headings */
--font-sans: 'Poppins', sans-serif;         /* Body text */
```

### Spacing Scale
```css
--spacing-xs: 0.5rem;
--spacing-sm: 1rem;
--spacing-md: 1.5rem;
--spacing-lg: 2rem;
--spacing-xl: 3rem;
```

---

## SEO Optimization

✓ Semantic HTML5 structure
✓ Proper heading hierarchy
✓ Meta descriptions on each page
✓ Canonical tags
✓ Mobile-friendly viewport
✓ Schema.org structured data
✓ Keyword-optimized URLs

---

## Next Steps

1. **Test across devices** - Check mobile and tablet views
2. **Verify form submissions** - Test event booking and contact forms
3. **Monitor analytics** - Track which pages get most traffic
4. **Optimize images** - Use WebP format where supported
5. **Add more sections** - Blog, team, testimonials, etc.
6. **Implement caching** - Use service workers or CDN
7. **A/B testing** - Test different CTA placements

---

**Version**: 1.0  
**Last Updated**: February 2026  
**Architecture**: Hybrid Single-Page + Multi-Page Pattern
