document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.carousel-container');
  if (!container) return;
  const track = container.querySelector('.carousel-track');
  const leftBtn = container.querySelector('.carousel-btn.left');
  const rightBtn = container.querySelector('.carousel-btn.right');

  // original slides
  const originals = Array.from(track.children);
  const origCount = originals.length;
  if (origCount === 0) return;

  // clone first and last for seamless loop
  const firstClone = originals[0].cloneNode(true);
  const lastClone  = originals[origCount - 1].cloneNode(true);
  firstClone.classList.add('clone');
  lastClone.classList.add('clone');

  track.appendChild(firstClone);
  track.insertBefore(lastClone, track.firstChild);

  // refreshed slides collection including clones
  let slides = Array.from(track.children);

  let slideWidth = 0;
  let position = 1;           // start at first real slide (because of prepended lastClone)
  const TRANS_MS = 1000;       // transition duration in ms
  const AUTOPLAY_MS = 2600;   // autoplay interval in ms
  let autoId = null;
  let isTransitioning = false;

  function calculateSizesAndJump() {
    slides = Array.from(track.children);
    slideWidth = slides[0].getBoundingClientRect().width;
    // place the track so the visible slide is the current 'position'
    track.style.transition = 'none';
    track.style.transform = `translateX(-${position * slideWidth}px)`;
    // force reflow so next transition works properly
    track.getBoundingClientRect();
    track.style.transition = `transform ${TRANS_MS}ms ease-in-out`;
  }

  // Wait for images and layout to be ready
  window.addEventListener('load', () => {
    calculateSizesAndJump();
    startAuto();
  });

  // Recalculate on resize
  window.addEventListener('resize', () => {
    calculateSizesAndJump();
  });

  function moveTo(newPos) {
    if (isTransitioning) return;
    isTransitioning = true;
    position = newPos;
    track.style.transition = `transform ${TRANS_MS}ms ease-in-out`;
    track.style.transform = `translateX(-${position * slideWidth}px)`;
  }

  function next() { moveTo(position + 1); }
  function prev() { moveTo(position - 1); }

  // Handle the seamless jump after hitting clones
  track.addEventListener('transitionend', () => {
    isTransitioning = false;
    slides = Array.from(track.children); // ensure list updated

    // if at the cloned first (index = slides.length - 1) => jump to real first (position = 1)
    if (position === slides.length - 1) {
      track.style.transition = 'none';
      position = 1;
      track.style.transform = `translateX(-${position * slideWidth}px)`;
      track.getBoundingClientRect(); // force reflow
      track.style.transition = `transform ${TRANS_MS}ms ease-in-out`;
    }

    // if at the cloned last (index = 0) => jump to real last (position = slides.length - 2)
    if (position === 0) {
      track.style.transition = 'none';
      position = slides.length - 2;
      track.style.transform = `translateX(-${position * slideWidth}px)`;
      track.getBoundingClientRect();
      track.style.transition = `transform ${TRANS_MS}ms ease-in-out`;
    }
  });

  // Buttons
  rightBtn.addEventListener('click', () => {
    next();
    resetAuto();
  });
  leftBtn.addEventListener('click', () => {
    prev();
    resetAuto();
  });

  // Autoplay
  function startAuto() {
    stopAuto();
    autoId = setInterval(() => {
      next();
    }, AUTOPLAY_MS);
  }
  function stopAuto() {
    if (autoId) {
      clearInterval(autoId);
      autoId = null;
    }
  }
  function resetAuto() {
    stopAuto();
    // small delay before restarting so quick repeated clicks don't break timing:
    setTimeout(startAuto, 150);
  }
});