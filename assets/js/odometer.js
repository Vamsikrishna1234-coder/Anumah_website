document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".milestone-card h3"); // target h3
  let started = false; // prevent multiple triggers

  function animateCounter(counter) {
    // Extract numeric part only
    const text = counter.textContent.replace(/[^\d]/g, "");
    const target = +text;
    const duration = 2000;
    const increment = target / (duration / 16);

    let value = 0;
    function update() {
      value += increment;
      if (value < target) {
        counter.textContent = Math.floor(value) + counter.textContent.replace(/\d/g, ''); // preserve suffix like '+'
        requestAnimationFrame(update);
      } else {
        counter.textContent = target + counter.textContent.replace(/\d/g, '');
      }
    }
    update();
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        counters.forEach(counter => animateCounter(counter));
        started = true;
      }
    });
  }, { threshold: 0.3 });

  observer.observe(document.querySelector(".milestones-grid")); // observe the container
});
