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
emailjs.init("1H0brlG2ArnKD_6wZ"); // Replace with your actual EmailJS public key

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    emailjs.send("service_2aqi526", "template_v9ih2dr", {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    }).then(function(response) {
        document.getElementById("status").innerHTML = "Message sent successfully!";
        document.getElementById("contact-form").reset();
    }, function(error) {
        document.getElementById("status").innerHTML = "Failed to send message. Try again!";
    });
});