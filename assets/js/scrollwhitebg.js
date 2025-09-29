const header = document.querySelector('.site-header');
    const hero = document.querySelector('.hero');
    const sideMenu = document.getElementById("side-menu");
    const menuToggles = document.querySelectorAll(".menu-toggle");
    const menuClose = document.getElementById("menu-close");

    let lastScrollY = window.scrollY;

    // Scroll behavior
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      // Show header only after leaving hero section
      if (currentScroll > hero.offsetHeight / 8) {
        header.classList.add('visible');
      } else {
        header.classList.remove('visible');
      }

      // Hide on scroll down, show on scroll up
      if (currentScroll > lastScrollY && currentScroll > hero.offsetHeight) {
        header.classList.add('hide');   // scrolling down
      } else {
        header.classList.remove('hide'); // scrolling up
      }

      lastScrollY = currentScroll;
    });

    // Side menu toggle
    menuToggles.forEach(btn => {
      btn.addEventListener("click", () => {
        sideMenu.classList.add("active");
      });
    });
    menuClose.addEventListener("click", () => {
      sideMenu.classList.remove("active");
    });