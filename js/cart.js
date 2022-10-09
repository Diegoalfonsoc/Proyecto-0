const cart = document.getElementById('carrito');

document.addEventListener('DOMContentLoaded', () => {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        let cartinfo = resultObj.data.articles[0];

        let cimg = document.getElementById('cimg')
        let csub = document.getElementById('csub')
        let cinp = document.getElementById('cinp')
        let cname = document.getElementById('cname')
        let ccost = document.getElementById('ccost')


        cimg.innerHTML = `<img style="width: 30%;" src="${cartinfo.image}" alt="${cartinfo.name}">`
        cname.innerHTML = cartinfo.name;
        ccost.innerHTML = cartinfo.currency +" "+ cartinfo.unitCost;
        csub.innerHTML = csub.innerHTML = `${cartinfo.currency} ${cinp.value*cartinfo.unitCost}`

        cinp.addEventListener("change", function calculateSubtotal(){
            
            csub.innerHTML = `${cartinfo.currency} ${cinp.value*cartinfo.unitCost}`
            
        })

    })
})

