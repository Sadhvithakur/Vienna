/**
 * Media Optimization Script
 * Improves image and video loading, playback reliability, and performance
 */

(function () {
    'use strict';

    // ==================== VIDEO OPTIMIZATION ====================
    function optimizeVideos() {
        const videos = document.querySelectorAll('video');

        videos.forEach((video) => {
            // Set up proper attributes for cross-browser compatibility
            if (!video.controls && !video.hasAttribute('controls')) {
                // For autoplay videos without controls
                video.setAttribute('muted', '');
                video.setAttribute('playsinline', '');
            }

            // Add preload attribute if not present
            if (!video.hasAttribute('preload')) {
                video.setAttribute('preload', 'metadata');
            }

            // Add error handling
            video.addEventListener('error', function (e) {
                console.warn('Video playback error:', e);
                // Try to reload video
                const source = video.querySelector('source');
                if (source) {
                    const src = source.src;
                    source.src = '';
                    setTimeout(() => {
                        source.src = src;
                    }, 500);
                }
            });

            // Attempt autoplay with proper fallback
            if (video.hasAttribute('autoplay')) {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise
                        .catch((error) => {
                            // Autoplay was prevented, try again on user interaction
                            console.warn('Autoplay prevented:', error);
                            video.muted = true;
                            video.play().catch(() => {
                                // Video won't play, show poster if available
                                if (video.poster) {
                                    video.style.backgroundImage = `url('${video.poster}')`;
                                }
                            });
                        });
                }
            }

            // Enable lazy loading for videos not in viewport
            if (video.hasAttribute('data-src')) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const source = entry.target.querySelector('source');
                            if (source && source.hasAttribute('data-src')) {
                                source.src = source.getAttribute('data-src');
                                source.removeAttribute('data-src');
                                entry.target.load();
                                observer.unobserve(entry.target);
                            }
                        }
                    });
                }, { rootMargin: '50px' });

                observer.observe(video);
            }
        });
    }

    // ==================== IMAGE OPTIMIZATION ====================
    function optimizeImages() {
        const images = document.querySelectorAll('img');

        images.forEach((img) => {
            // Add lazy loading if not present
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }

            // Add error handling
            img.addEventListener('error', function () {
                console.warn('Image failed to load:', img.src);
                // Try alternative image or placeholder
                if (!img.src.includes('placeholder')) {
                    img.style.backgroundColor = '#f0f0f0';
                }
            });

            // Optimize image sizes for different devices
            // This helps reduce bandwidth but doesn't replace proper srcset
            if (img.parentElement && img.parentElement.classList.contains('gallery-item')) {
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
            }
        });
    }

    // ==================== RESPONSIVE IMAGE LOADING ====================
    function setupResponsiveImageLoading() {
        // Monitor for network speed and adjust image quality accordingly
        if ('connection' in navigator) {
            const connection = navigator.connection;

            function updateImageQuality() {
                const effectiveType = connection.effectiveType;
                const images = document.querySelectorAll('[data-image-sizes]');

                images.forEach((img) => {
                    const sizes = JSON.parse(img.getAttribute('data-image-sizes'));
                    let quality = 'normal';

                    if (effectiveType === '4g') {
                        quality = 'high';
                    } else if (effectiveType === '3g') {
                        quality = 'normal';
                    } else if (effectiveType === '2g' || effectiveType === 'slow-2g') {
                        quality = 'low';
                    }

                    if (sizes[quality]) {
                        img.src = sizes[quality];
                    }
                });
            }

            updateImageQuality();
            connection.addEventListener('change', updateImageQuality);
        }
    }

    // ==================== VIDEO STATS MONITORING ====================
    function monitorVideoPerformance() {
        const videos = document.querySelectorAll('video');

        videos.forEach((video) => {
            // Log buffering issues
            video.addEventListener('progress', () => {
                const buffered = video.buffered;
                const duration = video.duration;

                if (duration && buffered.length > 0) {
                    const bufferedEnd = buffered.end(buffered.length - 1);
                    const percentBuffered = (bufferedEnd / duration) * 100;

                    if (percentBuffered < 20 && video.paused === false) {
                        console.warn('Video buffering...');
                    }
                }
            });

            // Handle stalled state
            video.addEventListener('stalled', () => {
                console.warn('Video playback stalled');
            });

            // Handle suspend
            video.addEventListener('suspend', () => {
                console.warn('Video playback suspended');
            });
        });
    }

    // ==================== BANDWIDTH DETECTION ====================
    function detectBandwidth() {
        if ('getBandwidth' in navigator) {
            // Future: Use bandwidth API when available
        }

        // Fallback: Use connection type
        if ('connection' in navigator) {
            const connection = navigator.connection;
            const effectiveType = connection.effectiveType;
            document.documentElement.setAttribute('data-connection-type', effectiveType);
        }
    }

    // ==================== INITIALIZATION ====================
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                optimizeVideos();
                optimizeImages();
                setupResponsiveImageLoading();
                monitorVideoPerformance();
                detectBandwidth();
            });
        } else {
            optimizeVideos();
            optimizeImages();
            setupResponsiveImageLoading();
            monitorVideoPerformance();
            detectBandwidth();
        }

        // Re-optimize on content changes
        const observer = new MutationObserver((mutations) => {
            let hasNewMedia = false;
            mutations.forEach((mutation) => {
                if (
                    mutation.addedNodes.length > 0 &&
                    (mutation.type === 'childList' || mutation.type === 'subtree')
                ) {
                    hasNewMedia = true;
                }
            });
            if (hasNewMedia) {
                optimizeVideos();
                optimizeImages();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: false,
        });
    }

    // Start optimization
    init();
})();
