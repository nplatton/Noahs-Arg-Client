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
  location.reload();
}

function currentUser() {
  const username = localStorage.getItem("username");
  return username;
}

module.exports = {
  requestLogin,
  requestRegistration,
  logout,
  currentUser,
  login,
};
