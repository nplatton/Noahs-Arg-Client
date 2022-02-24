(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const jwt_decode = require("jwt-decode");
const API_URL = "http://localhost:3000";

const { incorrectPassword } = require("./authHelpers.js");

async function requestLogin(e) {
  e.preventDefault();

  try {
    console.log(e.target);
    const data = {
      username: e.target.username.value,
      password: e.target.psw.value,
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const r = await fetch(`${API_URL}/auth/login`, options);
    const response = await r.json();
    if (!response.success) {
      incorrectPassword();
      throw new Error("Login not authorised");
    }
    login(response.token);
    checkLastVisited();
  } catch (err) {
    console.warn(err);
  }
}

async function requestRegistration(e) {
  e.preventDefault();
  try {
    const data = {
      username: e.target.username.value,
      password: e.target.psw.value,
      org: e.target.org.value,
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await (
      await fetch(`${API_URL}/auth/register`, options)
    ).json();
    if (response.err) {
      throw Error(response.err);
    }
    requestLogin(e);
  } catch (err) {
    console.warn(err);
  }
}

function login(token) {
  const user = jwt_decode(token);
  localStorage.setItem("token", token);
  localStorage.setItem("username", user.username);
  localStorage.setItem("org", user.org);

  document.getElementById("register-form").style.display = "none";
  document.getElementById("login-form").style.display = "none";

  // window.location.replace("personal.html");
}

function logout() {
  localStorage.clear();
  // location.reload();
}

function currentUser() {
  const username = localStorage.getItem("username");
  return username;
}

async function checkLastVisited() {
  try {
    const username = localStorage.getItem("username");

    const options = {
      method: "DELETE",
      headers: new Headers({
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      }),
    };

    await fetch(`${API_URL}/users/${username}/habits`, options);
  } catch (err) {
    console.warn(err);
  }
}

module.exports = {
  requestLogin,
  requestRegistration,
  logout,
  currentUser,
  login,
};

},{"./authHelpers.js":2,"jwt-decode":5}],2:[function(require,module,exports){
function incorrectPassword() {
  const passwordBox = document.querySelector("#login-password");
  passwordBox.style.outline = "1px solid red";
}

module.exports = {
  incorrectPassword,
};

},{}],3:[function(require,module,exports){
// Questions, how do I get the forms to run?

// require handlers

// Write function for Identifying Habits, If habits, show habits. If not show form.

function checkHabits() {
  if ((getHabits = {})) {
    getHabitForm();
  } else {
    showHabits();
  }
}

// Create Habits form, must include 3 Habits, checkboxes, current score, goal.

// Generate Habit Form Title for Already made habits- Welcomes User
const generateTitle = () => {
  const formDiv = document.createElement("div");
  // formDiv.classList.add("habit_form", "title_habit");

  const titleLabel = document.createElement("label");
  titleLabel.for = "habit";
  titleLabel.innerText = "Welcome User"; // Get user's name
  formDiv.appendChild(titleLabel);

  return formDiv;
};

// Generates the users habits

function generateHabits(data) {
  const habitDiv = document.createElement("div");
  // habitDiv.classList.add("habit_form", "title_habit");

  for (const habit in data.tracked_habits) {
    const habitLabel = document.createElement("label");
    habitLabel.for = habit;
    habitLabel.innerText = habit;

    const habitCheck = document.createElement("input");
    habitCheck.type = "checkbox";
    habitDiv.appendChild(habitLabel);
    habitDiv.appendChild(habitCheck);

    const habitGoal = document.createElement("label");
    habitGoal.innerText =
      "Your Goal: " + data.tracked_habits[`${habit}`].target_amount;
    habitDiv.appendChild(habitGoal);
    // const weekDaysss = document.createElement("ul")
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const weekdayIds = ["mon", "tues", "wed", "thurs", "fri"];
    weekdays.forEach((day) => {
      const dayLabel = document.createElement("label");
      dayLabel.innerText = day;
      const dayCheck = document.createElement("input");
      dayCheck.type = "checkbox";
      const index = weekdays.indexOf(day);
      dayCheck.classList.add("habit-day-box");
      dayCheck.id = `${habit}-${weekdayIds[index]}`;
      habitDiv.appendChild(dayLabel);
      habitDiv.appendChild(dayCheck);
    });
  }

  return habitDiv;
}
// function generateStreak(data) {
//   const habitDiv = console.log(data);
// }

function generateHabitForm(data) {
  const habitData = generateHabits(data);
  let wrapper = document.querySelector(".wrapper");
  const form = document.createElement("form");
  // add class list for styling

  const submit = document.createElement("input");
  submit.type = "submit";
  submit.value = "Create Habits";
  submit.id = "create_btn";
  // add class list for styling

  form.appendChild(generateTitle());
  form.appendChild(habitData);
  form.appendChild(submit);

  wrapper.prepend(form);
}

module.exports = { generateTitle, generateHabits, generateHabitForm };

},{}],4:[function(require,module,exports){
const {
  generateTitle,
  generateHabits,
  generateHabitForm,
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

},{"./auth/auth":1,"./habitForm":3,"./src/js/handlers":7,"./src/js/templates/loginForm":9,"./src/js/templates/welcome":10}],5:[function(require,module,exports){
"use strict";function e(e){this.message=e}e.prototype=new Error,e.prototype.name="InvalidCharacterError";var r="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(r){var t=String(r).replace(/=+$/,"");if(t.length%4==1)throw new e("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,o,a=0,i=0,c="";o=t.charAt(i++);~o&&(n=a%4?64*n+o:o,a++%4)?c+=String.fromCharCode(255&n>>(-2*a&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return c};function t(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(r(e).replace(/(.)/g,(function(e,r){var t=r.charCodeAt(0).toString(16).toUpperCase();return t.length<2&&(t="0"+t),"%"+t})))}(t)}catch(e){return r(t)}}function n(e){this.message=e}function o(e,r){if("string"!=typeof e)throw new n("Invalid token specified");var o=!0===(r=r||{}).header?0:1;try{return JSON.parse(t(e.split(".")[o]))}catch(e){throw new n("Invalid token specified: "+e.message)}}n.prototype=new Error,n.prototype.name="InvalidTokenError";const a=o;a.default=o,a.InvalidTokenError=n,module.exports=a;


},{}],6:[function(require,module,exports){
// Create Choose Habits Form Function, must include habit checkboxes and submit to database.

const generateSelectTitle = () => {
  const habitSDiv = document.createElement("div");
  // formDiv.classList.add("habit_form", "title_habit");

  const titleLabel = document.createElement("label");
  titleLabel.for = "habit";
  titleLabel.innerText = "Please Choose Your Habits"; // Get user's name
  habitSDiv.appendChild(titleLabel);

  return habitSDiv;
};

function generateSelector() {
  const habitDiv = document.createElement("div");
  // drink more water
  const waterLabel = document.createElement("label");
  waterLabel.innerText = "drink_water";

  const waterCheck = document.createElement("input");
  waterCheck.type = "checkbox";

  habitDiv.appendChild(waterLabel);
  habitDiv.appendChild(waterCheck);
  // take breaks
  const breakLabel = document.createElement("label");
  breakLabel.innerText = "break_from_screen";

  const breakCheck = document.createElement("input");
  breakCheck.type = "checkbox";

  habitDiv.appendChild(breakLabel);
  habitDiv.appendChild(breakCheck);

  // stretch
  const stretchLabel = document.createElement("label");
  stretchLabel.innerText = "stretch";

  const stretchCheck = document.createElement("input");
  stretchCheck.type = "checkbox";

  habitDiv.appendChild(stretchLabel);
  habitDiv.appendChild(stretchCheck);

  return habitDiv;
}

function generateSelectorForm() {
  const habitData = generateSelector();
  let wrapper = document.querySelector(".wrapper");
  const form = document.createElement("form");
  // add class list for styling

  const submit = document.createElement("input");
  submit.type = "submit";
  submit.value = "Create Habits";
  submit.id = "create_btn";
  // add class list for styling

  form.appendChild(generateSelectTitle());
  form.appendChild(habitData);
  form.appendChild(submit);

  wrapper.prepend(form);
}

module.exports = {
  generateSelectTitle,
  generateSelector,
  generateSelectorForm,
};

},{}],7:[function(require,module,exports){
const habitForm = require("../../habitForm");
const habitSelect = require("../../selectHabits");
const { populateLeaderboards } = require("./orgHelpers");

const url = "http://localhost:3000";

async function getOrgUsers() {
  // e.preventDefault();
  try {
    const org = localStorage.getItem("org");

    const options = {
      headers: new Headers({
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      }),
    };

    const response = await (
      await fetch(`${url}/users/org/${org}`, options)
    ).json();

    populateLeaderboards(response);
  } catch (err) {
    console.warn(err);
  }
}

async function getUser(e) {
  e.preventDefault();

  try {
    const username = localStorage.getItem("username");

    const options = {
      headers: new Headers({
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      }),
    };

    const response = await (
      await fetch(`${url}/users/${username}`, options)
    ).json();

    habitForm.generateHabitForm(response);
    // habitSelect.generateSelectorForm(response);

    // Use response to populate the habits page
  } catch (err) {
    console.warn(err);
  }
}

// async function updateHabitSelection(e) {
//   e.preventDefault();
//   try {
//     const username = localStorage.getItem("username");

//     const data = {};
//     for (const habit of e.target) {
//       data[`${habit}`] = {
//         target_amount: e.target[`${habit}`].value,
//         daily_count: 0,
//         weekly_count: 0,
//       };
//     }

//     const options = {
//       method: "PATCH",
//       headers: new Headers({
//         authorization: localStorage.getItem("token"),
//         "Content-Type": "application/json",
//       }),
//       body: JSON.stringify(data),
//     };

//     const reponse = await (
//       await fetch(`${url}/users/${username}/habits`, options)
//     ).json();
//     console.log(response);
//   } catch (err) {
//     console.warn(err);
//   }
// }

async function incrementHabit(e) {
  e.preventDefault();
  try {
    const username = localStorage.getItem("username");
    const habitId = e.target.id;
    const habit = habitId.split("-")[0];
    const day = habitId.split("-")[1];

    const data = {
      dayOfWeek: day,
    };

    const options = {
      method: "PATCH",
      headers: new Headers({
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(data),
    };

    await (
      await fetch(`${url}/users/${username}/habits/${habit}`, options)
    ).json();
  } catch (err) {
    console.warn(err);
  }
}

async function checkForHabits(e) {
  try {
    const username = localStorage.getItem("username");

    const options = {
      headers: new Headers({
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      }),
    };

    const response = await (
      await fetch(`${url}/users/${username}/habits`, options)
    ).json();

    if (response === {}) {
      habitSelect.generateSelectorForm();
    } else {
      getUser(e);
    }
  } catch (err) {
    console.warn(err);
  }
}

module.exports = {
  getOrgUsers,
  getUser,
  // updateHabitSelection,
  incrementHabit,
  checkForHabits,
};

},{"../../habitForm":3,"../../selectHabits":6,"./orgHelpers":8}],8:[function(require,module,exports){
function populateLeaderboards(data) {
  // First we want to comput everybody's ranks
  const sortedArray = rankUsers(data);
  const ranks = {};
  for (const user of data) {
    ranks[`${user.username}`] = getRank(user.username, sortedArray);
  }

  const leaderboard = document.querySelector("#leaderboard");
  data.forEach((user) => {
    leaderboard.appendChild(addUser(user, ranks));
  });
}

function addUser(userData, ranks) {
  const userBar = document.createElement("div");
  userBar.classList.add("leaderboard-bar");

  const rank = document.createElement("div");
  rank.classList.add("rank-circle");
  const userRank = ranks[`${userData.username}`];
  rank.textContent = userRank;

  const points = document.createElement("div");
  points.classList.add("points-circle");
  const userPoints = computePoints(userData);
  points.textContent = userPoints;

  const usernameSctn = document.createElement("div");
  usernameSctn.classList.add("username-sctn");
  const username = userData.username;
  usernameSctn.textContent = username;

  userBar.appendChild(rank);
  userBar.appendChild(usernameSctn);
  userBar.appendChild(points);

  return userBar;
}

function getRank(username, sortedArray) {
  // Get actual rank from output of rankUsers()
  for (const item of sortedArray) {
    if (item.split(":")[0] == username) {
      return sortedArray.length - sortedArray.indexOf(item);
    }
  }
}

function rankUsers(users) {
  let arr = [];
  for (const user of users) {
    arr.push(`${user.username}: ${computePoints(user)}`);
  }
  const sortedArray = reorder(arr);
  return sortedArray;
}

function computePoints(userData) {
  const habits = userData.tracked_habits;
  let points = 0;
  for (const habit in habits) {
    points += parseInt(habits[`${habit}`].weekly_count);
  }
  return points;
}

function reorder(arr) {
  let sortedArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (i == 0) {
      sortedArr.push(arr[i]);
    } else {
      for (let j = 0; j < sortedArr.length; j++) {
        if (
          parseInt(arr[i].split(" ")[1]) < parseInt(sortedArr[j].split(" ")[1])
        ) {
          sortedArr = sortedArr.splice(j, 0, arr[i]);
          break;
        } else if (
          j == sortedArr.length - 1 &&
          parseInt(arr[i].split(" ")[1]) >= parseInt(sortedArr[j].split(" ")[1])
        ) {
          sortedArr.push(arr[i]);
          break;
        }
      }
    }
  }
  return sortedArr;
}

module.exports = {
  populateLeaderboards,
};

},{}],9:[function(require,module,exports){
function loginFormTemplate() {
  return `<form id="register-form" action="submit" class="formWrapper1">
  <div class="container">
    <h2>Sign Up</h2>
    <p>Please fill in this form to create an account.</p>
    <hr />

    <label for="username"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="username" id="username" required />

    <label for="org"><b>Organisation</b></label>
    <input
    type="text"
    placeholder="Enter Organisation"
    name="org"
    required
    />

    <label for="psw"><b>Password</b></label>
    <input
      type="password"
      placeholder="Enter Password"
      name="psw"
      id="password"
      required
    />

    <div class="clearfix">
      <button type="submit" class="signupbtn">Sign Up</button>
    </div>
  </div>
</form>

<form id="login-form" action="submit" class="formWrapper2">
  <div class="container">
    <h2>Sign In</h2>
    <p>Please fill in this form to sign into your account.</p>
    <hr />

    <label for="username"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="username" required />

    <label for="psw"><b>Password</b></label>
    <input
      id="login-password"
      type="password"
      placeholder="Enter Password"
      name="psw"
      required
    />

    <div class="clearfix">
      <button type="submit" class="signinbtn">Sign In</button>
    </div>
  </div>
</form>`;
}

module.exports = loginFormTemplate;

},{}],10:[function(require,module,exports){
function welcomeTemplate(username) {
  return `<div id="rule-container">
  <h2>Hi, ${username}!</h2>
  <div class="rules-square">
    <h3>Website Guide:</h3>
    <p>Welcome! Now you are logged in you have access to everything our site has to offer!<br/>
    Let us start with a quick breakdown of your pages:</p>
    <h4>Habits Page</h4>
    <p>Use this page to view and update your weekly habits!<br/>
    At the start of each week you make a choice of 3 habits to track every day and the quantity you want to track for each.<br/>
    You can then view your progress on your habit page!<br/>
    When you're there you can also check of your completed habit for the day and view the current streak you are on for that habit!</p>
    <h4>Organisation Page</h4>
    <p>View the leaderboards of all your peers within your organisation! Who said we can't make habit tracking competitive!<br/>
    I bet you're wondering, how does the scoring system even work?<br/>
    Well, as we mentioned above you choose how many of a task you want to complete in a day. For example, you may choose to<br/>
    drink 5 cups of water per day. Then each day you complete this task you would get 5 point and this gets added to your<br/>
    weekly total!
    It's as simple as that!</p>
    <h5>Go ahead and enjoy!</h5>
  </div>
</div>
  `;
}

module.exports = welcomeTemplate;

},{}]},{},[4]);
