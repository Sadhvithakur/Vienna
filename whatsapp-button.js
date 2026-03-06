/**
 * Premium WhatsApp Button - Interactive Script
 * Vienna Bakehouse & Kitchen
 * 
 * Behavior:
 * - Desktop: Hover to expand (CSS) + Click to open
 * - Mobile/Tablet: Tap to expand, second tap to open
 * - Click outside: Close expand
 * - Escape key: Close expand
 */

(function () {
    'use strict';

    const button = document.getElementById('whatsapp-button');
    if (!button) return;

    let isExpanded = false;
    let lastClickTime = 0;
    const clickDebounce = 100; // ms

    /**
     * Check if device supports hover (desktop-like behavior)
     */
    function supportsHover() {
        return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    }

    /**
     * Check if device is touch-enabled
     */
    function isTouchDevice() {
        return (
            ('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0)
        );
    }

    /**
     * Open/Expand the button
     */
    function openButton() {
        button.classList.add('expanded');
        isExpanded = true;
    }

    /**
     * Close/Collapse the button
     */
    function closeButton() {
        button.classList.remove('expanded');
        isExpanded = false;
    }

    /**
     * Handle click event
     */
    button.addEventListener('click', function (e) {
        const now = Date.now();
        
        // Debounce rapid clicks
        if (now - lastClickTime < clickDebounce) {
            return;
        }
        lastClickTime = now;

        // On touch devices (no hover support)
        if (!supportsHover()) {
            if (!isExpanded) {
                e.preventDefault();
                e.stopPropagation();
                openButton();
                return;
            }
            // If already expanded, allow link navigation
        }
        // On desktop, always allow navigation (href will open link)
    });

    /**
     * Close when clicking/tapping outside
     */
    document.addEventListener('click', function (e) {
        if (isExpanded && !button.contains(e.target)) {
            closeButton();
        }
    });

    /**
     * Close on Escape key (accessibility)
     */
    document.addEventListener('keydown', function (e) {
        if ((e.key === 'Escape' || e.keyCode === 27) && isExpanded) {
            e.preventDefault();
            closeButton();
            button.focus();
        }
    });

    /**
     * Handle touch events for mobile reliability
     */
    button.addEventListener('touchstart', function(e) {
        // Mark button as touched for better mobile UX
        button.style.opacity = '0.8';
    }, false);

    button.addEventListener('touchend', function(e) {
        // Reset opacity
        button.style.opacity = '1';
    }, false);

})();
