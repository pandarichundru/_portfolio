document.addEventListener('DOMContentLoaded', () => {
  // --- SMOOTH SCROLL FOR NAV LINKS (DESKTOP AND MOBILE) ---
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Adjust for fixed navbar height if necessary
        // const navbarHeight = document.querySelector('.navbar').offsetHeight;
        // const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        // window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }

      // If it's a mobile link, close the menu
      if (this.classList.contains('mobile-nav-link')) {
        const mobileMenu = document.getElementById('apple-mobile-menu');
        const menuBtn = document.getElementById('apple-menu-btn');
        mobileMenu.classList.remove('open');
        mobileMenu.classList.add('translate-x-full'); // Hide menu
        menuBtn.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  });

  // --- FADE-IN ON SCROLL ---
  const fadeInElements = document.querySelectorAll('.fade-in');
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 }; // Start animation when 10% is visible
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: unobserve after animation to save resources
        // fadeObserver.unobserve(entry.target);
      }
      // Optional: to re-trigger animation if scrolling up and then down again
      // else {
      //   entry.target.classList.remove('visible');
      // }
    });
  }, observerOptions);
  fadeInElements.forEach(el => fadeObserver.observe(el));


  // --- NAVBAR "ON LOAD" ANIMATION ---
  const portfolioName = document.querySelector('.navbar a.text-2xl');
  const desktopNavLinks = document.querySelectorAll('.navbar .hidden.md\\:flex .nav-link');

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
    }, 200 + i * 80); // Staggered delay
  });

});

const menuToggleButton = document.querySelector('.menu-toggle-button');
const mobileNavPanel = document.getElementById('mobileNavPanel');

if (menuToggleButton && mobileNavPanel) {
    menuToggleButton.addEventListener('click', () => {
        const isVisible = mobileNavPanel.getAttribute('data-visible') === 'true';
        menuToggleButton.setAttribute('aria-expanded', !isVisible);
        mobileNavPanel.setAttribute('data-visible', !isVisible);
        document.body.classList.toggle('menu-is-open', !isVisible);
    });

    const navLinks = mobileNavPanel.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (link.getAttribute('href').startsWith('#')) {
                menuToggleButton.setAttribute('aria-expanded', 'false');
                mobileNavPanel.setAttribute('data-visible', 'false');
                document.body.classList.remove('menu-is-open');
            }
        });
    });
}
function updateDateTime() {
  const now = new Date();

  const options = {
    weekday: 'short',    // e.g., Mon
    month: 'short',      // e.g., Jun
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true         // Enable 12-hour format with AM/PM
  };

  const formatted = now.toLocaleString('en-US', options);
  const datetimeElement = document.getElementById('datetime');
  if (datetimeElement) {
    datetimeElement.textContent = formatted;
  }
}

// Initial call and interval update
updateDateTime();
setInterval(updateDateTime, 1000);
const blocks = document.querySelectorAll('.text-block');
const image = document.getElementById('project-image');

if (blocks.length && image) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        blocks.forEach(b => b.classList.remove('active'));
        entry.target.classList.add('active');
        const imgSrc = entry.target.dataset.img;
        image.src = imgSrc;
      }
    });
  }, { threshold: 0.6 });

  blocks.forEach(block => observer.observe(block));
}
