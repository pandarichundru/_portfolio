// Simple Portfolio Script
class SimplePortfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScroll();
        this.setupFadeInAnimations();
        this.setupMobileMenu();
        this.setupDateTime();
        this.setupActiveNavLinks();
        this.setupFountainAnimation();
    }

    setupSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-panel a');
        navLinks.forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

                // Close mobile menu if open
                if (anchor.closest('.mobile-nav-panel')) {
                    this.closeMobileMenu();
                }
            });
        });
    }

    setupFadeInAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        fadeElements.forEach(el => observer.observe(el));
    }

    setupMobileMenu() {
        const menuToggleButton = document.querySelector('.menu-toggle-button');
        const mobileNavPanel = document.getElementById('mobileNavPanel');

        if (menuToggleButton && mobileNavPanel) {
            menuToggleButton.addEventListener('click', () => {
                const isVisible = mobileNavPanel.getAttribute('data-visible') === 'true';
                this.toggleMobileMenu(!isVisible);
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!menuToggleButton.contains(e.target) && !mobileNavPanel.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
        }
    }

    toggleMobileMenu(show) {
        const menuToggleButton = document.querySelector('.menu-toggle-button');
        const mobileNavPanel = document.getElementById('mobileNavPanel');
        
        menuToggleButton.setAttribute('aria-expanded', show);
        mobileNavPanel.setAttribute('data-visible', show);
    }

    closeMobileMenu() {
        this.toggleMobileMenu(false);
    }

    setupDateTime() {
        const updateDateTime = () => {
            const now = new Date();
            const options = {
                weekday: 'short',
                month: 'short',
                day: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
                timeZone: 'Asia/Kolkata'
            };
            
            const formatted = now.toLocaleString('en-US', options);
            const datetimeElement = document.getElementById('datetime');
            
            if (datetimeElement) {
                datetimeElement.textContent = formatted;
            }
        };

        updateDateTime();
        setInterval(updateDateTime, 1000);
    }

    setupActiveNavLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-panel a');

        const updateActiveLink = () => {
            let currentActive = '';
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
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
        };

        window.addEventListener('scroll', updateActiveLink);
        window.addEventListener('load', updateActiveLink);
    }

    setupFountainAnimation() {
        const lines = document.querySelectorAll('.merge-wave .line');
        const totalLines = lines.length;

        if (!lines.length) return;

        const runFountainAnimation = () => {
            const fallStagger = 100;
            const riseStagger = 100;
            const transitionDuration = 1000;

            // Falling animation
            lines.forEach((line, index) => {
                setTimeout(() => {
                    line.classList.add('fallen');
                }, index * fallStagger);
            });

            // Rising animation
            const riseDelay = (totalLines * fallStagger) + transitionDuration;
            lines.forEach((line, index) => {
                setTimeout(() => {
                    line.classList.remove('fallen');
                }, riseDelay + (index * riseStagger));
            });

            const cycleDuration = riseDelay + (totalLines * riseStagger) + transitionDuration + 2000;
            setTimeout(runFountainAnimation, cycleDuration);
        };

        runFountainAnimation();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SimplePortfolio();
});