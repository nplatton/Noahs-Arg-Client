const { generateTitle, generateHabits, generateHabitForm } = require("./habitForm");
const { requestLogin, requestRegistration } = require("./auth/auth");

const handlers = require("./src/js/handlers");

const loginForm = document.querySelector("#login-form");
const registerForm = document.querySelector("#register-form");

loginForm && loginForm.addEventListener("submit", requestLogin);
registerForm && registerForm.addEventListener("submit", requestRegistration);

// If the user is logged in, don't show login forms when returning to homepage
if (
  window.location.pathname == "/index.html" &&
  !!localStorage.getItem("username")
) {
  const formContainer = document.querySelector("#home-form-container");
  formContainer.innerHTML = "";
} else if (window.location.pathname == "/org.html") {
  handlers.getOrgUsers();
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


const main = document.querySelector("h1");
main.addEventListener("click", handlers.getUser)

