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
// Toggle the mobile navigation menu
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// POST route to handle contact form submissions
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  // Create a transporter using Gmail SMTP (example configuration)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'goodnesspeters@gmail.com', // your email address
      pass: 'Goody@2008'     // your email password or app password
    }
  });

  // Define email options
  const mailOptions = {
    from: email,
    to: 'YOUR_EMAIL@gmail.com', // recipient address (your email)
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, message: 'Error sending message.' });
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).json({ success: true, message: 'Message sent successfully!' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
