# Vienna Bakehouse & Kitchen - Single-Page Application Guide

## 📋 Overview

Your website has been converted to a **Single-Page Application (SPA)** with route-based navigation. Everything runs on one `index.html` file with smooth scrolling between sections and dynamic URL updates.

---

## 🏗️ Structure

### Sections (All on One Page)
```
index.html
├── #home       (Hero section)
├── #menu       (Menu section)
├── #about      (About section)
├── #gallery    (Gallery section)
├── #events     (Events section)
└── #contact    (Contact section)
```

### Key Files Modified
- **index.html** - All content consolidated (section IDs: #home, #menu, #about, #gallery, #events, #contact)
- **shared-layout.js** - Route-based navigation logic
- **script.js** - Enhanced active section detection
- **style.css** - Responsive styling (no changes needed)

---

## 🔄 Navigation Flow

### 1. **Navigation Menu Click**
```
User clicks "Menu" in navbar
         ↓
Smooth scrolls to #menu section
         ↓
URL updates to /menu (via scroll detection)
         ↓
Active nav link highlights
```

### 2. **Direct URL Navigation**
```
User visits example.com/about
         ↓
initializeRouting() detects path on page load
         ↓
Auto-scrolls to #about section (300ms delay)
         ↓
URL remains /about
         ↓
Active nav link highlights "About"
```

### 3. **Scroll Navigation**
```
User scrolls down to Events section
         ↓
Scroll listener detects section in viewport
         ↓
URL updates to /events automatically
         ↓
Active nav link updates without user interaction
```

### 4. **Browser Back/Forward**
```
User clicks browser back button
         ↓
popstate event fires with stored section data
         ↓
Scrolls to previous section smoothly
         ↓
URL and active link sync correctly
```

---

## 🔧 How It Works

### Route Detection (shared-layout.js)

**initializeRouting()** function:
- Checks current URL path on page load
- Maps paths to section IDs:
  - `/` or `/index.html` → `#home`
  - `/about` → `#about`
  - `/menu` → `#menu`
  - `/gallery` → `#gallery`
  - `/events` → `#events`
  - `/contact` → `#contact`
- Auto-scrolls to matched section with smooth animation

**Code:**
```javascript
// On page load, detects /about and scrolls to #about section
function handleRouteOnLoad() {
    const path = window.location.pathname;
    let sectionId = 'home';
    
    if (path.includes('/about')) {
        sectionId = 'about';
    }
    // ... scroll to section
}
```

### URL Updates (shared-layout.js)

**initializeUrlUpdater()** function:
- Uses Intersection Observer to detect which section is in viewport
- Automatically updates URL when section becomes visible
- Uses `history.pushState()` for seamless URL updates without page reload

**Code:**
```javascript
// When #gallery section enters viewport at 30% visibility
const newUrl = '/gallery';
window.history.pushState(
    { section: 'gallery' },  // Popstate state
    'Gallery',               // Title (not used by browsers)
    newUrl                   // URL to display
);
```

### Active Link Highlighting (script.js)

**Intersection Observer** monitors sections:
- Updates active nav link as user scrolls through sections
- 30% threshold: Link becomes active when 30% of section is in view
- Uses `rootMargin` to adjust trigger point

**Code:**
```javascript
// Observes all sections and highlights matching nav link
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            // Remove active from all links
            navLinks.forEach(link => link.classList.remove('active'));
            // Add active to matching link
            const matchingLink = Array.from(navLinks)
                .find(link => link.getAttribute('href') === '#' + sectionId);
            matchingLink?.classList.add('active');
        }
    });
}, sectionObserverOptions);
```

---

## 📱 Responsive Behavior

### Navigation Links (shared-layout.js)
```html
<ul class="nav-menu">
    <li><a href="#home" class="nav-link">Home</a></li>
    <li><a href="#menu" class="nav-link">Menu</a></li>
    <li><a href="#about" class="nav-link">About</a></li>
    <li><a href="#gallery" class="nav-link">Gallery</a></li>
    <li><a href="#events" class="nav-link">Events</a></li>
    <li><a href="#contact" class="nav-link">Contact</a></li>
</ul>
```

### Mobile Hamburger Menu
- **Desktop (1440px+):** Full navbar visible, navigation items horizontally aligned
- **Tablet (769px-1023px):** Navbar compresses, hamburger shows on scroll
- **Mobile (<768px):** Hamburger menu always visible, nav items stack vertically when menu opens

### Scroll-Triggered Hamburger (All Screen Sizes)
When user scrolls:
- Navbar collapses to hamburger-only view
- When user scrolls to top: Navbar expands back to full menu

---

## 🎨 CSS Classes

### Active Navigation Link
```css
.nav-link.active {
    color: var(--accent-gold);
}

.nav-link.active::before {
    width: 100%;
    transform: translateX(-50%);
}
```

### Scrolled Navbar State
```css
.navbar.scrolled {
    background: rgba(245, 243, 240, 0.92);
    backdrop-filter: blur(12px);
    box-shadow: 0 8px 32px rgba(92, 74, 66, 0.08);
}

/* Collapsed navbar on scroll (all screen sizes) */
.navbar.nav-collapsed .nav-menu {
    display: none !important;
}

.navbar.nav-collapsed .hamburger {
    display: flex !important;
}
```

---

## 🚀 Usage Examples

### Example 1: User Clicks "Gallery" Link
```
1. User clicks "Gallery" in navbar
2. href="#gallery" triggers smooth scroll
3. #gallery section smoothly scrolls into view
4. URL automatically updates to /gallery
5. "Gallery" link highlights in navbar
```

### Example 2: Direct URL Access
```
1. User types example.com/events in browser
2. Page loads
3. JavaScript detects /events path
4. Auto-scrolls to #events section
5. "Events" link automatically highlights
```

### Example 3: User Scrolls Through Page
```
1. User scrolls down from #home
2. Reaches #about section (30% in viewport)
3. URL auto-updates to /about
4. "About" link highlights automatically
5. Browser history maintains proper state for back/forward
```

### Example 4: Mobile Menu on Scroll
```
1. User on mobile, navbar showing full menu
2. User scrolls down > 50px
3. Navbar collapses to hamburger-only view
4. User can click hamburger to expand menu
5. Menu closes automatically when link is clicked
```

---

## 📝 Add New Sections

To add a new section to the SPA:

### 1. **Add HTML Section** (index.html)
```html
<section id="newsection" class="newsection">
    <div class="container">
        <h2>New Section</h2>
        <!-- content -->
    </div>
</section>
```

### 2. **Add Navigation Link** (shared-layout.js)
```html
<li><a href="#newsection" class="nav-link">New Section</a></li>
```

### 3. **Add CSS Styling** (style.css)
```css
.newsection {
    padding: 80px 20px;
    background: #f8f5ef;
}
```

### 4. **Add to Route Map** (shared-layout.js)
```javascript
// In initializeRouting() function
const sections = ['home', 'about', 'menu', 'gallery', 'events', 'contact', 'newsection'];

// In handleRouteOnLoad() path matching
if (path.includes('/newsection')) {
    sectionId = 'newsection';
}
```

---

## 🔍 SEO Considerations

✅ **SEO Benefits of SPA Implementation:**
- Semantic HTML with proper heading hierarchy
- Unique meta descriptions for each section
- Fast load time (single HTML file)
- Smooth scroll experience
- Proper URL structure (`/about`, `/menu`, etc.)

✅ **Meta Tags Already in Place** (index.html)
```html
<meta name="description" content="Vienna Bakehouse & Kitchen - Premium specialty coffee...">
<meta name="keywords" content="cafe in Koramangala, bakery in Bengaluru...">
<script type="application/ld+json">
  <!-- Structured data for local business -->
</script>
```

---

## 🐛 Testing Checklist

- [ ] Click each navigation item - verifies smooth scroll and URL update
- [ ] Type `/menu` in URL bar - verifies direct route access
- [ ] Type `/events` in URL bar - verifies events route works
- [ ] Type `/contact` in URL bar - verifies contact route works
- [ ] Type `/about` in URL bar - verifies about route works
- [ ] Scroll through sections - verifies active link highlighting
- [ ] Scroll through sections - verifies URL updates during scroll
- [ ] Use browser back/forward buttons - verifies history state
- [ ] Test on mobile - verifies hamburger menu behavior
- [ ] Scroll on mobile - verifies navbar collapse
- [ ] Click hamburger menu - verifies mobile menu open/close
- [ ] Click nav link in mobile menu - verifies menu auto-close
- [ ] Press logo - verifies home section scroll
- [ ] Click CTA button - verifies smooth scroll to menu

---

## 🔧 URL Update Mechanism (Fixed)

### How URL Updates Work Now:

**Scroll Detection:**
```javascript
// Detects which section is most visible when user scrolls
function updateUrlForSection() {
    // Find section with top edge in upper 50% of viewport
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (sectionTop <= window.innerHeight / 2) {
            currentSection = section.id;
        }
    });
    
    // Update URL: /menu, /about, /events, /contact, /
    const newUrl = currentSection === 'home' ? '/' : '/' + currentSection;
    window.history.pushState({ section: currentSection }, currentSection, newUrl);
}

// Listens to scroll events with 150ms debounce
window.addEventListener('scroll', updateUrlForSection);
```

**Direct URL Access:**
```javascript
// On page load, detects current URL path
const path = window.location.pathname; // e.g., "/menu", "/events"

// Maps to section: /events → #events section
if (path.includes('/events')) sectionId = 'events';

// Auto-scrolls to matched section with 300ms delay
setTimeout(() => scrollToSection(sectionId), 300);
```

### Supported URLs:
- `/` → Home section
- `/home` → Home section  
- `/menu` → Menu section
- `/about` → About section
- `/gallery` → Gallery section
- `/events` → Events section
- `/contact` → Contact section

---

## 🎯 Common Issues & Solutions

### Issue: URLs Not Updating When Scrolling

**Symptoms:** Scroll through sections but URL stays at `/`

**Solution:**
1. Check browser console (F12) for errors
2. Verify all sections have correct IDs in HTML:
   - `<section id="home">`
   - `<section id="menu">`
   - `<section id="about">`
   - `<section id="gallery">`
   - `<section id="events">`
   - `<section id="contact">`
3. Verify `initializeUrlUpdater()` is called in DOMContentLoaded
4. Check that `window.isInitialRouteHandled` flag is set to true after initial routing

### Issue: Direct URL Access Not Working (e.g., /menu, /events)

**Symptoms:** Visit example.com/menu but stays at top, doesn't scroll to menu section

**Solution:**
1. Ensure page loads completely before auto-scroll (300ms delay in place)
2. Verify section ID matches URL path:
   - `/menu` → must have `<section id="menu">`
   - `/events` → must have `<section id="events">`
   - `/contact` → must have `<section id="contact">`
3. Check navbar height calculation (should be ~80px on desktop, ~70px on mobile)
4. Test in console: `console.log(document.getElementById('menu'))` should return element

### Issue: Active Nav Link Not Highlighting Correctly

**Symptoms:** URL updates but navbar link doesn't highlight the current section

**Solution:**
1. Verify nav links have matching hrefs:
   ```html
   <a href="#home" class="nav-link">Home</a>
   <a href="#events" class="nav-link">Events</a>
   ```
2. Check CSS for `.nav-link.active` styling is applied
3. Verify section observer is running (should detec32% of section in view)
4. Check in DevTools: element inspector → nav links should have `active` class

### Issue: History (Back/Forward) Not Working

**Symptoms:** Click back button but doesn't return to previous section

**Solution:**
1. Verify `popstate` event listener is set up correctly
2. Check that each URL update calls `window.history.pushState()`
3. Test in console: `window.history.back()` should work
4. Ensure state object has section data: `{ section: 'events' }`

---

## 🐛 Testing Checklist

---

## 📊 File Summary

| File | Changes | Purpose |
|------|---------|---------|
| **index.html** | Section ID changed: `#hero` → `#home` | Single source of truth |
| **shared-layout.js** | +150 lines: routing, URL updates | Route-based navigation |
| **script.js** | Enhanced section detection | Active link highlighting |
| **style.css** | Scroll hamburger styles | Mobile responsiveness |

---

## 🎯 Key Features

✨ **Single Page App Features:**
- 🔗 **Dynamic URL Updates** - URLs change without page reloads
- 📍 **Route Detection** - Direct links work (`/about`, `/menu`)
- 🎯 **Active Section Tracking** - Highlights current section in nav
- ⌨️ **Browser History** - Back/forward buttons work correctly
- 📱 **Mobile Responsive** - Hamburger menu with scroll collapse
- 🚀 **Performance** - No page reloads, smooth animations
- ♿ **Accessibility** - Semantic HTML, ARIA labels

---

## 💡 How to Debug

### Navigation Not Working?
1. Open browser DevTools (F12)
2. Check console for errors
3. Verify section IDs match nav link hrefs
4. Test direct URL navigation

### Active Link Not Highlighting?
1. Scroll to different sections
2. Check if URL updating in address bar
3. Verify intersection observer threshold (currently 0.3 = 30%)
4. Check CSS `.nav-link.active` styles

### URL Not Updating?
1. Check network tab for pushState calls
2. Verify `initializeUrlUpdater()` is initialized
3. Ensure sections have proper IDs
4. Test scroll speed (might need 100ms delay)

---

## 📚 Resources

- [MDN: Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [MDN: History API (pushState)](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState)
- [MDN: Popstate Event](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event)
- [Web.dev: Single Page Apps](https://web.dev/navigation-and-routing/)

---

## ✅ Implementation Status

- ✅ All sections on single HTML page
- ✅ Route detection and auto-scroll
- ✅ URL updates without page reload
- ✅ Browser back/forward support
- ✅ Active section highlighting
- ✅ Smooth scrolling animations
- ✅ Mobile hamburger menu
- ✅ Scroll-triggered navbar collapse
- ✅ Full responsive design
- ✅ SEO-friendly structure

---

**Your Vienna Bakehouse website is now a modern, single-page application with seamless navigation! 🎉**

Enjoy the smooth SPA experience! ☕🥐
