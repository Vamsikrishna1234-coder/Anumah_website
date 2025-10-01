document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('enquiryPopup');
  const closeBtn = popup.querySelector('.close-btn');
  const buttons = document.querySelectorAll('.enquiry-btn, #enquireBtn');
  const form = document.getElementById("enquiryForm");

  // Open popup
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      popup.style.display = 'flex';
    });
  });

  // Close popup
  closeBtn.addEventListener('click', () => popup.style.display = 'none');
  window.addEventListener('click', (e) => {
    if(e.target === popup) popup.style.display = 'none';
  });

  // Submit form to Google Sheets
  form.addEventListener("submit", function(e){
    e.preventDefault();

    fetch("https://script.google.com/macros/s/AKfycbyNj0wevdOBfQsZVrKytQ3i2lh5LQ-2Dx7Z_wbh9C7ZyRtDF35BnLZRNRvE3mD0aSql/exec", {   // 🔥 replace with your deployed Apps Script URL
      method: "POST",
      body: JSON.stringify({
        name: this.name.value,
        email: this.email.value,
        phone: this.phone.value,
        message: this.message.value
      })
    })
    .then(res => res.json())
    .then(data => {
      alert("✅ Thank you! Your enquiry has been sent.");
      this.reset();
      popup.style.display = 'none';
    })
    .catch(err => {
      console.error("Error!", err);
      alert("❌ Something went wrong. Please try again.");
    });
  });
});