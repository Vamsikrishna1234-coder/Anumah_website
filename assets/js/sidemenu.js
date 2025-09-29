const menuToggle = document.querySelector('.menu-toggle');
const sideMenu = document.getElementById('side-menu');
const menuClose = document.getElementById('menu-close');

// Open menu
menuToggle.addEventListener('click', () => {
  sideMenu.classList.add('active');
});

// Close menu
menuClose.addEventListener('click', () => {
  sideMenu.classList.remove('active');
});

// Close menu if click outside
document.addEventListener('click', (e) => {
  if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    sideMenu.classList.remove('active');
  }
});
