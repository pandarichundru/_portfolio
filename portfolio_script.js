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

    // -- GITHUB CONTRIBUTION GRAPH ---
    const GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';
    const GITHUB_TOKEN = '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'; // CHANGE THIS: Replace with your new token
    const USERNAME = 'pandarichundru'; // CHANGE THIS: Replace with your GitHub username if different

    async function fetchContributions() {
        const query = `
            query {
                user(login: "${USERNAME}") {
                    contributionsCollection {
                        contributionCalendar {
                            totalContributions
                            weeks {
                                contributionDays {
                                    date
                                    contributionCount
                                }
                            }
                        }
                    }
                }
            }
        `;

        const response = await fetch(GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) throw new Error('Failed to fetch contributions');
        const data = await response.json();
        return data.data.user.contributionsCollection.contributionCalendar;
    }

    function renderContributionGraph(calendar) {
        const graphContainer = document.getElementById('contribution-graph');
        const weeks = calendar.weeks;
        let html = '<div class="contribution-calendar">';

        weeks.forEach(week => {
            week.contributionDays.forEach(day => {
                const count = day.contributionCount;
                let level = 'empty';
                if (count > 0) level = count > 20 ? 'level-4' : count > 10 ? 'level-3' : count > 5 ? 'level-2' : 'level-1';
                html += `<div class="contrib-cell ${level}" title="${day.date}: ${count} contributions"></div>`;
            });
        });

        html += '</div>';
        graphContainer.innerHTML = html;
    }

    // Fetch and render
    fetchContributions()
        .then(calendar => renderContributionGraph(calendar))
        .catch(error => {
            console.error('Error loading contributions:', error);
            document.getElementById('contribution-graph').innerHTML = '<p>Unable to load GitHub contributions. Please check your internet connection or GitHub token.</p>';
        });
});
