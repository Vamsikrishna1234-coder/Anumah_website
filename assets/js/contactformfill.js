document.getElementById("contactForm").addEventListener("submit", function(e){
  e.preventDefault();

  let data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    message: document.getElementById("message").value
  };

  fetch("https://script.google.com/macros/s/AKfycbzzr8trPj4W6soLwbjsydpZS9LS2lYIr1kNxs8bmlWP8jbxNDvTgok6ManQfAc7ZSmL/exec", {  // replace with Apps Script Web App URL
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.json())
  .then(response => {
    document.getElementById("form-status").innerText = "✅ Message sent successfully!";
    document.getElementById("contactForm").reset();
  })
  .catch(err => {
    document.getElementById("form-status").innerText = "❌ Error sending message. Try again.";
    console.error(err);
  });
});