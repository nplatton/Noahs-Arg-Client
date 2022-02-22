(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const jwt_decode = require("jwt-decode");
const API_URL = "http://localhost:3000";

async function requestLogin(e) {
  e.preventDefault();

  try {
    console.log(e.target);
    // let formData = new FormData(e.target);
    const data = {
      username: e.target.username.value,
      password: e.target.psw.value,
    };
    console.log(data);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify(Object.fromEntries(formData)),
      body: JSON.stringify(data),
    };

    const r = await fetch(`${API_URL}/auth/login`, options);
    const response = await r.json();
    if (!response.success) {
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
    let formData = new FormData(e.target);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    };
    const r = await fetch(`${API_URL}/auth/register`, options);
    const data = await r.json();
    if (data.err) {
      throw Error(data.err);
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

},{"jwt-decode":3}],2:[function(require,module,exports){
const { requestLogin, requestRegistration } = require("./auth/auth");

const loginForm = document.querySelector("#login-form");
const registerForm = document.querySelector("#register-form");

loginForm.addEventListener("submit", requestLogin);
registerForm.addEventListener("submit", requestRegistration);

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
  console.log(i);
  if (i == 0 && x0 >= x1) {
    document.documentElement.style.setProperty("--i", 1);
  } else if (i == 1 && x1 > x0) {
    document.documentElement.style.setProperty("--i", 0);
  }
}

},{"./auth/auth":1}],3:[function(require,module,exports){
"use strict";function e(e){this.message=e}e.prototype=new Error,e.prototype.name="InvalidCharacterError";var r="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(r){var t=String(r).replace(/=+$/,"");if(t.length%4==1)throw new e("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,o,a=0,i=0,c="";o=t.charAt(i++);~o&&(n=a%4?64*n+o:o,a++%4)?c+=String.fromCharCode(255&n>>(-2*a&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return c};function t(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(r(e).replace(/(.)/g,(function(e,r){var t=r.charCodeAt(0).toString(16).toUpperCase();return t.length<2&&(t="0"+t),"%"+t})))}(t)}catch(e){return r(t)}}function n(e){this.message=e}function o(e,r){if("string"!=typeof e)throw new n("Invalid token specified");var o=!0===(r=r||{}).header?0:1;try{return JSON.parse(t(e.split(".")[o]))}catch(e){throw new n("Invalid token specified: "+e.message)}}n.prototype=new Error,n.prototype.name="InvalidTokenError";const a=o;a.default=o,a.InvalidTokenError=n,module.exports=a;


},{}]},{},[2]);
