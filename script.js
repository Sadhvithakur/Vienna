/**
 * ==================== VANILLA JAVASCRIPT ====================
 * Vienna Kitchen & Bakehouse - Interactive Features
 * 
 * This script handles:
 * - Navbar scroll behavior and style transitions
 * - Smooth scroll navigation
 * - Scroll-triggered fade-in animations
 * - Menu card animations
 * - Gallery hover effects
 * - Button micro-interactions
 */

// ==================== DOM ELEMENT CACHE ====================
// Cache frequently accessed elements to improve performance

const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const logo = document.querySelector('.logo');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const ctaButton = document.querySelector('.cta-button');
const menuCards = document.querySelectorAll('.menu-card');
const galleryItems = document.querySelectorAll('.gallery-item');
const body = document.body;

// ==================== HAMBURGER MENU TOGGLE ====================
/**
 * Mobile Menu Toggle
 * - Toggles hamburger menu open/close
 * - Smooth slide-down animation
 * - Closes when a link is clicked
 */
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ==================== LOGO CLICK TO SCROLL TOP ====================
/**
 * Logo Click Behavior
 * - Smooth scroll to top when logo is clicked
 * - Works as a home button
 */
if (logo) {
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        // Close mobile menu if open
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ==================== NAVBAR SCROLL BEHAVIOR ====================
/**
 * Navbar Style Change on Scroll
 * - Applies 'scrolled' class when user scrolls down
 * - Removes it when at the top (for a transparent effect)
 */
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== SMOOTH SCROLL NAVIGATION ====================
/**
 * Smooth Scroll for Navigation Links
 * - Click on nav links for instant smooth scrolling to sections
 * - Prevents default anchor behavior
 * - Calculates proper offset accounting for fixed navbar height
 */
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();

        // Get the target section ID from the href
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            // Calculate offset (accounting for navbar height of ~80px)
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;

            // Smooth scroll to the target
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== CTA BUTTON INTERACTIONS ====================
/**
 * Call-to-Action Button Behavior
 * - Smooth scroll to menu section on click
 * - Visual feedback via button hover/active states (in CSS)
 */
ctaButton.addEventListener('click', () => {
    const menuSection = document.getElementById('menu');
    const navbarHeight = navbar.offsetHeight;
    const targetPosition = menuSection.offsetTop - navbarHeight;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
});

// ==================== SCROLL-TRIGGERED FADE-IN ANIMATIONS ====================
/**
 * Intersection Observer for Scroll Animations
 * - Detects when elements enter the viewport
 * - Adds fade-in or fade-in-up animations
 * - Improves performance with Intersection Observer API
 * 
 * Options:
 * - threshold: 0.1 = animation triggers when 10% of element is visible
 * - rootMargin: Adjusts the trigger point (100px before element enters)
 */

// Create Intersection Observer instance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        // When element enters viewport, add animation class
        if (entry.isIntersecting) {
            // Stagger animations for menu cards
            if (entry.target.classList.contains('menu-card')) {
                entry.target.style.animationDelay = `${Array.from(menuCards).indexOf(entry.target) * 0.1}s`;
            }

            // Add appropriate animation class
            entry.target.classList.add('fade-in-up');

            // For gallery items, use zoom-in instead
            if (entry.target.classList.contains('gallery-item')) {
                entry.target.classList.remove('fade-in-up');
                entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
            }

            // Stop observing once animation is triggered
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe menu cards and gallery items
menuCards.forEach(card => {
    observer.observe(card);
});

galleryItems.forEach(item => {
    observer.observe(item);
});

// ==================== MENU CARD HOVER INTERACTIONS ====================
/**
 * Enhanced Menu Card Hover Effects
 * - Tracks mouse position for dynamic shadow effects
 * - Creates subtle parallax effect on hover
 */
menuCards.forEach(card => {
    // Add event listeners for enhanced hover feedback
    card.addEventListener('mouseenter', () => {
        // Already handled in CSS, but can add extra JS interactions here
        card.style.cursor = 'pointer';
    });

    card.addEventListener('mouseleave', () => {
        card.style.cursor = 'default';
    });
});

// ==================== GALLERY HOVER ANIMATIONS ====================
/**
 * Gallery Item Hover Effects
 * - Zoom and overlay effects on hover
 * - Smooth transitions for visual appeal
 */
galleryItems.forEach(item => {
    const img = item.querySelector('img');
    const overlay = item.querySelector('.gallery-overlay');

    item.addEventListener('mouseenter', () => {
        // Add scale effect (handled in CSS, but can enhance with JS if needed)
        item.style.transform = 'scale(0.98)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// ==================== BUTTON MICRO-INTERACTIONS ====================
/**
 * CTA Button Enhanced Interaction
 * - Visual feedback with scale and ripple effect
 */
ctaButton.addEventListener('mousedown', (event) => {
    // Create ripple effect
    const ripple = document.createElement('span');
    const rect = ctaButton.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    // Note: Ripple CSS styling can be added for more advanced effects
});

// ==================== ACTIVE NAV LINK INDICATOR ====================
/**
 * Highlights Current Section in Navigation
 * - Updates active nav link as user scrolls through sections
 * - Provides visual indication of current section
 */
window.addEventListener('scroll', () => {
    let current = '';

    // Check which section is currently in view
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        // If section is in viewport, mark as current
        if (pageYOffset >= sectionTop - navbar.offsetHeight - 100) {
            current = section.getAttribute('id');
        }
    });

    // Update active nav link styling
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== PAGE LOAD ANIMATIONS ====================
/**
 * Initial Hero Section Animation
 * - Fade in and slide up animation when page loads
 */
window.addEventListener('load', () => {
    // Hero content already has animation in CSS
    // This ensures it runs after DOM is fully loaded
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
});

// ==================== ACCESSIBILITY & PERFORMANCE ====================
/**
 * Disable animations for users who prefer reduced motion
 * - Respects system accessibility preferences
 */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';

    // Disable all animations
    document.querySelectorAll('*').forEach(element => {
        element.style.animation = 'none !important';
        element.style.transition = 'none !important';
    });
}

// ==================== UTILITY FUNCTION: DEBOUNCE ====================
/**
 * Debounce Function
 * - Prevents multiple rapid function calls
 * - Used for scroll and resize events to improve performance
 */
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// ==================== RESPONSIVE NAVBAR FOR MOBILE ====================
/**
 * Mobile Navigation Enhancement
 * - Can be expanded for hamburger menu functionality
 * - Currently handles responsive sizing via CSS media queries
 */
window.addEventListener('resize', debounce(() => {
    // Handle any dynamic responsive adjustments here if needed
}, 250));
// ==================== MAP INITIALIZATION ====================
/**
 * Initialize Leaflet Map
 * - Sets up the map with the Vienna café location
 * - Adds a custom marker
 * - Displays café information in popup
 */
function initializeMap() {
    // Café coordinates (Koramangala, Bengaluru)
    const cafeLocation = [12.9410472, 77.6241113];
    const cafeAddress = '435, 18th Main Rd, Koramangala, Bengaluru, Karnataka 560095';

    // Create map instance
    const map = L.map('map-container').setView(cafeLocation, 15);

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
        tileSize: 256,
    }).addTo(map);

    // Create custom marker
    const markerIcon = L.divIcon({
        className: 'custom-marker',
        html: `
            <div style="
                width: 40px;
                height: 40px;
                background-color: #d4af86;
                border: 3px solid #8b7355;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            ">
                ☕
            </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20]
    });

    // Add marker to map
    const marker = L.marker(cafeLocation, { icon: markerIcon })
        .addTo(map)
        .bindPopup(`
            <div style="font-family: 'Poppins', sans-serif;">
                <h4 style="margin: 0 0 8px 0; color: #5c4a42; font-size: 16px;">Vienna Kitchen & Bakehouse</h4>
                <p style="margin: 0 0 8px 0; color: #8b7355; font-size: 13px;">
                    ${cafeAddress}
                </p>
                <p style="margin: 0; color: #8b7355; font-size: 13px;">
                    <strong>Hours:</strong> 9:00 AM - 11:30 PM
                </p>
            </div>
        `, {
            maxWidth: 250,
            className: 'cafe-popup'
        });

    // Open popup by default
    marker.openPopup();
}

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeMap);
// ==================== CONSOLE MESSAGE ====================
console.log('🍰 Vienna Kitchen & Bakehouse - Premium Café Website Loaded Successfully ✨');
