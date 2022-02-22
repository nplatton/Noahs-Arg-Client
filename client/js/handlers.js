const { requestLogin, requestRegistration } = require('./auth')

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

loginForm.addEventListener('submit', requestLogin)
registerForm.addEventListener('submit', requestRegistration)

