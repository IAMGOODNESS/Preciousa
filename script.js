const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto-slide every 5 seconds
setInterval(nextSlide, 5000);
function handleCategoryChange(value) {
  if (value) {
    window.location.href = value; // Redirect to the selected page
  }
}
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
}
document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault(); // Prevent default form submission
  
  let form = e.target;
  let formData = new FormData(form);

  let responseMessage = document.getElementById("responseMessage");
  responseMessage.innerText = "Sending...";

  try {
    let response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { "Accept": "application/json" } // Important for Formspree
    });

    let result = await response.json();
    
    if (response.ok) {
      responseMessage.innerText = "✅ Message Sent Successfully!";
      form.reset();
    } else {
      responseMessage.innerText = "❌ Error: " + result.errors[0].message;
    }
  } catch (error) {
    responseMessage.innerText = "❌ Network Error! Try again.";
  }
});