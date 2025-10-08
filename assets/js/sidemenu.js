
const header = document.querySelector('.site-header');
const hero = document.querySelector('.hero');
const sideMenu = document.getElementById("side-menu");
const menuToggles = document.querySelectorAll(".menu-toggle");
const menuClose = document.getElementById("menu-close");

let lastScrollY = window.scrollY;

// Scroll behavior (only if hero exists)
if (header && hero) {
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Show header after hero section
    if (currentScroll > hero.offsetHeight / 8) {
      header.classList.add('visible');
    } else {
      header.classList.remove('visible');
    }

    // Hide on scroll down, show on scroll up
    if (currentScroll > lastScrollY && currentScroll > hero.offsetHeight) {
      header.classList.add('hide');
    } else {
      header.classList.remove('hide');
    }

    lastScrollY = currentScroll;
  });
}

// Open menu
if (sideMenu && menuToggles.length > 0) {
  menuToggles.forEach(btn => {
    btn.addEventListener("click", (e) => {
      sideMenu.classList.add("active");
      e.stopPropagation(); // prevent document click from closing immediately
    });
  });
}

// Close menu
if (menuClose && sideMenu) {
  menuClose.addEventListener("click", () => {
    sideMenu.classList.remove("active");
  });
}

// Close menu if click outside
if (sideMenu) {
  document.addEventListener('click', (e) => {
    if (!sideMenu.contains(e.target) && ![...menuToggles].some(btn => btn.contains(e.target))) {
      sideMenu.classList.remove("active");
    }
  });
}

