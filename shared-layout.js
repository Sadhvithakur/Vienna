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
                    <li><a href="/" class="nav-link" data-page="/">Home</a></li>
                    <li><a href="#" class="nav-link" data-page="menu">Menu</a></li>
                    <li><a href="#" class="nav-link" data-page="about">About</a></li>
                    <li><a href="#" class="nav-link" data-page="gallery">Gallery</a></li>
                    <li><a href="#" class="nav-link" data-page="events">Events</a></li>
                    <li><a href="#" class="nav-link" data-page="contact">Contact</a></li>
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

// Initialize hamburger menu functionality
function initializeHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
        });

        // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }
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
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const dataPage = link.getAttribute('data-page');

        if (dataPage === '/' || dataPage === 'home') {
            // Home link: always navigate to homepage
            link.href = '/';
        } else if (currentPage === 'home') {
            // On homepage: use smooth scroll with anchor
            link.href = '#' + dataPage;
        } else if (dataPage === currentPage) {
            // On same page: scroll to section with anchor
            link.href = '#' + dataPage;
        } else {
            // On different page: navigate to page
            link.href = '/' + dataPage + '.html';
        }
    });
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

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    injectHeader();
    injectFooter();
    initializeSmoothScroll();
});
