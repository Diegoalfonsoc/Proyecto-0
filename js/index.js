document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    const nickname = localStorage.getItem('nickname');
    const profile = document.querySelector('.prof');
    if(nickname){
        profile.innerHTML = `${nickname}`
    }else{
        alert('¡¡¡No te logueaste maquina!!!')
        location.href='login.html'
    }
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});