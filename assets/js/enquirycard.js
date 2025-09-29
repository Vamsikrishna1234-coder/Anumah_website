document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('enquiryPopup');
  const closeBtn = popup.querySelector('.close-btn');

  // Both buttons: top and footer
  const buttons = document.querySelectorAll('.enquiry-btn, #enquireBtn');

  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      popup.style.display = 'flex'; // show popup
    });
  });

  closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if(e.target === popup){
      popup.style.display = 'none';
    }
  });
});
