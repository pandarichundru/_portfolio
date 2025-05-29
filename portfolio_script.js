document.addEventListener('DOMContentLoaded', () => {
    // --- SMOOTH SCROLL FOR NAV LINKS (DESKTOP AND MOBILE) ---
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }

            if (this.classList.contains('mobile-nav-link')) {
                const mobileMenu = document.getElementById('apple-mobile-menu');
                const menuBtn = document.getElementById('apple-menu-btn');
                mobileMenu.classList.remove('open');
                mobileMenu.classList.add('translate-x-full');
                menuBtn.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // --- APPLE-LIKE MOBILE MENU TOGGLE ---
    const menuBtn = document.getElementById('apple-menu-btn');
    const mobileMenu = document.getElementById('apple-mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('open');
            mobileMenu.classList.toggle('translate-x-full');

            if (mobileMenu.classList.contains('open')) {
                document.body.classList.add('menu-open');
            } else {
                document.body.classList.remove('menu-open');
            }
        });
    }

    // --- FADE-IN ON SCROLL ---
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const fadeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    fadeInElements.forEach(el => fadeObserver.observe(el));

    // --- NAVBAR "ON LOAD" ANIMATION ---
    const portfolioName = document.querySelector('.navbar a.text-2xl');
    const desktopNavLinks = document.querySelectorAll('.navbar .hidden.md\\:flex .nav-link');

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
    
     fadeInElements.forEach(el => el.classList.add('visible'));
