const nickname = document.getElementById('nick');

const password = document.getElementById('pass');

const btn = document.getElementById('butt');

function login() {
    if (nickname.value && password.value) {
        window.localStorage.setItem("nickname", nickname.value);
        window.localStorage.setItem("password", password.value);
        location.href='index.html';
    } else {
        alert('Ingresar datos validos')
    }
}

