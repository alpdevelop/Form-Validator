const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const repassword = document.querySelector("#repassword");

const showError = (input, message) => {
  input.classList.add("is-invalid");
  const errorDiv = input.nextElementSibling;
  errorDiv.innerText = message;
  errorDiv.className = "invalid-feedback";
};

const showSuccess = (input) => {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
};

const validateEmail = (email) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

const checkRequired = (inputArray) => {
  inputArray.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

const checkPasswordsMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
};

const checkPasswordLength = (password) => {
  if (String(password.value).length < 8) {
    showError(password, "Minimum 8 characters required");
  } else {
    showSuccess(password);
  }
}

const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([username, email, password, repassword]);
  if (email.value !== "" && !validateEmail(email.value)) {
    showError(email, "Wrong or Invalid email address. Please correct and try again.");
  }

  checkPasswordLength(password)
  checkPasswordsMatch(password, repassword);
});

