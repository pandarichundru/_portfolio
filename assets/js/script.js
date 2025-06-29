// Simple Landing Page Script
class SimpleLanding {
  constructor() {
    this.init();
  }

  init() {
    this.setupButtonAnimation();
  }

  setupButtonAnimation() {
    const btn = document.getElementById('get-started-btn');
    
    if (!btn) return;

    // Show button after SVG animation
    setTimeout(() => {
      btn.classList.remove('hidden');
      btn.classList.add('visible');
    }, 5200);

    // Navigate to portfolio
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'portfolio.html';
    });

    // Keyboard support
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.location.href = 'portfolio.html';
      }
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SimpleLanding();
});