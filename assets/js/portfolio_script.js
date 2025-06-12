document.addEventListener('DOMContentLoaded', () => {
  // === SELECTORS ===
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-panel a');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const navBubble = document.querySelector('.nav-bubble');
  const sections = document.querySelectorAll('section[id]');
  const mobileNavPanel = document.getElementById('mobileNavPanel');
  const menuToggleButton = document.querySelector('.menu-toggle-button');

  // === SMOOTH SCROLLING ON CLICK ===
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').substring(1);
      const target = document.getElementById(id);
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: 'smooth'
        });
      }

      // Close mobile menu if open
      if (link.closest('.mobile-nav-panel')) {
        mobileNavPanel.setAttribute('data-visible', 'false');
        menuToggleButton.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-is-open');
      }

      // Update active (click-based)
      setTimeout(() => setActiveLink(id), 100);
    });
  });

  // === MOVE BUBBLE UNDER ACTIVE NAV LINK ===
  function moveBubbleTo(link) {
    if (!link || !navBubble) return;
    const rect = link.getBoundingClientRect();
    const parentRect = link.parentElement.getBoundingClientRect();
    navBubble.style.width = `${rect.width}px`;
    navBubble.style.left = `${rect.left - parentRect.left}px`;
  }

  // === SET ACTIVE LINK + BOUNCE + BUBBLE ===
  function setActiveLink(id) {
    desktopNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${id}`) {
        link.classList.add('active');
        link.classList.add('bounce');
        setTimeout(() => link.classList.remove('bounce'), 400);
        moveBubbleTo(link);
      }
    });
  }

  // === OBSERVE SCROLL TO UPDATE NAV ===
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        setActiveLink(id);
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => sectionObserver.observe(section));
  window.addEventListener('resize', () => {
    const active = document.querySelector('.desktop-nav .nav-link.active');
    if (active) moveBubbleTo(active);
  });
  moveBubbleTo(document.querySelector('.desktop-nav .nav-link.active'));

  // === FADE-IN ON SCROLL ===
  const fadeInElements = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  fadeInElements.forEach(el => fadeObserver.observe(el));

  // === MOBILE MENU TOGGLE ===
  if (menuToggleButton && mobileNavPanel) {
    menuToggleButton.addEventListener('click', () => {
      const isVisible = mobileNavPanel.getAttribute('data-visible') === 'true';
      mobileNavPanel.setAttribute('data-visible', !isVisible);
      menuToggleButton.setAttribute('aria-expanded', !isVisible);
      document.body.classList.toggle('menu-is-open', !isVisible);
    });
  }

  // === NAVBAR ON LOAD ANIMATION ===
  const portfolioName = document.querySelector('.site-title');
  if (portfolioName) {
    portfolioName.style.opacity = '0';
    portfolioName.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      portfolioName.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      portfolioName.style.opacity = '1';
      portfolioName.style.transform = 'translateY(0)';
    }, 100);
  }

  desktopNavLinks.forEach((link, i) => {
    link.style.opacity = '0';
    link.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      link.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
      link.style.opacity = '1';
      link.style.transform = 'translateY(0)';
    }, 200 + i * 80);
  });

  // === LIVE DATE & TIME ===
  function updateDateTime() {
    const now = new Date();
    const options = {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    const formatted = now.toLocaleString('en-US', options);
    const datetimeElement = document.getElementById('datetime');
    if (datetimeElement) {
      datetimeElement.textContent = formatted;
    }
  }
  updateDateTime();
  setInterval(updateDateTime, 1000);

  // === FOUNTAIN ANIMATION ===
  const lines = document.querySelectorAll('.merge-wave .line');
  const totalLines = lines.length;
  if (totalLines) {
    function runFountainAnimation() {
      const fallStagger = 100;
      const riseStagger = 100;
      const transitionDuration = 1500;

      lines.forEach((line, index) => {
        setTimeout(() => line.classList.add('fallen'), index * fallStagger);
      });

      const riseDelay = (totalLines * fallStagger) + transitionDuration;
      lines.forEach((line, index) => {
        setTimeout(() => line.classList.remove('fallen'), riseDelay + index * riseStagger);
      });

      const cycleDuration = riseDelay + (totalLines * riseStagger) + transitionDuration + 1000;
      setTimeout(runFountainAnimation, cycleDuration);
    }

    runFountainAnimation();
  }
});
