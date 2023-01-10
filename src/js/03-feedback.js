var throttle = require('lodash.throttle');
var validator = require('validator');

const emailEl = document.querySelector('input[name=email]');
const textAreaEl = document.querySelector('textarea[name=message]');
const formEl = document.querySelector('.feedback-form');
const btnSubmit = document.querySelector('button[type=submit]');

// object for saving user`s input value
const userData = {
  email: emailEl.value,
  message: textAreaEl.value,
};

// prevent form from default behavior
formEl.addEventListener('submit', event => {
  event.preventDefault();
});

// check if localStorage is empty
if (localStorage.length === 0) {
  formEl.reset();
} else {
  // fill in form input fields with data from localStorage
  try {
    const { email, message } = JSON.parse(localStorage['feedback-form-state']);
    emailEl.value = email;
    textAreaEl.value = message;
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}

function stringifyData(data) {
  try {
    return JSON.stringify(data);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}

// function to handle inputs filling and updating localStorage with actual values
function handlerFormElements(event) {
  if (event.target.type === 'email') {
    userData.email = event.target.value;
    localStorage.setItem('feedback-form-state', stringifyData(userData));
  }
  if (event.target.type === 'textarea') {
    userData.message = event.target.value;
    localStorage.setItem('feedback-form-state', stringifyData(userData));
  }
}

// listen 'input' action on the form`s input fields
formEl.addEventListener('input', throttle(handlerFormElements, 500));

// show local storage and reset form`s input fields
btnSubmit.addEventListener('click', () => {
  if (!emailEl.value || !textAreaEl.value) {
    alert('All fields should be filled in');
  } else if (!validator.isEmail(emailEl.value)) {
    alert('Please, enter correct email address');
  } else {
    try {
      const parseData = JSON.parse(localStorage['feedback-form-state']);
      console.log(parseData);
    } catch (error) {
      console.log(error.name);
      console.log(error.message);
    }
    formEl.reset();
    localStorage.clear();
  }
});
