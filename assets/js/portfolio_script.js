document.addEventListener('DOMContentLoaded', () => {
    // --- SMOOTH SCROLL FOR NAV LINKS (DESKTOP AND MOBILE) ---
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }

            // If it's a mobile link, close the menu
            // Note: The IDs 'apple-mobile-menu' and 'apple-menu-btn'
            // are not present in your current HTML.
            // Using the correct IDs from your HTML: 'mobileNavPanel' and 'menu-toggle-button'.
            if (this.closest('.mobile-nav-panel')) { // Check if the link is inside the mobile nav panel
                const mobileMenu = document.getElementById('mobileNavPanel');
                const menuBtn = document.querySelector('.menu-toggle-button');

                if (mobileMenu && menuBtn) {
                    mobileMenu.setAttribute('data-visible', 'false');
                    menuBtn.setAttribute('aria-expanded', 'false');
                    document.body.classList.remove('menu-is-open');
                }
            }
        });
    });

    // --- FADE-IN ON SCROLL ---
    // The query selector now correctly targets all elements with the 'fade-in' class,
    // including the sections themselves, skill cards, project cards, etc.
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    }; // Start animation when 10% is visible

    const fadeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if animation should only run once
                // fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => fadeObserver.observe(el));


    // --- NAVBAR "ON LOAD" ANIMATION ---
    // The selector for the portfolio name was empty in your HTML,
    // assuming you want to animate the '.site-title' in the header.
    const portfolioName = document.querySelector('.site-title'); // Corrected selector
    const desktopNavLinks = document.querySelectorAll('.navbar .nav-link'); // No change here

    // Ensure elements exist before trying to style them
    if (portfolioName) {
        portfolioName.style.opacity = '0';
        portfolioName.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            portfolioName.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            portfolioName.style.opacity = '1';
            portfolioName.style.transform = 'translateY(0)';
        }, 100); // Delay before animation starts
    }

    desktopNavLinks.forEach((link, i) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            link.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
            // Add 'active' class to the 'Home' link on load if it's the default active one
            if (link.getAttribute('href') === '#home') {
                link.classList.add('active');
            }
        }, 200 + i * 80); // Staggered delay
    });

    // --- SYMMETRICAL FOUNTAIN ANIMATION ---
    const lines = document.querySelectorAll('.merge-wave .line');
    const totalLines = lines.length;

    // If lines don't exist, stop the script
    if (!lines.length) return;

    function runFountainAnimation() {
        const fallStagger = 100; // ms between each line falling
        const riseStagger = 100; // ms between each line rising
        const transitionDuration = 1200; // Must match the CSS transition duration in ms

        // 1. Make all lines fall down
        lines.forEach((line, index) => {
            setTimeout(() => {
                line.classList.add('fallen');
            }, index * fallStagger);
        });

        // 2. Make all lines rise back up
        const riseDelay = (totalLines * fallStagger) + transitionDuration;
        lines.forEach((line, index) => {
            setTimeout(() => {
                line.classList.remove('fallen');
            }, riseDelay + (index * riseStagger));
        });

        // 3. Loop the animation
        const cycleDuration = riseDelay + (totalLines * riseStagger) + transitionDuration + 1000; // +1s pause
        setTimeout(runFountainAnimation, cycleDuration);
    }

    // Start the first run of the animation
    runFountainAnimation();
});

// --- MOBILE MENU TOGGLE ---
const menuToggleButton = document.querySelector('.menu-toggle-button');
const mobileNavPanel = document.getElementById('mobileNavPanel');

if (menuToggleButton && mobileNavPanel) {
    menuToggleButton.addEventListener('click', () => {
        const isVisible = mobileNavPanel.getAttribute('data-visible') === 'true';
        menuToggleButton.setAttribute('aria-expanded', !isVisible);
        mobileNavPanel.setAttribute('data-visible', !isVisible);
        document.body.classList.toggle('menu-is-open', !isVisible);
    });

    const mobileNavLinks = mobileNavPanel.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (link.getAttribute('href').startsWith('#')) {
                menuToggleButton.setAttribute('aria-expanded', 'false');
                mobileNavPanel.setAttribute('data-visible', 'false');
                document.body.classList.remove('menu-is-open');
            }
        });
    });
}

// --- LIVE DATE AND TIME ---
function updateDateTime() {
    const now = new Date();
    // Use 'en-IN' for India locale if you prefer, or 'en-US' as before.
    // 'Asia/Kolkata' is the IANA timezone name for IST.
    const options = {
        weekday: 'short', // e.g., Mon
        month: 'short', // e.g., Jun
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, // Enable 12-hour format with AM/PM
        timeZone: 'Asia/Kolkata' // Set timezone to IST
    };
    const formatted = now.toLocaleString('en-US', options); // Using en-US for consistent format regardless of locale
    const datetimeElement = document.getElementById('datetime');
    if (datetimeElement) {
        datetimeElement.textContent = formatted;
    }
}

// Initial call and interval update
updateDateTime();
setInterval(updateDateTime, 1000);

// --- PROJECT IMAGE SCROLL OBSERVER ---
// Based on your provided HTML, there are no elements with classes 'text-block' or ID 'project-image'.
// This section of JS code will not have any effect unless those elements are added to your HTML.
// If you intend to implement a scroll-driven image change, you'll need to add the corresponding HTML structure.
const blocks = document.querySelectorAll('.text-block'); // This will likely be empty based on your HTML
const image = document.getElementById('project-image'); // This will likely be null based on your HTML

if (blocks.length && image) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                blocks.forEach(b => b.classList.remove('active'));
                entry.target.classList.add('active');

                const imgSrc = entry.target.dataset.img;
                if (imgSrc && image.src !== imgSrc) {
                    image.src = imgSrc;
                }
            }
        });
    }, {
        threshold: 0.5, // lower threshold to support smaller viewports
        rootMargin: '0px 0px -30% 0px' // helps fire earlier
    });

    blocks.forEach(block => observer.observe(block));
}

// --- Dynamic Active Nav Link on Scroll ---
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    let currentActive = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Offset for fixed header
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentActive = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentActive)) {
            link.classList.add('active');
        }
    });
}

// Add event listener for scroll to update active link
window.addEventListener('scroll', activateNavLink);
// Call it once on load to set the initial active link
window.addEventListener('load', activateNavLink);
