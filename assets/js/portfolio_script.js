document.addEventListener('DOMContentLoaded', () => {
  // --- SMOOTH SCROLL FOR NAV LINKS (DESKTOP AND MOBILE) ---
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-panel a');
  navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = targetId === 'home' ? document.body : document.getElementById(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection === document.body ? 0 : targetSection.offsetTop,
          behavior: 'smooth'
        });
      }
      const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');

          // --- Add bounce effect ---
          link.style.animation = 'bounce-click 0.4s ease';
          link.addEventListener('animationend', () => {
            link.style.animation = '';
          }, { once: true });
        }
      });
      moveBubbleToActiveLink();
    }
  });
}, {
  threshold: 0.6
});

      // Update active class for desktop nav links
      if (this.classList.contains('nav-link')) {
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
      }

      // If it's a mobile link, close the menu
      if (this.closest('.mobile-nav-panel')) {
        const mobileMenu = document.getElementById('mobileNavPanel');
        const menuBtn = document.querySelector('.menu-toggle-button');
        mobileMenu.setAttribute('data-visible', 'false');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-is-open');
      }
    });
  });

  // --- FADE-IN ON SCROLL ---
  const fadeInElements = document.querySelectorAll('.fade-in');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  fadeInElements.forEach(el => fadeObserver.observe(el));

  // --- NAVBAR "ON LOAD" ANIMATION ---
  const portfolioName = document.querySelector('.site-title');
  const desktopNavLinks = document.querySelectorAll('.navbar .nav-link');

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

  // --- ACTIVE NAV LINK ON SCROLL ---
  const sections = document.querySelectorAll('section, body[id="home"]');
  const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      if (id) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    }
  });
}, { threshold: 0.6 }); // Activates when 60% of the section is visible
  // --- SYMMETRICAL FOUNTAIN ANIMATION ---
  const lines = document.querySelectorAll('.merge-wave .line');
  const totalLines = lines.length;

  if (lines.length) {
    function runFountainAnimation() {
      const fallStagger = 100;
      const riseStagger = 100;
      const transitionDuration = 1500;

      lines.forEach((line, index) => {
        setTimeout(() => {
          line.classList.add('fallen');
        }, index * fallStagger);
      });

      const riseDelay = (totalLines * fallStagger) + transitionDuration;
      lines.forEach((line, index) => {
        setTimeout(() => {
          line.classList.remove('fallen');
        }, riseDelay + (index * riseStagger));
      });

      const cycleDuration = riseDelay + (totalLines * riseStagger) + transitionDuration + 1000;
      setTimeout(runFountainAnimation, cycleDuration);
    }

    runFountainAnimation();
  }

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
});
