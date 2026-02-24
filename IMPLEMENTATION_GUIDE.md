# Implementation & Testing Guide

## Quick Start

### 1. File Deployment
All files are ready to deploy. Ensure the directory structure is:
```
vienna/
├── index.html
├── about.html
├── menu.html
├── gallery.html
├── events.html
├── contact.html
├── shared-layout.js         ← NEW
├── script.js
├── style.css
├── config.js
├── emailjs-integration.js
├── mobile-enhancements.js
├── media/
│   ├── logoo.png
│   ├── back.JPEG
│   ├── bg.jpeg
│   ├── D.mp4
│   ├── 1.JPEG through 6.PNG
│   └── menu.pdf
```

### 2. Server Configuration
#### If using Apache (.htaccess)
```apache
# Enable clean URLs
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^([a-zA-Z0-9_-]+)/?$ index.html [QSA,L]
</IfModule>
```

#### If using Node.js/Express
```javascript
app.get('/:page', (req, res) => {
    const page = req.params.page;
    if (fs.existsSync(`./public/${page}.html`)) {
        res.sendFile(`./public/${page}.html`);
    } else {
        res.sendFile('./public/index.html'); // fallback
    }
});
```

#### If using Nginx
```nginx
server {
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## Testing Checklist

### Desktop Testing (Chrome, Firefox, Safari)

#### Navigation
- [ ] Click "Home" link → navigates to `/` with smooth scroll
- [ ] Click "Menu" link → page scrolls to `#menu` section
- [ ] Click "About" → page scrolls to `#about` section
- [ ] Click "Gallery" → page scrolls to `#gallery` section
- [ ] Click "Events" → page scrolls to `#events` section
- [ ] Click "Contact" → page scrolls to `#contact` section
- [ ] Logo click → navigates to homepage `/`
- [ ] Smooth scroll animation visible
- [ ] Can scroll back through history

#### Layout & Design
- [ ] Sticky navigation bar at top
- [ ] Header and footer visible on all pages
- [ ] Colors match design system (warm beige, coffee tones)
- [ ] Typography displays correctly (Playfair Display for headings)
- [ ] All images load properly
- [ ] Video plays on About section
- [ ] No overlapping elements
- [ ] Max-width container centered

#### Forms
- [ ] Event booking form works
- [ ] Form validation shows errors
- [ ] Submit button responsive
- [ ] Success message appears after submission

---

### Tablet Testing (768px width)

#### Navigation
- [ ] Hamburger menu appears
- [ ] Clicking hamburger opens menu
- [ ] Clicking nav link closes menu auto
- [ ] Links still navigate correctly

#### Layout
- [ ] Menu section stacks vertically (left → center → right)
- [ ] Gallery grid: 2-3 items per row
- [ ] About: image below text (vertical layout)
- [ ] Contact: map below info card
- [ ] Form fields stack properly
- [ ] No horizontal scrolling
- [ ] Buttons are touch-friendly (48px+ height)

#### Spacing
- [ ] Padding adjusts for tablet (not cramped, not too spread)
- [ ] Font sizes readable
- [ ] Gap between sections appropriate

---

### Mobile Testing (480px width)

#### Navigation
- [ ] Hamburger menu visible
- [ ] Mobile nav menu looks good
- [ ] Menu items readable
- [ ] No overlap with content

#### Layout
- [ ] All sections stack vertically
- [ ] Menu section: text → image → featured items (top to bottom)
- [ ] Gallery: 1-2 items per row
- [ ] Contact form: single column
- [ ] Map height reduced to 250px
- [ ] Footer readable

#### Touch Interaction
- [ ] Buttons are 44px+ tall
- [ ] Links are easy to tap
- [ ] No hover-only functionality
- [ ] Smooth scroll works
- [ ] Hamburger animation smooth

#### Images
- [ ] Images load without horizontal scroll
- [ ] Images responsive (not fixed size)
- [ ] Image quality acceptable
- [ ] Background images show

---

### Cross-Platform Testing

#### iOS Safari
- [ ] Viewport correct
- [ ] No zoom-on-tap issues
- [ ] Video plays on About page
- [ ] Form inputs work

#### Chrome Mobile
- [ ] All features work
- [ ] Performance good
- [ ] No console errors

#### Firefox Mobile
- [ ] Layout renders correctly
- [ ] Smooth scroll works
- [ ] Links navigate properly

---

### Page-Specific Testing

#### Homepage (index.html)
- [ ] All 6 sections visible
- [ ] `#hero` section loads first
- [ ] Can navigate to each section via anchor
- [ ] URL updates correctly: `/#menu`, `/#about`, etc.
- [ ] Smooth scroll to sections works
- [ ] CTA buttons clickable

#### About Page (/about.html)
- [ ] Header injected correctly
- [ ] Footer injected correctly
- [ ] Only About section visible
- [ ] Video plays
- [ ] "Menu" link navigates to `/menu.html`
- [ ] "Home" link navigates to `/`
- [ ] URL is `/about.html`

#### Menu Page (/menu.html)
- [ ] Header and footer injected
- [ ] Menu section displays correctly
- [ ] Left/center/right columns visible on desktop
- [ ] Stacks on mobile
- [ ] "View Full Menu" PDF link works
- [ ] Navigation links work

#### Gallery Page (/gallery.html)
- [ ] Gallery grid displays
- [ ] 6 images load
- [ ] Hover effects work on desktop
- [ ] Images responsive on mobile
- [ ] Responsive grid: 3 cols (desktop) → 2 cols (tablet) → 1 col (mobile)

#### Events Page (/events.html)
- [ ] Event info displays
- [ ] Booking form works
- [ ] Form fields required validation
- [ ] EmailJS integration sends email
- [ ] Success message shows
- [ ] Date picker works

#### Contact Page (/contact.html)
- [ ] Contact info displays
- [ ] Map loads (Leaflet)
- [ ] "Get Directions" button works
- [ ] Social media links open in new tabs
- [ ] Responsive layout

---

### URL Testing

#### All These Should Work
- [ ] `viennabakehouse.com/` → homepage
- [ ] `viennabakehouse.com/#menu` → scroll to menu (on homepage)
- [ ] `viennabakehouse.com/#about` → scroll to about (on homepage)
- [ ] `viennabakehouse.com/#gallery` → scroll to gallery (on homepage)
- [ ] `viennabakehouse.com/#events` → scroll to events (on homepage)
- [ ] `viennabakehouse.com/#contact` → scroll to contact (on homepage)
- [ ] `viennabakehouse.com/menu.html` → Menu page
- [ ] `viennabakehouse.com/about.html` → About page
- [ ] `viennabakehouse.com/gallery.html` → Gallery page
- [ ] `viennabakehouse.com/events.html` → Events page
- [ ] `viennabakehouse.com/contact.html` → Contact page

---

### Performance Testing

#### Lighthouse Audit
- [ ] Performance: > 80
- [ ] Accessibility: > 90
- [ ] Best Practices: > 90
- [ ] SEO: > 90

#### Load Time
- [ ] Homepage loads in < 2 seconds
- [ ] Individual pages load in < 1.5 seconds
- [ ] Images optimized (< 100KB each where possible)
- [ ] No render-blocking resources

#### Optimization Tips
```html
<!-- Add image lazy loading -->
<img src="/media/image.jpg" alt="Description" loading="lazy">

<!-- Defer non-critical CSS -->
<link rel="preload" href="/style.css" as="style">

<!-- Async scripts where safe -->
<script src="/script.js" async></script>
```

---

### Accessibility Testing

#### WCAG 2.1 Compliance
- [ ] All images have alt text
- [ ] Headings in logical order (h1 → h2 → h3)
- [ ] Color contrast ratio > 4.5:1
- [ ] Form labels associated with inputs
- [ ] Links have descriptive text (not "click here")
- [ ] Hamburger button has aria-label
- [ ] Skip-to-content link possible (optional)

#### Keyboard Navigation
- [ ] Tab through all links → navigation works
- [ ] Form inputs focusable
- [ ] Focus indicator visible
- [ ] No keyboard traps
- [ ] Can submit form with keyboard

#### Screen Reader (NVDA/JAWS)
- [ ] Page structure makes sense
- [ ] Navigation announced correctly
- [ ] Form fields announced with labels
- [ ] Images with alt text described
- [ ] Decorative images marked as decorative

---

### SEO Testing

#### On-Page SEO
- [ ] Title tags unique for each page
- [ ] Meta descriptions present
- [ ] H1 tags present and descriptive
- [ ] Keywords in headings
- [ ] Internal links working
- [ ] Mobile-friendly
- [ ] Fast loading

#### Technical SEO
- [ ] XML sitemap present
- [ ] Robots.txt configured
- [ ] Structured data (schema.org) implemented
- [ ] Canonical tags correct
- [ ] No 404 errors
- [ ] HTTPS enabled

#### Tools to Test
- Google Search Console
- Google Mobile-Friendly Test
- Google Lighthouse
- SEMrush or similar

---

### Browser Compatibility

#### Required Support
- ✓ Chrome 90+
- ✓ Firefox 88+
- ✓ Safari 14+
- ✓ Edge 90+
- ✓ iOS Safari 14+
- ✓ Chrome Mobile

#### Check
- [ ] Smooth scroll works (or graceful fallback)
- [ ] CSS Grid/Flexbox renders
- [ ] Video plays
- [ ] Forms work
- [ ] Animations smooth

---

### Common Issues & Fixes

#### Issue: Images Not Loading
**Solution:**
1. Check paths start with `/` (absolute paths)
2. Verify media folder exists
3. Check file permissions
4. Test on actual server (not file:///)

#### Issue: Navigation Not Working
**Solution:**
1. Clear browser cache
2. Check data-page attributes match filenames
3. Verify shared-layout.js loaded
4. Check console for errors

#### Issue: Smooth Scroll Not Working
**Solution:**
1. Verify section IDs exist: `#menu`, `#about`, etc.
2. Check nav link hrefs match IDs
3. Browser might not support scroll-behavior
4. Add fallback:
   ```css
   html {
       scroll-behavior: smooth; /* Fallback */
   }
   ```

#### Issue: Mobile Menu Not Closing
**Solution:**
1. Check hamburger has ID="hamburger"
2. Verify nav-menu has ID="navMenu"
3. Check shared-layout.js is loaded
4. Review console for JavaScript errors

#### Issue: Form Not Submitting
**Solution:**
1. Check EmailJS config in config.js
2. Verify service ID and template ID
3. Check user key is valid
4. Test in browser console:
   ```javascript
   emailjs.send('service_id', 'template_id', data)
   ```

---

### Performance Optimization Checklist

- [ ] Images compressed (TinyPNG, ImageOptim)
- [ ] CSS minified
- [ ] JavaScript minified
- [ ] Unused CSS removed
- [ ] Unused JavaScript removed
- [ ] Font files optimized
- [ ] Lazy loading on images
- [ ] CDN for external libraries
- [ ] Caching headers set
- [ ] Gzip compression enabled
- [ ] WebP format for images (with fallback)

---

### Deployment Checklist

- [ ] All files uploaded
- [ ] Correct file permissions (644 for files, 755 for directories)
- [ ] .htaccess or server config in place
- [ ] SSL certificate installed
- [ ] CDN configured (if using)
- [ ] Email service tested
- [ ] Analytics implemented
- [ ] Error logging set up
- [ ] Backup created
- [ ] DNS updated (if new domain)
- [ ] Email records configured (SPF, DKIM)

---

### Post-Launch Monitoring

1. **Check Daily**
   - [ ] No broken links (404 errors)
   - [ ] All forms working
   - [ ] Pages loading fast
   - [ ] No console errors

2. **Weekly**
   - [ ] Mobile responsiveness
   - [ ] Form submissions reaching email
   - [ ] Analytics data flowing
   - [ ] Google Search Console status

3. **Monthly**
   - [ ] SEO ranking progress
   - [ ] Traffic sources
   - [ ] User behavior
   - [ ] Performance metrics

---

## Support Scripts

### Debug Script (add to console)
```javascript
// Check all nav links
document.querySelectorAll('.nav-link').forEach((link, i) => {
    console.log(i, link.textContent, link.href);
});

// Check shared layout loaded
console.log('Navbar:', !!document.querySelector('.navbar'));
console.log('Footer:', !!document.querySelector('.footer'));

// Check current page
console.log('Current page:', window.location.pathname);
```

### Local Testing
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (with http-server)
npm install -g http-server
http-server

# Visit: http://localhost:8000
```

---

**Next Steps:** After deployment, monitor performance and user behavior to optimize further!
