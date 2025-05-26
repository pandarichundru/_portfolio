document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('get-started-btn');
  // const container = document.getElementById('hello-container'); // GSAP animation is removed for this element

  // Show button after 5 seconds (adjust timing to match your SVG animation completion)
  setTimeout(() => {
    btn.classList.remove('hidden');
    btn.classList.add('visible');
  }, 5200); // Slightly after the 5s animation

  btn.addEventListener('click', () => {
    // Navigate to your main portfolio page
    window.location.href = 'portfolio.html';
  });
});
