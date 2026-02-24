# Vienna Bakehouse & Kitchen - Hybrid Website Structure

## Project Overview

Your website has been completely redesigned with a **hybrid architecture** that combines:
1. **Single-page scrollable homepage** for a seamless user experience
2. **Separate dedicated pages** for SEO optimization
3. **Smart navigation system** that automatically routes traffic

---

## What Changed

### Before
- Single index.html with all sections
- Simple anchor navigation
- Repetitive header/footer code across pages (if they existed)

### Now  
✓ **index.html** - Homepage with all sections + smooth scroll navigation  
✓ **about.html, menu.html, gallery.html, events.html, contact.html** - Dedicated pages  
✓ **shared-layout.js** - Dynamic header/footer injection  
✓ **Smart navigation** - Auto-detects page and routes appropriately  
✓ **Fully responsive** - Mobile, tablet, and desktop optimized  

---

## Files & Their Purpose

| File | Purpose | Status |
|------|---------|--------|
| `index.html` | Homepage with all sections + smooth scroll | ✅ Updated |
| `about.html` | Dedicated About page | ✅ New |
| `menu.html` | Dedicated Menu page | ✅ New |
| `gallery.html` | Dedicated Gallery page | ✅ New |
| `events.html` | Dedicated Events page | ✅ New |
| `contact.html` | Dedicated Contact page | ✅ New |
| `shared-layout.js` | Injects header & footer dynamically | ✅ New |
| `script.js` | Core interactions (smooth scroll, hamburger menu) | ✅ Updated |
| `style.css` | Responsive styles (mobile-first) | ✅ Updated |
| `config.js` | Configuration settings | ✅ Existing |
| `emailjs-integration.js` | Email form handling | ✅ Existing |
| `mobile-enhancements.js` | Mobile optimizations | ✅ Existing |

---

## Navigation Behavior

### Homepage (index.html)
```
User clicks "Menu" 
    ↓
Page smoothly scrolls to #menu section
URL: viennabakehouse.com/#menu
```

### Separate Page (menu.html)
```
User clicks "Home"
    ↓
Navigates to homepage
URL: viennabakehouse.com/
```

### Smart Detection
The `shared-layout.js` file automatically:
- Detects which page user is on
- Updates navigation links accordingly
- Injects header and footer on every page
- Enables smooth scrolling where applicable

---

## Key Features

### 1. Reusable Header & Footer
- Injected dynamically via `shared-layout.js`
- Same design across all pages
- Hamburger menu for mobile
- Sticky navigation bar

### 2. Hybrid Navigation
- **Homepage**: Smooth scroll to anchor links
- **Separate Pages**: Navigate between pages
- **Both URL patterns work**: `/#contact` OR `/contact.html`

### 3. Responsive Design
**Desktop (> 768px)**
- Full navigation menu
- Multi-column layouts
- Hover effects

**Tablet (481px - 768px)**
- Hamburger menu
- 2-column layouts
- Optimized spacing

**Mobile (< 480px)**
- Hamburger menu
- Single-column stacks
- Touch-friendly buttons (48px+)

### 4. Production-Ready Code
- Semantic HTML5
- Mobile-first CSS with breakpoints
- Smooth animations
- Accessibility features (aria labels)
- SEO optimized (meta tags, structured data)

---

## URL Patterns

### Single-Page Navigation (Homepage)
```
/                           → Homepage
/#menu                      → Menu section (smooth scroll)
/#about                     → About section (smooth scroll)
/#gallery                   → Gallery section (smooth scroll)
/#events                    → Events section (smooth scroll)
/#contact                   → Contact section (smooth scroll)
```

### Multi-Page Navigation (Separate Pages)
```
/menu.html                  → Menu page
/about.html                 → About page
/gallery.html               → Gallery page
/events.html                → Events page
/contact.html               → Contact page
```

### Both Patterns Work
All URL patterns are accessible. The system intelligently routes:
- `viennabakehouse.com/#about` → Search results friendly
- `viennabakehouse.com/about.html` → Direct page access

---

## How to Deploy

### 1. Upload All Files
```
vienna/
├── index.html
├── about.html
├── menu.html
├── gallery.html
├── events.html
├── contact.html
├── shared-layout.js (NEW - IMPORTANT!)
├── script.js
├── style.css
├── config.js
├── emailjs-integration.js
├── mobile-enhancements.js
└── media/
```

### 2. Configure Server
**For Apache (.htaccess):**
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^([a-zA-Z0-9_-]+)/?$ index.html [QSA,L]
</IfModule>
```

**For Nginx:**
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### 3. Test Each URL
- [ ] `domain.com/` works
- [ ] `domain.com/menu.html` works
- [ ] `domain.com/#menu` works
- [ ] Mobile navigation works
- [ ] Email forms work

---

## Testing Checklist

### Desktop
- [ ] All nav links work
- [ ] Smooth scroll to sections visible
- [ ] Header/footer on every page
- [ ] Hover effects work
- [ ] Forms submit

### Tablet
- [ ] Hamburger menu appears
- [ ] Menu closes after link click
- [ ] Layouts stack properly
- [ ] No horizontal scroll
- [ ] Forms work

### Mobile
- [ ] Hamburger menu works
- [ ] Touch-friendly buttons
- [ ] Images responsive
- [ ] No overflow
- [ ] Forms accessible

### Forms
- [ ] Event booking works
- [ ] Validation displays errors
- [ ] Success message shows
- [ ] Email received

---

## Common Questions

### Q: Why two URL patterns?
**A:** 
- `/#about` works well with hash history (single-page app style)
- `/about.html` is more traditional and SEO-friendly
- System supports both for flexibility

### Q: Do I need to update navigation links?
**A:** No! The `shared-layout.js` automatically:
- Detects current page
- Updates all nav links accordingly
- Handles smooth scrolling vs. navigation

### Q: What if I add a new section?
**A:** 
1. Add section to index.html with ID
2. Create new page (e.g., `blog.html`)
3. Add nav link to `shared-layout.js`
Done! System auto-routes.

### Q: Is this mobile-friendly?
**A:** Yes!
- Hamburger menu on mobile
- Responsive grid layouts
- Touch-friendly buttons (44px minimum)
- Optimized images

### Q: Can I customize colors?
**A:** Yes! Edit CSS variables in `style.css`:
```css
:root {
    --primary-beige: #f5f3f0;
    --warm-brown: #8b7355;
    --deep-brown: #5c4a42;
    --accent-gold: #d4af86;
}
```

---

## Performance Tips

1. **Optimize Images**
   - Use TinyPNG or ImageOptim
   - Target: <100KB per image

2. **Enable Caching**
   ```apache
   <IfModule mod_expires.c>
       ExpiresActive On
       ExpiresByType image/jpeg "access plus 1 month"
       ExpiresByType text/css "access plus 1 year"
       ExpiresByType application/javascript "access plus 1 year"
   </IfModule>
   ```

3. **Minify Assets**
   - Use webpack, gulp, or online tools
   - Combine CSS files
   - Combine JS files (where safe)

4. **Use CDN**
   - Serve images from CDN
   - Use CloudFlare for static assets
   - Reduce server load

---

## Security Considerations

1. **Validate Form Input**
   - Already done in emailjs-integration.js
   - Never trust client-side validation alone

2. **Use HTTPS**
   - Required for email forms
   - Required for secure cookies

3. **Rate Limit Forms**
   - Add server-side rate limiting
   - Prevent spam submissions

4. **Update Dependencies**
   - Keep EmailJS library updated
   - Update Leaflet map library
   - Use npm audit for vulnerabilities

---

## Documentation Files

### 1. ARCHITECTURE_GUIDE.md
- Complete system overview
- How hybrid structure works
- File organization
- Navigation patterns
- Adding new sections
- Performance optimization

### 2. IMPLEMENTATION_GUIDE.md
- Deployment instructions
- Complete testing checklist
- Desktop/tablet/mobile testing
- Page-specific tests
- SEO testing
- Troubleshooting common issues
- Performance optimization

### 3. This README (HYBRID_STRUCTURE.md)
- High-level overview
- Quick reference
- Deployment steps
- Common questions

---

## Next Steps

1. **Test locally** (see IMPLEMENTATION_GUIDE.md)
2. **Deploy to server**
3. **Monitor performance** (Google Search Console, Analytics)
4. **Gather user feedback** (forms, behavior tracking)
5. **Optimize based on data** (A/B testing, heatmaps)
6. **Add more content** (blog, testimonials, etc.)

---

## Support & Maintenance

### Regular Checks
- Weekly: Check forms are working, no broken links
- Monthly: Review analytics, monitor SEO rankings
- Quarterly: Update images, refresh content

### Common Tasks

**Update Navigation:**
- Edit `shared-layout.js` - one place!

**Update Header/Footer:**
- Edit `shared-layout.js` - affects all pages!

**Add New Section:**
- Add to index.html (`<section id="new">`)
- Create `new.html` page
- Add to navigation in `shared-layout.js`

**Change Colors:**
- Edit CSS variables in `style.css:root`

---

## Architecture Diagram

```
viennabakehouse.com/
    │
    ├─ / (index.html)
    │   ├─ #hero section
    │   ├─ #menu section
    │   ├─ #about section
    │   ├─ #gallery section
    │   ├─ #events section
    │   └─ #contact section
    │   └─ Navigation: smooth scroll to sections
    │
    ├─ /menu.html
    │   └─ Menu section only
    │   └─ Shared header + footer injected
    │   └─ Navigation: navigate to other pages
    │
    ├─ /about.html
    │   └─ About section only
    │   └─ Shared header + footer injected
    │
    ├─ /gallery.html
    │   └─ Gallery section only
    │   └─ Shared header + footer injected
    │
    ├─ /events.html
    │   └─ Events/Booking section only
    │   └─ Shared header + footer injected
    │
    └─ /contact.html
        └─ Contact section only
        └─ Shared header + footer injected

All pages (✨ shared-layout.js)
    ├─ Dynamic header injection
    ├─ Smart navigation routing
    ├─ Dynamic footer injection
    └─ Smooth scroll setup
```

---

## Version Information

- **Architecture Version**: 1.0 (Hybrid Single-Page + Multi-Page)
- **Created**: February 2026
- **Last Updated**: February 2026
- **Status**: Production Ready ✅

---

## Questions or Issues?

1. **Check IMPLEMENTATION_GUIDE.md** for troubleshooting
2. **Review ARCHITECTURE_GUIDE.md** for system details
3. **Check console errors** with browser DevTools (F12)
4. **Verify all files uploaded** correctly
5. **Check server configuration** (Apache, Nginx, etc.)

---

**Your website is now ready for deployment! 🚀**

Happy serving Vienna's specialty coffee culture online! ☕
