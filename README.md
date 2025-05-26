# Pandari Chundru - Personal Portfolio Website

This is the repository for Pandari Chundru's personal portfolio website, showcasing skills, projects, experience, and certifications. The website features an initial "hello" animation page leading to the main portfolio content.

**✨ Site Live At: [https://portfolio-indol-psi-14.vercel.app/](https://portfolio-indol-psi-14.vercel.app/) ✨**

## Features

* **Intro Animation Page:** A welcoming "hello" SVG animation before entering the main portfolio.
* **Responsive Design:** Adapts to various screen sizes (desktop, tablet, mobile) using Tailwind CSS.
* **Smooth Scrolling:** Seamless navigation between sections.
* **Interactive UI Elements:**
    * Apple-inspired design cues.
    * Animated navigation bar and mobile menu (hamburger icon).
    * Hover effects on cards, buttons, and social icons.
    * Fade-in animations for content sections on scroll.
* **Dedicated Sections:**
    * **Home:** Hero section with a brief introduction and call-to-action buttons.
    * **About Me:** Detailed professional summary.
    * **Skills:** Categorized list of technical skills with icons.
    * **Projects:** Showcase of key projects with descriptions and links.
    * **Experience:** Professional experience with links to certificates.
    * **Certifications:** List of certifications with links to credentials.
    * **Contact:** Contact information and a functional contact form (powered by Formspree).
* **External Links:** Integrated links to LinkedIn, GitHub, and certificates/badges.

## Technologies Used

* **Frontend:**
    * HTML5
    * CSS3
        * Tailwind CSS (for utility-first styling)
        * Custom CSS (`portfolio_styles.css`, `style.css`)
    * JavaScript (ES6+)
* **Icons:**
    * Boxicons
* **Animations:**
    * CSS Animations (SVG draw-on, fade-in, pulse, etc.)
    * GSAP (GreenSock Animation Platform) - included for potential advanced animations on the intro page.
* **Contact Form Backend:**
    * Formspree.io

## Setup and Usage

1.  **Clone the repository (optional):**
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the project directory.**
3.  **Open `index.html` in your web browser.**
    * This will load the initial "hello" animation page.
    * After the animation completes, a "View Portfolio" button will appear.
    * Clicking this button will navigate you to `portfolio.html`, the main content of the portfolio.

## Customization

### 1. Personal Information:
* Open `portfolio.html` to update your name, bio, titles, contact details, LinkedIn/GitHub links, etc.
* Content for sections like "About Me", "Skills", "Projects", "Experience", and "Certifications" can be directly edited within their respective `<section>` tags in `portfolio.html`.

### 2. Projects & Experience:
* Modify the content within `div` elements with classes like `project-card` and `experience-card`.
* Update links to project details or certificates as needed.

### 3. Skills:
* Edit the `skill-card` sections in `portfolio.html` to reflect your skillset. You can change icons by updating the Boxicons classes (e.g., `<i class='bx bx-code-alt'></i>`).

### 4. Contact Form:
* The contact form in `portfolio.html` uses Formspree.
* To receive messages to your email, replace the `action` URL in the `<form>` tag with your own Formspree endpoint:
    ```html
    <form action="[https://formspree.io/f/YOUR_UNIQUE_FORM_ID](https://formspree.io/f/YOUR_UNIQUE_FORM_ID)" method="POST" class="contact__form ...">
    ```

### 5. CV (Résumé):
* The "Download CV" button in `portfolio.html` currently has `href="#"`. Update this to point to your CV file (e.g., `href="path/to/your_cv.pdf"`). Make sure to include the CV file in the project directory or host it online.

### 6. Intro Animation:
* The "hello" text and animation timings can be adjusted in `index.html` (SVG text) and `style.css` (`@keyframes draw-on`, `@keyframes fill-in`).
* The delay for the "View Portfolio" button appearance is set in `script.js`.

## Credits

* Design inspired by Apple's design principles.
* Icons from [Boxicons](https://boxicons.com/).
* Utility styling with [Tailwind CSS](https://tailwindcss.com/).

---

Feel free to contribute or suggest improvements!
