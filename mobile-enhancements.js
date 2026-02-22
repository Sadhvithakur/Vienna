/**
 * ==================== MOBILE TOUCH OPTIMIZATIONS ====================
 * Mobile-specific enhancements for Vienna Bakehouse & Kitchen
 * - Touch event handlers
 * - Device detection
 * - Responsive behavior adjustments
 */

// Prevent zoom on input focus (improve UX on iOS)
const inputs = document.querySelectorAll('input, textarea, select');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        document.body.style.zoom = "100%";
    });
});

// Enhanced button touch feedback
const buttons = document.querySelectorAll('button, .cta-button, .social-button');
buttons.forEach(button => {
    button.addEventListener('touchstart', () => {
        button.style.opacity = '0.8';
        button.style.transform = 'scale(0.98)';
    });
    button.addEventListener('touchend', () => {
        button.style.opacity = '1';
        button.style.transform = 'scale(1)';
    });
});

// Improve menu touch responsiveness
const navMenu = document.getElementById('navMenu');
if (navMenu) {
    navMenu.addEventListener('touchstart', (e) => {
        e.currentTarget.style.willChange = 'transform';
    });
    navMenu.addEventListener('touchend', (e) => {
        e.currentTarget.style.willChange = 'auto';
    });
}

// ==================== RESPONSIVE LAYOUT DETECTION ====================
/**
 * Detect device type and adjust behavior accordingly
 */
const isMobile = window.matchMedia('(max-width: 768px)').matches;
const isTablet = window.matchMedia('(min-width: 769px) and (max-width: 1024px)').matches;
const isDesktop = window.matchMedia('(min-width: 1025px)').matches;

// Add device class to body for CSS targeting
if (isMobile) {
    document.body.classList.add('device-mobile');
} else if (isTablet) {
    document.body.classList.add('device-tablet');
} else if (isDesktop) {
    document.body.classList.add('device-desktop');
}

// Listen for orientation changes on mobile
if (isMobile) {
    window.addEventListener('orientationchange', () => {
        const newOrientation = window.orientation || screen.orientation.angle;
        document.body.dataset.orientation = (newOrientation === 0 || newOrientation === 360) ? 'portrait' : 'landscape';
        
        // Refresh layout adjustments
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);
    });
}\n\n// ==================== TOUCH-FRIENDLY SPACING ====================\n/**\n * Ensure touch targets are at least 44x44px (mobile accessibility standard)\n */\n\n// Gallery items - make more touch-friendly\nconst galleryItems = document.querySelectorAll('.gallery-item');\ngalleryItems.forEach(item => {\n    item.style.cursor = 'pointer';\n    item.addEventListener('touchstart', function() {\n        this.style.boxShadow = '0 8px 20px rgba(92, 74, 66, 0.2)';\n    });\n    item.addEventListener('touchend', function() {\n        this.style.boxShadow = '';\n    });\n});\n\n// ==================== LAZY LOADING SUPPORT ====================\n/**\n * Add lazy loading to images for better mobile performance\n */\n\nif ('IntersectionObserver' in window) {\n    const imageObserver = new IntersectionObserver((entries, observer) => {\n        entries.forEach(entry => {\n            if (entry.isIntersecting) {\n                const img = entry.target;\n                if (img.dataset.src) {\n                    img.src = img.dataset.src;\n                    img.removeAttribute('data-src');\n                }\n                observer.unobserve(img);\n            }\n        });\n    }, {\n        rootMargin: '50px'\n    });\n\n    // Observe all images with data-src attribute\n    document.querySelectorAll('img[data-src]').forEach(img => {\n        imageObserver.observe(img);\n    });\n}\n\nconsole.log('📱 Mobile enhancements loaded - Touch-optimized experience active!');