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
const url = "http://localhost:3000";

// Create Habits form, must include 3 Habits, checkboxes, current score, goal.

// Generate Habit Form Title for Already made habits- Welcomes User
const generateTitle = (data) => {
  const formDiv = document.createElement("div");
  // formDiv.classList.add("habit_form", "title_habit");

  const titleLabel = document.createElement("label");
  titleLabel.for = "habit";
  titleLabel.innerText = "Welcome"; // Check
  formDiv.appendChild(titleLabel);

  return formDiv;
};

// Generates the users habits

function generateHabits(data) {
  const habitsDiv = document.createElement("div");
  // habitsDiv.classList.add("habit_form", "title_habit");

  for (const habit in data.tracked_habits) {
    const habitDiv = document.createElement("div");
    habitDiv.id = habit;
    const habitLabel = document.createElement("label");
    habitLabel.for = habit;
    habitLabel.innerText = habit;

    habitDiv.appendChild(habitLabel);

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
      dayCheck.id = habit + "-" + day;
      habitDiv.appendChild(dayLabel);
      habitDiv.appendChild(dayCheck);
    });

    habitsDiv.appendChild(habitDiv);
  }

  return habitsDiv;
}

function updateHabits(data) {
  const updateButton = document.getElementById("create_btn");
  updateButton.addEventListener("click", (e) => {
    e.preventDefault();

    const username = localStorage.getItem("username");

    var jsonData1 = "{";

    for (const habit in data.tracked_habits) {
      jsonData1 += '"' + habit + '":';

      var monCount = document.getElementById(`${habit}-Monday`).checked ? 1 : 0;
      var tuesCount = document.getElementById(`${habit}-Tuesday`).checked
        ? 1
        : 0;
      var wedCount = document.getElementById(`${habit}-Wednesday`).checked
        ? 1
        : 0;
      var thursCount = document.getElementById(`${habit}-Thursday`).checked
        ? 1
        : 0;
      var friCount = document.getElementById(`${habit}-Friday`).checked ? 1 : 0;
      var weeklyCount = monCount + tuesCount + wedCount + thursCount + friCount;

      var jsonHabit = {
        target_amount: data.tracked_habits[`${habit}`].target_amount,
        mon: monCount,
        tues: tuesCount,
        wed: wedCount,
        thurs: thursCount,
        fri: friCount,
        weekly_count: weeklyCount,
      };

      jsonData1 += JSON.stringify(jsonHabit) + ",";
    }

    var jsonData = jsonData1.slice(0, -1);

    jsonData += "}";

    const options = {
      method: "PATCH",
      headers: new Headers({
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      }),
      body: jsonData,
    };

    const updateUrl = `${url}/users/${username}/habits`;
    fetch(updateUrl, options).catch((error) => console.log(error));
  });
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
  submit.value = "Update Habits";
  submit.id = "create_btn";
  // add class list for styling

  form.appendChild(generateTitle());
  form.appendChild(habitData);
  form.appendChild(submit);

  wrapper.prepend(form);
}

module.exports = {
  generateTitle,
  generateHabits,
  generateHabitForm,
  updateHabits,
};

},{}],4:[function(require,module,exports){
const {
  generateTitle,
  generateHabits,
  generateHabitForm,
  updateHabits,
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

if (window.location.pathname == "/personal.html") {
  window.addEventListener("DOMContentLoaded", handlers.checkForHabits);

  setTimeout(() => {
    const selectForm = document.querySelector("#select-form");
    selectForm &&
      selectForm.addEventListener("submit", handlers.updateHabitSelection);
  }, 1000);
}

},{"./auth/auth":1,"./habitForm":3,"./src/js/handlers":7,"./src/js/templates/loginForm":9,"./src/js/templates/welcome":10}],5:[function(require,module,exports){
"use strict";function e(e){this.message=e}e.prototype=new Error,e.prototype.name="InvalidCharacterError";var r="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(r){var t=String(r).replace(/=+$/,"");if(t.length%4==1)throw new e("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,o,a=0,i=0,c="";o=t.charAt(i++);~o&&(n=a%4?64*n+o:o,a++%4)?c+=String.fromCharCode(255&n>>(-2*a&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return c};function t(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(r(e).replace(/(.)/g,(function(e,r){var t=r.charCodeAt(0).toString(16).toUpperCase();return t.length<2&&(t="0"+t),"%"+t})))}(t)}catch(e){return r(t)}}function n(e){this.message=e}function o(e,r){if("string"!=typeof e)throw new n("Invalid token specified");var o=!0===(r=r||{}).header?0:1;try{return JSON.parse(t(e.split(".")[o]))}catch(e){throw new n("Invalid token specified: "+e.message)}}n.prototype=new Error,n.prototype.name="InvalidTokenError";const a=o;a.default=o,a.InvalidTokenError=n,module.exports=a;


},{}],6:[function(require,module,exports){
// Create Choose Habits Form Function, must include habit checkboxes and submit to database.

const generateSelectTitle = () => {
  const habitSDiv = document.createElement("div");
  habitSDiv.classList.add("habitS_form", "title_habit");

  const titleLabel = document.createElement("label");
  titleLabel.for = "habit";
  titleLabel.innerText = "Please Choose Your Habits";
  habitSDiv.appendChild(titleLabel);

  return habitSDiv;
};

function generateSelector() {
  const habitDiv = document.createElement("div");
  const habits = ["water", "break", "stretch"];
  habits.forEach((habit) => {
    const habitLabel = document.createElement("label");
    habitLabel.innerText = habit;
    const habitCheck = document.createElement("input");
    habitCheck.type = "checkbox";
    habitCheck.checked = true;
    habitCheck.style.display = "none";

    const habitSelect = document.createElement("select");
    habitSelect.classList.add("selector");

    const goalNums = [1, 2, 3, 4, 5];
    goalNums.forEach((goalNum) => {
      const habitOption = document.createElement("option");
      habitOption.selected = true;
      habitOption.innerText = goalNum;
      habitSelect.appendChild(habitOption);
    });

    // Add Elements to Each Option
    // options.forEach((option) => {
    // const optionElem = document.createElement("option");
    // optionElem.value = option;
    // optionElem.innerText = option;
    // optionElem.classList.add("tag_option");
    // select.appendChild(optionElem);

    habitDiv.appendChild(habitLabel);
    habitDiv.appendChild(habitCheck);
    habitDiv.appendChild(habitSelect);
  });
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
  form.id = "select-form";

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

    // Use response to populate the habits page

    habitForm.generateHabitForm(response);
    habitForm.updateHabits(response);
    // habitSelect.generateSelectorForm(response);
  } catch (err) {
    console.warn(err);
  }
}

async function updateHabitSelection(e) {
  e.preventDefault();
  try {
    const container = document.querySelector(".wrapper");
    container.innerHTML = "";

    const username = localStorage.getItem("username");

    let arr = [];
    let selectorIds = ["1", "3", "5"];
    for (const id of selectorIds) {
      arr.push(e.target[id].value);
    }

    const habits = ["drink_water", "break_from_screen", "stretch"];
    let data = {};
    for (const habit of habits) {
      data[`${habit}`] = {
        target_amount: arr[habits.indexOf(habit)],
        mon: 0,
        tues: 0,
        wed: 0,
        thurs: 0,
        fri: 0,
        weekly_count: 0,
      };
    }

    const options = {
      method: "PATCH",
      headers: new Headers({
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(data),
    };

    const response = await (
      await fetch(`${url}/users/${username}/habits`, options)
    ).json();

    habitForm.generateHabitForm(response);
    habitForm.updateHabits(response);
  } catch (err) {
    console.warn(err);
  }
}

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

    if (!Object.keys(response).length) {
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
  updateHabitSelection,
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
    At the start of each week you make a choice of your daily targets for each habit.<br/>
    You can then view your progress on your habit page!<br/>
    When you're there you can also check off your completed habit for the day and view the current streak you are on for that habit!</p>
    <h4>Organisation Page</h4>
    <p>View the leaderboards of all your peers within your organisation! Who said we can't make habit tracking competitive!<br/>
    I bet you're wondering, how does the scoring system even work?<br/>
    Well, as we mentioned above, you choose how many of a task you want to complete in a day. For example, you may choose to set your daily target for drinking water to be 5 cups. Then each day you complete this task you would get 5 point and this gets added to your weekly total!
    It's as simple as that!</p>
    <h5>Go ahead and enjoy!</h5>
  </div>
</div>
  `;
}

module.exports = welcomeTemplate;

},{}]},{},[4]);
