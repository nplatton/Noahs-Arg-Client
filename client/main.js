const {
  generateTitle,
  generateHabits,
  generateHabitForm,
  updateHabits
} = require("./habitForm");
const { requestLogin, requestRegistration } = require("./auth/auth");

const handlers = require("./src/js/handlers");
const loginFormTemplate = require("./src/js/templates/loginForm");
const welcomeTemplate = require("./src/js/templates/welcome");

// If the user is logged in, don't show login forms when returning to homepage
if (window.location.pathname == "/index.html") {
  const username = localStorage.getItem("username");
  const formContainer = document.querySelector("#home-form-container");
  if (!!localStorage.getItem("username")) {
    formContainer.innerHTML = welcomeTemplate(username);
  } else {
    formContainer.innerHTML = loginFormTemplate();

    const loginForm = document.querySelector("#login-form");
    const registerForm = document.querySelector("#register-form");

    loginForm && loginForm.addEventListener("submit", requestLogin);
    registerForm &&
      registerForm.addEventListener("submit", requestRegistration);
  }
} else if (window.location.pathname == "/org.html") {
  handlers.getOrgUsers();
} else if (window.location.pathname == "/personal.html") {
  // Add event listener for checkbox clicks on personal.html
  setTimeout(() => {
    const boxes = document.querySelectorAll(".habit-day-box");
    console.log(boxes);
    boxes.forEach((box) => {
      box.addEventListener("click", (e) => {
        e.preventDefault();
        handlers.incrementHabit(e);
      });
    });
  }, 500);
}

// ---------------- ORG PAGE -----------------------

const container = document.querySelector("#inner-container");

let x0;
container &&
  container.addEventListener("mousedown", (e) => {
    x0 = e.clientX;
    let x1;
    container.addEventListener("mouseup", (e) => {
      x1 = e.clientX;
      slider(x0, x1);
    });
  });

container &&
  container.addEventListener("touchstart", (e) => {
    let x0 = e.touches.item(0).clientX;
    let x1;
    container.addEventListener("touchend", (e) => {
      x1 = e.changedTouches.item(0).clientX;
      slider(x0, x1);
    });
  });

function slider(x0, x1) {
  const i = getComputedStyle(document.documentElement).getPropertyValue("--i");
  if (i == 0 && x0 >= x1) {
    document.documentElement.style.setProperty("--i", 1);
  } else if (i == 1 && x1 > x0) {
    document.documentElement.style.setProperty("--i", 0);
  }
}

const main = document.getElementById("test_button");
main && main.addEventListener("click", handlers.getUser);


if (window.location.pathname == "/personal.html") {
  window.addEventListener("DOMContentLoaded", handlers.checkForHabits);
}
