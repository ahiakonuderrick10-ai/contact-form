const form = document.getElementById("contactForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let valid = true;

  // Get fields
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const consent = document.getElementById("consent");

  // Clear previous errors
  document.querySelectorAll(".error").forEach(error => {
    error.textContent = "";
  });

  document.querySelectorAll("input, textarea").forEach(field => {
    field.classList.remove("input-error");
  });

  // First name
  if (firstName.value.trim() === "") {
    showError(firstName, "First name is required.");
    valid = false;
  }

  // Last name
  if (lastName.value.trim() === "") {
    showError(lastName, "Last name is required.");
    valid = false;
  }

  // Email
  if (email.value.trim() === "") {
    showError(email, "Email address is required.");
    valid = false;
  } else if (!isValidEmail(email.value.trim())) {
    showError(email, "Please enter a valid email address.");
    valid = false;
  }

  // Query type
  const selectedQuery = document.querySelector(
    'input[name="queryType"]:checked'
  );

  if (!selectedQuery) {
    document.getElementById("queryError").textContent =
      "Please select a query type.";
    valid = false;
  }

  // Message
  if (message.value.trim() === "") {
    showError(message, "Message is required.");
    valid = false;
  }

  // Consent
  if (!consent.checked) {
    document.getElementById("consentError").textContent =
      "Please give your consent before submitting.";
    valid = false;
  }

  // If everything is valid
  if (valid) {
    const successMessage = document.getElementById("successMessage");

    successMessage.style.display = "block";

    // Reset form
    form.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 5000);
  }
});

function showError(input, message) {
  input.classList.add("input-error");

  const errorElement = input
    .closest(".form-group")
    .querySelector(".error");

  errorElement.textContent = message;
}

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}