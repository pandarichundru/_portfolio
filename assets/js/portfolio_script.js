// Enhanced Portfolio Script with Performance Optimizations
class PortfolioEnhancer {
    constructor() {
        this.init();
        this.setupPerformanceOptimizations();
        this.setupAdvancedAnimations();
        this.setupInteractiveElements();
    }

    init() {
        this.setupSmoothScroll();
        this.setupFadeInAnimations();
        this.setupNavbarAnimations();
        this.setupMobileMenu();
        this.setupDateTime();
        this.setupActiveNavLinks();
        this.setupFountainAnimation();
        this.setupScrollEffects();
        this.setupParallaxEffects();
        this.setupTypewriterEffect();
        this.setupCursorEffects();
    }

    setupPerformanceOptimizations() {
        // Intersection Observer for better performance
        this.observerOptions = {
            root: null,
            rootMargin: '50px',
            threshold: [0.1, 0.5, 0.9]
        };

        // Throttle scroll events
        this.throttle = (func, limit) => {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            }
        };

        // Debounce resize events
        this.debounce = (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        };
    }

    setupSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        navLinks.forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    // Enhanced smooth scroll with easing
                    const startPosition = window.pageYOffset;
                    const targetPosition = targetSection.offsetTop - 80;
                    const distance = targetPosition - startPosition;
                    const duration = 1000;
                    let start = null;

                    const easeInOutCubic = (t) => {
                        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                    };

                    const animation = (currentTime) => {
                        if (start === null) start = currentTime;
                        const timeElapsed = currentTime - start;
                        const progress = Math.min(timeElapsed / duration, 1);
                        const ease = easeInOutCubic(progress);
                        
                        window.scrollTo(0, startPosition + distance * ease);
                        
                        if (timeElapsed < duration) {
                            requestAnimationFrame(animation);
                        }
                    };

                    requestAnimationFrame(animation);
                }

                // Close mobile menu if applicable
                if (anchor.closest('.mobile-nav-panel')) {
                    this.closeMobileMenu();
                }
            });
        });
    }

    setupFadeInAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
        
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Staggered animation delay
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        
                        // Add additional effects based on element type
                        if (entry.target.classList.contains('skill-card')) {
                            this.animateSkillCard(entry.target);
                        }
                        
                        if (entry.target.classList.contains('project-card-apple')) {
                            this.animateProjectCard(entry.target);
                        }
                    }, index * 100);
                }
            });
        }, this.observerOptions);

        fadeElements.forEach(el => fadeObserver.observe(el));
    }

    setupNavbarAnimations() {
        const navbar = document.querySelector('.navbar');
        const portfolioName = document.querySelector('.site-title');
        const desktopNavLinks = document.querySelectorAll('.navbar .nav-link');

        // Enhanced navbar scroll effect
        const handleScroll = this.throttle(() => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, 10);

        window.addEventListener('scroll', handleScroll);

        // Animate navbar elements on load
        if (portfolioName) {
            this.animateElement(portfolioName, 'fadeInDown', 100);
        }

        desktopNavLinks.forEach((link, i) => {
            this.animateElement(link, 'fadeInDown', 200 + i * 80);
            
            // Add active state on load
            if (link.getAttribute('href') === '#home') {
                link.classList.add('active');
            }
        });
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

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeMobileMenu();
                }
            });

            const mobileNavLinks = mobileNavPanel.querySelectorAll('a');
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (link.getAttribute('href').startsWith('#')) {
                        this.closeMobileMenu();
                    }
                });
            });
        }
    }

    toggleMobileMenu(show) {
        const menuToggleButton = document.querySelector('.menu-toggle-button');
        const mobileNavPanel = document.getElementById('mobileNavPanel');
        
        menuToggleButton.setAttribute('aria-expanded', show);
        mobileNavPanel.setAttribute('data-visible', show);
        document.body.classList.toggle('menu-is-open', show);

        // Animate menu items
        if (show) {
            const menuItems = mobileNavPanel.querySelectorAll('li');
            menuItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'translateX(0)';
                    item.style.opacity = '1';
                }, index * 100);
            });
        }
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
                // Add typing effect to time updates
                if (datetimeElement.textContent !== formatted) {
                    datetimeElement.style.opacity = '0.7';
                    setTimeout(() => {
                        datetimeElement.textContent = formatted;
                        datetimeElement.style.opacity = '1';
                    }, 100);
                }
            }
        };

        updateDateTime();
        setInterval(updateDateTime, 1000);
    }

    setupActiveNavLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

        const activateNavLink = this.throttle(() => {
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
        }, 50);

        window.addEventListener('scroll', activateNavLink);
        window.addEventListener('load', activateNavLink);
    }

    setupFountainAnimation() {
        const lines = document.querySelectorAll('.merge-wave .line');
        const totalLines = lines.length;

        if (!lines.length) return;

        const runFountainAnimation = () => {
            const fallStagger = 80;
            const riseStagger = 80;
            const transitionDuration = 1200;

            // Enhanced falling animation with wave effect
            lines.forEach((line, index) => {
                setTimeout(() => {
                    line.classList.add('fallen');
                    line.style.boxShadow = `0 0 20px rgba(59, 130, 246, ${0.8 - index * 0.05})`;
                }, index * fallStagger);
            });

            // Enhanced rising animation
            const riseDelay = (totalLines * fallStagger) + transitionDuration;
            lines.forEach((line, index) => {
                setTimeout(() => {
                    line.classList.remove('fallen');
                    line.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
                }, riseDelay + (index * riseStagger));
            });

            const cycleDuration = riseDelay + (totalLines * riseStagger) + transitionDuration + 2000;
            setTimeout(runFountainAnimation, cycleDuration);
        };

        runFountainAnimation();
    }

    setupScrollEffects() {
        // Parallax scrolling for hero section
        const hero = document.querySelector('.hero-section');
        
        const handleParallax = this.throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        }, 10);

        window.addEventListener('scroll', handleParallax);

        // Scroll progress indicator
        this.createScrollProgress();
    }

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.project-image-apple');
        
        const handleParallax = this.throttle(() => {
            parallaxElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const speed = 0.1;
                const yPos = -(rect.top * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, 16);

        window.addEventListener('scroll', handleParallax);
    }

    setupTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('[data-typewriter]');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.borderRight = '2px solid';
            element.style.animation = 'blink 1s infinite';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    element.style.borderRight = 'none';
                    element.style.animation = 'none';
                }
            };
            
            // Start typing when element is visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(typeWriter, 500);
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(element);
        });
    }

    setupCursorEffects() {
        // Custom cursor for interactive elements
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(59, 130, 246, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            display: none;
        `;
        document.body.appendChild(cursor);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.display = 'block';
        });

        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .card-base');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.background = 'rgba(59, 130, 246, 0.8)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'rgba(59, 130, 246, 0.5)';
            });
        });
    }

    setupAdvancedAnimations() {
        // Magnetic effect for buttons
        const magneticElements = document.querySelectorAll('.hero-buttons-container a, .contact__form .button');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });

        // Floating animation for skill icons
        const skillIcons = document.querySelectorAll('.skill-card .text-5xl');
        skillIcons.forEach((icon, index) => {
            icon.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
        });

        // Add floating keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
            
            @keyframes blink {
                0%, 50% { border-color: transparent; }
                51%, 100% { border-color: currentColor; }
            }
        `;
        document.head.appendChild(style);
    }

    setupInteractiveElements() {
        // Enhanced form validation
        const form = document.querySelector('.contact__form');
        if (form) {
            const inputs = form.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    input.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        input.parentElement.classList.remove('focused');
                    }
                });
                
                input.addEventListener('input', () => {
                    this.validateField(input);
                });
            });
            
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        }

        // Enhanced social media hover effects
        const socialIcons = document.querySelectorAll('.social-icon');
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.style.filter = 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.filter = 'none';
            });
        });
    }

    createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #3b82f6, #1d4ed8);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        const updateProgress = this.throttle(() => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        }, 10);

        window.addEventListener('scroll', updateProgress);
    }

    animateElement(element, animation, delay = 0) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, delay);
    }

    animateSkillCard(card) {
        const icon = card.querySelector('.text-5xl');
        if (icon) {
            setTimeout(() => {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }, 300);
            }, 200);
        }
    }

    animateProjectCard(card) {
        const image = card.querySelector('.project-image-apple');
        if (image) {
            setTimeout(() => {
                image.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    image.style.transform = 'scale(1)';
                }, 500);
            }, 300);
        }
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        
        if (type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        } else if (field.required) {
            isValid = value.length > 0;
        }
        
        field.style.borderColor = isValid ? '#10b981' : '#ef4444';
        return isValid;
    }

    handleFormSubmit(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (isFormValid) {
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                submitButton.textContent = 'Message Sent!';
                submitButton.style.background = '#10b981';
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = '';
                    form.reset();
                }, 2000);
            }, 1000);
        }
    }
}

// Initialize enhanced portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioEnhancer();
});

// Add CSS for enhanced animations
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    .custom-cursor {
        mix-blend-mode: difference;
    }
    
    .focused {
        transform: translateY(-2px);
    }
    
    @media (prefers-reduced-motion: reduce) {
        .custom-cursor {
            display: none !important;
        }
    }
`;
document.head.appendChild(enhancedStyles);