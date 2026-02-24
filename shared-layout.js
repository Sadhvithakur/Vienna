/**
 * ==================== SHARED LAYOUT SYSTEM ====================
 * Vienna Bakehouse & Kitchen - Reusable Header and Footer
 * 
 * This system dynamically injects the header and footer on all pages
 * ensuring consistent design and easy maintenance.
 */

// Create header HTML template
function createHeader() {
    return `
        <nav class="navbar">
            <div class="navbar-container">
                <div class="logo">
                    <a href="/" class="logo-link" title="Vienna Bakehouse & Kitchen">
                        <img src="/media/logoo.png" alt="Vienna Bakehouse & Kitchen" class="logo-img">
                    </a>
                </div>
                <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul class="nav-menu" id="navMenu">
                    <li><a href="#home" class="nav-link" data-page="home">Home</a></li>
                    <li><a href="#menu" class="nav-link" data-page="menu">Menu</a></li>
                    <li><a href="#about" class="nav-link" data-page="about">About</a></li>
                    <li><a href="#gallery" class="nav-link" data-page="gallery">Gallery</a></li>
                    <li><a href="#events" class="nav-link" data-page="events">Events</a></li>
                    <li><a href="#contact" class="nav-link" data-page="contact">Contact</a></li>
                </ul>
            </div>
        </nav>
    `;
}

// Create footer HTML template
function createFooter() {
    return `
        <footer class="footer">
            <div class="container">
                <p>&copy; 2026 Vienna Bakehouse & Kitchen - Premium Café & Bakery in Koramangala, Bengaluru (6th Block). All rights reserved. Specialty Coffee | Artisanal Pastries | Open Daily 9 AM - 11:30 PM | <a href="/contact.html" style="color: inherit; text-decoration: underline;">Find us in Koramangala</a></p>
            </div>
        </footer>
    `;
}

// Inject header at the beginning of body
function injectHeader() {
    const body = document.body;
    const header = document.createElement('div');
    header.innerHTML = createHeader();
    body.insertBefore(header.firstElementChild, body.firstChild);

    // Initialize hamburger menu after injection
    initializeHamburgerMenu();
    // Initialize smart navigation after injection
    initializeSmartNavigation();
}

// Inject footer at the end of body
function injectFooter() {
    const body = document.body;
    const footer = document.createElement('div');
    footer.innerHTML = createFooter();
    body.appendChild(footer.firstElementChild);
}

// Initialize hamburger menu functionality - PRODUCTION READY
function initializeHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) return;

    // State management
    let isMenuOpen = false;

    /**
     * Toggle menu open/close state
     */
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        updateMenuState();
    }

    /**
     * Open menu
     */
    function openMenu() {
        if (isMenuOpen) return; // Already open
        isMenuOpen = true;
        updateMenuState();
    }

    /**
     * Close menu
     */
    function closeMenu() {
        if (!isMenuOpen) return; // Already closed
        isMenuOpen = false;
        updateMenuState();
    }

    /**
     * Update DOM and body state based on isMenuOpen
     */
    function updateMenuState() {
        hamburger.classList.toggle('active', isMenuOpen);
        navMenu.classList.toggle('nav-open', isMenuOpen);
        hamburger.setAttribute('aria-expanded', isMenuOpen.toString());

        // Prevent body scroll when menu is open
        if (isMenuOpen) {
            body.classList.add('nav-open');
            // Prevent scroll by capturing wheel and touch events
            disableBodyScroll();
        } else {
            body.classList.remove('nav-open');
            // Re-enable scroll
            enableBodyScroll();
        }
    }

    /**
     * Disable body scroll (works on all devices)
     */
    function disableBodyScroll() {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        body.style.overflow = 'hidden';
        if (scrollbarWidth > 0) {
            body.style.paddingRight = scrollbarWidth + 'px';
        }
    }

    /**
     * Enable body scroll
     */
    function enableBodyScroll() {
        body.style.overflow = '';
        body.style.paddingRight = '';
    }

    /**
     * Close menu on hamburger click
     */
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    /**
     * Close menu when clicking nav links
     */
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Check if this is a hash link (same page)
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                closeMenu();
            }
        });
    });

    /**
     * Close menu when clicking outside
     */
    document.addEventListener('click', (e) => {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        const isClickInsideNav = navbar.contains(e.target);

        if (!isClickInsideNav && isMenuOpen) {
            closeMenu();
        }
    });

    /**
     * Close menu on ESC key
     */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
            hamburger.focus();
        }
    });

    /**
     * Auto-close menu on resize to desktop width
     */
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // If window is now >= 1024px, close mobile menu
            if (window.innerWidth >= 1024) {
                closeMenu();
            }
        }, 150);
    });

    /**
     * Handle smooth scroll for same-page links
     */
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar ? navbar.offsetHeight : 70;
                    const targetPosition = targetElement.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Expose functions globally for debugging/testing
    window.menuAPI = {
        open: openMenu,
        close: closeMenu,
        toggle: toggleMenu,
        isOpen: () => isMenuOpen
    };
}

// Initialize scroll-triggered navbar collapse
function initializeScrollNavigation() {
    const navbar = document.querySelector('.navbar');

    if (!navbar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            // When scrolling down, collapse navbar for design effect
            navbar.classList.add('nav-collapsed');
        } else {
            // At top, expand navbar
            navbar.classList.remove('nav-collapsed');
        }
    }, { passive: true });
}

// Detect current page
function getCurrentPage() {
    const path = window.location.pathname;
    if (path === '/' || path.endsWith('/index.html')) {
        return 'home';
    } else if (path.includes('/about')) {
        return 'about';
    } else if (path.includes('/menu')) {
        return 'menu';
    } else if (path.includes('/gallery')) {
        return 'gallery';
    } else if (path.includes('/events')) {
        return 'events';
    } else if (path.includes('/contact')) {
        return 'contact';
    }
    return 'home';
}

// Initialize smart navigation
function initializeSmartNavigation() {
    // SPA navigation - all links use anchor navigation
    // No need for page-based routing since everything is on one page
}

// Handle smooth scrolling for anchor links on current page
function initializeSmoothScroll() {
    document.addEventListener('click', function (e) {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;

        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Initialize route-based navigation
function initializeRouting() {
    const sections = ['home', 'about', 'menu', 'gallery', 'events', 'contact'];

    // Flag to track if we're handling initial route
    window.isInitialRouteHandled = false;

    // Function to scroll to section
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 80;
            const targetPosition = section.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Check URL on page load and navigate accordingly
    function handleRouteOnLoad() {
        const path = window.location.pathname;

        // Match path to section
        let sectionId = 'home';

        if (path === '/' || path.endsWith('/index.html')) {
            sectionId = 'home';
        } else {
            // Check for each section in the path
            if (path.includes('/home')) sectionId = 'home';
            else if (path.includes('/menu')) sectionId = 'menu';
            else if (path.includes('/about')) sectionId = 'about';
            else if (path.includes('/gallery')) sectionId = 'gallery';
            else if (path.includes('/events')) sectionId = 'events';
            else if (path.includes('/contact')) sectionId = 'contact';
        }

        // Auto-scroll to section after a short delay to ensure DOM is ready
        setTimeout(() => {
            scrollToSection(sectionId);
            window.isInitialRouteHandled = true;
        }, 300);
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.section) {
            scrollToSection(e.state.section);
        }
    });

    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', handleRouteOnLoad);
    } else {
        handleRouteOnLoad();
    }
}

// Update URL when section comes into view
function initializeUrlUpdater() {
    const sections = document.querySelectorAll('section[id]');
    let lastUpdatedUrl = window.location.pathname;
    let updateTimeout;
    let isScrolling = false;

    // Debounced URL update function
    function updateUrlForSection() {
        // Wait for initial routing to complete
        if (!window.isInitialRouteHandled) {
            return;
        }

        clearTimeout(updateTimeout);

        updateTimeout = setTimeout(() => {
            let currentSection = 'home';
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 80;

            // Find which section is currently most visible
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const sectionTop = rect.top;
                const sectionHeight = rect.height;

                // If section's top is in the upper half of viewport
                if (sectionTop <= window.innerHeight / 2) {
                    if (sectionTop + sectionHeight > navbarHeight) {
                        currentSection = section.id;
                    }
                }
            });

            // Update URL if section changed
            const newUrl = currentSection === 'home' ? '/' : '/' + currentSection;

            if (lastUpdatedUrl !== newUrl) {
                window.history.pushState(
                    { section: currentSection },
                    currentSection,
                    newUrl
                );
                lastUpdatedUrl = newUrl;
            }
        }, 150); // Debounce delay
    }

    // Listen to scroll events
    window.addEventListener('scroll', updateUrlForSection, { passive: true });

    // Initial check after delay
    setTimeout(() => {
        updateUrlForSection();
    }, 500);
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    injectHeader();
    injectFooter();
    initializeSmoothScroll();
    initializeRouting();
    initializeUrlUpdater();
    initializeScrollNavigation();
});
