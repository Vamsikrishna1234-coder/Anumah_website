
  let slides = document.querySelectorAll(".image-slideshow img");
  let index = 0;

  setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 1000); // change image every 1 second

