// Enhanced Landing Page Script with Performance Optimizations
class LandingPageEnhancer {
  constructor() {
    this.init();
    this.setupPerformanceOptimizations();
    this.setupAdvancedAnimations();
    this.setupInteractiveEffects();
  }

  init() {
    this.setupButtonAnimation();
    this.setupSVGEnhancements();
    this.setupBackgroundEffects();
    this.setupAccessibility();
    this.setupAnalytics();
  }

  setupPerformanceOptimizations() {
    // Preload critical resources
    this.preloadResources();
    
    // Optimize animations with requestAnimationFrame
    this.animationFrame = null;
    
    // Throttle resize events
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

    // Setup resize handler
    window.addEventListener('resize', this.throttle(this.handleResize.bind(this), 250));
  }

  preloadResources() {
    // Preload portfolio page
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = 'portfolio.html';
    document.head.appendChild(link);

    // Preload critical CSS
    const cssLink = document.createElement('link');
    cssLink.rel = 'preload';
    cssLink.href = 'assets/css/portfolio_styles.css';
    cssLink.as = 'style';
    document.head.appendChild(cssLink);
  }

  setupButtonAnimation() {
    const btn = document.getElementById('get-started-btn');
    
    if (!btn) return;

    // Enhanced button reveal animation
    const revealButton = () => {
      btn.classList.remove('hidden');
      btn.classList.add('visible');
      
      // Add floating animation
      setTimeout(() => {
        btn.classList.add('floating');
      }, 500);
    };

    // Show button after SVG animation with enhanced timing
    setTimeout(revealButton, 5200);

    // Enhanced click handler with smooth transition
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      this.navigateToPortfolio(btn);
    });

    // Add keyboard support
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.navigateToPortfolio(btn);
      }
    });

    // Enhanced hover effects
    this.setupButtonHoverEffects(btn);
  }

  setupButtonHoverEffects(btn) {
    let hoverTimeout;

    btn.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout);
      btn.style.transform = 'translateY(-4px) scale(1.05)';
      
      // Add ripple effect
      this.createRippleEffect(btn);
    });

    btn.addEventListener('mouseleave', () => {
      hoverTimeout = setTimeout(() => {
        btn.style.transform = 'translateY(0) scale(1)';
      }, 100);
    });

    // Touch support for mobile
    btn.addEventListener('touchstart', () => {
      btn.style.transform = 'translateY(-2px) scale(1.02)';
    });

    btn.addEventListener('touchend', () => {
      setTimeout(() => {
        btn.style.transform = 'translateY(0) scale(1)';
      }, 150);
    });
  }

  createRippleEffect(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple 0.6s linear;
      width: ${size}px;
      height: ${size}px;
      left: 50%;
      top: 50%;
      margin-left: ${-size / 2}px;
      margin-top: ${-size / 2}px;
      pointer-events: none;
    `;

    element.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  navigateToPortfolio(btn) {
    // Add loading state
    const originalText = btn.textContent;
    btn.textContent = 'Loading...';
    btn.disabled = true;
    btn.classList.add('loading');

    // Enhanced page transition
    this.createPageTransition(() => {
      window.location.href = 'portfolio.html';
    });

    // Fallback navigation
    setTimeout(() => {
      window.location.href = 'portfolio.html';
    }, 1000);
  }

  createPageTransition(callback) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #000, #1a1a1a);
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.5s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
      font-weight: 600;
    `;

    overlay.innerHTML = `
      <div style="text-align: center;">
        <div style="width: 50px; height: 50px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
        <div>Loading Portfolio...</div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Trigger transition
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
    });

    setTimeout(callback, 500);
  }

  setupSVGEnhancements() {
    const svg = document.querySelector('.hello-svg');
    if (!svg) return;

    // Add glow effect during animation
    svg.classList.add('glow');

    // Enhanced SVG animation completion handler
    svg.addEventListener('animationend', () => {
      svg.classList.remove('glow');
      this.addSVGInteractivity(svg);
    });

    // Add loading optimization
    svg.style.willChange = 'stroke-dashoffset';
  }

  addSVGInteractivity(svg) {
    let isHovering = false;

    svg.addEventListener('mouseenter', () => {
      if (!isHovering) {
        isHovering = true;
        svg.style.filter = 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.5))';
        svg.style.transform = 'scale(1.02)';
      }
    });

    svg.addEventListener('mouseleave', () => {
      isHovering = false;
      svg.style.filter = 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))';
      svg.style.transform = 'scale(1)';
    });

    // Add click interaction
    svg.addEventListener('click', () => {
      this.createSVGClickEffect(svg);
    });
  }

  createSVGClickEffect(svg) {
    svg.style.animation = 'none';
    svg.style.strokeDasharray = '5800px';
    svg.style.strokeDashoffset = '5800px';
    
    setTimeout(() => {
      svg.style.animation = 'anim__hello linear 2s forwards';
    }, 100);
  }

  setupBackgroundEffects() {
    // Enhanced background with particle system
    this.createParticleSystem();
    
    // Dynamic background color shifting
    this.setupDynamicBackground();
  }

  createParticleSystem() {
    const particleCount = window.innerWidth < 768 ? 20 : 50;
    const container = document.querySelector('.container');
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        pointer-events: none;
        animation: float ${Math.random() * 10 + 10}s linear infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        z-index: 1;
      `;
      
      container.appendChild(particle);
    }
  }

  setupDynamicBackground() {
    let hue = 220;
    
    const updateBackground = () => {
      hue = (hue + 0.5) % 360;
      document.body.style.background = `
        linear-gradient(135deg, 
          hsl(${hue}, 100%, 5%) 0%, 
          hsl(${(hue + 20) % 360}, 50%, 10%) 50%, 
          hsl(${(hue + 40) % 360}, 30%, 15%) 100%)
      `;
      
      this.animationFrame = requestAnimationFrame(updateBackground);
    };

    // Start only if user prefers motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      updateBackground();
    }
  }

  setupAccessibility() {
    // Enhanced keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });

    // Screen reader announcements
    this.setupScreenReaderSupport();
  }

  setupScreenReaderSupport() {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = `
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;
    document.body.appendChild(announcer);

    // Announce when button becomes available
    setTimeout(() => {
      announcer.textContent = 'Portfolio navigation button is now available';
    }, 5200);
  }

  setupAdvancedAnimations() {
    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      .keyboard-navigation *:focus {
        outline: 2px solid #3b82f6 !important;
        outline-offset: 2px !important;
      }
    `;
    document.head.appendChild(style);
  }

  setupInteractiveEffects() {
    // Enhanced cursor effects
    this.setupCustomCursor();
    
    // Touch gesture support
    this.setupTouchGestures();
    
    // Performance monitoring
    this.setupPerformanceMonitoring();
  }

  setupCustomCursor() {
    if (window.innerWidth < 768) return; // Skip on mobile

    const cursor = document.createElement('div');
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: rgba(59, 130, 246, 0.5);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.1s ease;
      mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Cursor interactions
    document.addEventListener('mousedown', () => {
      cursor.style.transform = 'scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
      cursor.style.transform = 'scale(1)';
    });
  }

  setupTouchGestures() {
    let touchStartY = 0;
    
    document.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      
      // Swipe up gesture to navigate
      if (diff > 50) {
        const btn = document.getElementById('get-started-btn');
        if (btn && btn.classList.contains('visible')) {
          this.navigateToPortfolio(btn);
        }
      }
    });
  }

  setupPerformanceMonitoring() {
    // Monitor performance and adjust animations accordingly
    let frameCount = 0;
    let lastTime = performance.now();
    
    const checkPerformance = (currentTime) => {
      frameCount++;
      
      if (currentTime - lastTime >= 1000) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;
        
        // Reduce animations if performance is poor
        if (fps < 30) {
          document.body.classList.add('reduced-motion');
        }
      }
      
      requestAnimationFrame(checkPerformance);
    };
    
    requestAnimationFrame(checkPerformance);
  }

  setupAnalytics() {
    // Track user interactions
    const btn = document.getElementById('get-started-btn');
    
    if (btn) {
      btn.addEventListener('click', () => {
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
          gtag('event', 'click', {
            event_category: 'navigation',
            event_label: 'landing_to_portfolio'
          });
        }
      });
    }

    // Track page visibility
    document.addEventListener('visibilitychange', () => {
      if (typeof gtag !== 'undefined') {
        gtag('event', document.hidden ? 'page_hidden' : 'page_visible', {
          event_category: 'engagement',
          event_label: 'landing_page'
        });
      }
    });
  }

  handleResize() {
    // Adjust particle count based on screen size
    const particles = document.querySelectorAll('.container > div[style*="position: absolute"]');
    const targetCount = window.innerWidth < 768 ? 20 : 50;
    
    if (particles.length !== targetCount) {
      particles.forEach(particle => particle.remove());
      this.createParticleSystem();
    }
  }

  // Cleanup method
  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    
    // Remove event listeners
    window.removeEventListener('resize', this.handleResize);
    
    // Clean up particles
    const particles = document.querySelectorAll('.container > div[style*="position: absolute"]');
    particles.forEach(particle => particle.remove());
  }
}

// Initialize enhanced landing page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new LandingPageEnhancer();
});

// Add enhanced CSS for better performance
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
  .reduced-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  @media (prefers-reduced-motion: reduce) {
    .reduced-motion * {
      animation: none !important;
      transition: none !important;
    }
  }
`;
document.head.appendChild(enhancedStyles);