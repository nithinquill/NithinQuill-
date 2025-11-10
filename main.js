// ===============================
// MENU TOGGLE
// ===============================
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  menuToggle.classList.toggle('open');

  // Elastic bounce animation
  menuToggle.animate([
    { transform: 'scale(1)' },
    { transform: 'scale(1.2)' },
    { transform: 'scale(1)' }
  ], {
    duration: 400,
    easing: 'ease-out'
  });
});

// ===============================
// WEB3FORMS SUBMISSION
// ===============================
const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  formData.append("access_key", "bf813de3-3521-4512-8b82-fa2d7e53e19c");

  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;
  status.textContent = "";

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (response.ok) {
      status.textContent = "✅ Message sent successfully!";
      status.style.color = "green";
      form.reset();
    } else {
      status.textContent = "❌ " + data.message;
      status.style.color = "red";
    }

  } catch (error) {
    status.textContent = "⚠️ Something went wrong. Try again.";
    status.style.color = "red";
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});