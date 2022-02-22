const jwt_decode = require('jwt-decode');
const API_URL = 'http://localhost:3000'


async function requestLogin(e){
    e.preventDefault();
    
    try {
        let formData = new FormData(e.target)
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        }

        const r = await fetch(`${API_URL}/auth/login`, options)
        const data = await r.json()
        if (!data.success) { throw new Error('Login not authorised'); }
        login(data.token);
    } catch (err) {
        console.warn(err);
    }
}

async function requestRegistration(e) {
    e.preventDefault();
    try {
        let formData = new FormData(e.target)
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        }
        const r = await fetch(`${API_URL}/auth/register`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err) }
        requestLogin(e);
    } catch (err) {
        console.warn(err);
    }
}

function login(token){
    const user = jwt_decode(token);
    localStorage.setItem("token", token);
    localStorage.setItem("username", user.username);

    document.getElementById('register').style.display='none'
    document.getElementById('login').style.display='none'

    window.location.replace("personal.html");
}

function logout(){
    localStorage.clear();
    location.reload();
}

function currentUser(){
    const username = localStorage.getItem('username')
    return username;
}

module.exports = {requestLogin, requestRegistration, logout, currentUser, login}
