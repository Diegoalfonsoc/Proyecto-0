const cart = document.getElementById('carrito');

const modal = document.getElementById("modal");

document.addEventListener('DOMContentLoaded', () => {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        let cartinfo = resultObj.data.articles[0];

        let cimg = document.getElementById('cimg')
        let csub = document.getElementById('csub')
        let cinp = document.getElementById('cinp')
        let cname = document.getElementById('cname')
        let ccost = document.getElementById('ccost')

        let envioSubtotal = document.getElementById("envioSubtotal");
        let envio = document.getElementById("envio");
        let total = document.getElementById("total");

        let envioPremium = document.getElementById("radio1");
        let envioExpress = document.getElementById("radio2");
        let envioStadard = document.getElementById("radio3");

        envioPremium.addEventListener("change", tipoEnvio);
        envioExpress.addEventListener("change", tipoEnvio);
        envioStadard.addEventListener("change", tipoEnvio);


        cimg.innerHTML = `<img style="width: 80px; heigth: 80px;" src="${cartinfo.image}" alt="${cartinfo.name}">`
        cname.innerHTML = cartinfo.name;
        ccost.innerHTML = cartinfo.currency + " " + cartinfo.unitCost;
        csub.innerHTML = csub.innerHTML = `${cartinfo.currency} ${cinp.value * cartinfo.unitCost}`
        envioSubtotal.innerHTML = `${cartinfo.currency} ${cinp.value * cartinfo.unitCost}`
        total.innerHTML = `${cartinfo.currency} ${cinp.value * cartinfo.unitCost}`


        cinp.addEventListener("change", function calculateSubtotal() {

            csub.innerHTML = `${cartinfo.currency} ${cinp.value * cartinfo.unitCost}`
            envioSubtotal.innerHTML = `${cartinfo.currency} ${cinp.value * cartinfo.unitCost}`
            tipoEnvio();

        })

        function tipoEnvio() {

            total.innerHTML = `${cartinfo.currency} ${cinp.value * cartinfo.unitCost}`

            if (envioPremium.checked) {
                total.innerHTML = `${cartinfo.currency} ${cinp.value * cartinfo.unitCost + (cinp.value * cartinfo.unitCost * 0.15)}`
                envio.innerHTML = `${cartinfo.currency} ${cinp.value * cartinfo.unitCost * 0.15}`
                envioSubtotal.innerHTML = `${cartinfo.currency} ${cinp.value * cartinfo.unitCost}`
            }

            if (envioExpress.checked) {
                total.innerHTML = `${cartinfo.currency} ${cinp.value * cartinfo.unitCost + (cinp.value * cartinfo.unitCost * 0.07)}`
                envio.innerHTML = `${cartinfo.currency} ${cinp.value * cartinfo.unitCost * 0.07}`
                envioSubtotal.innerHTML = `${cartinfo.currency} ${cinp.value * cartinfo.unitCost}`
            }

            if (envioStadard.checked) {
                total.innerHTML = `${cartinfo.currency} ${cinp.value * cartinfo.unitCost + (cinp.value * cartinfo.unitCost * 0.05)}`
                envio.innerHTML = `${cartinfo.currency} ${cinp.value * cartinfo.unitCost * 0.05}`
                envioSubtotal.innerHTML = `${cartinfo.currency} ${cinp.value * cartinfo.unitCost}`
            }
        }

    })



    modal.innerHTML = `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Seleccionar
                        </button>
                    
                    <!-- Modal -->
                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Seleccione metodo de pago</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                            <form class="container">
                            <div class="row">

                              <div class="col-12 mb-2">
                                <label class="form-check-label" for="creditCard">Tarjeta de credito: </label>
                                <input type="radio" class="form-check-input" name="radioPaymentMethod" id="creditCard" required />
                              </div>

                              <div class="col-12 mb-1">
                                <label for="cardNumber">Numero de tarjeta: </label>
                                <input class="form-control" id="cardNumber" type="number" placeholder="card number" required />
                              </div>

                              <div class="col-6 mb-1">
                                <label for="securityCode">Codigo de seguridad: </label>
                                <input class="form-control" id="securityCode" type="number" placeholder="xxx" required />
                              </div>
                      
                              <div class="col-6 mb-1">
                                <label for="expireDate">Vencimiento: </label>
                                <input class="form-control" type="date" id="expireDate" placeholder="dd/mm/yy" required />
                              </div>
                            </div>

                            <hr/>
                  
                            <div class="row">
                              <div class="col-12 mb-2">
                                <label class="form-check-label" for="transffer">Transferencia bancaria: </label>
                                <input class="form-check-input" type="radio" name="radioPaymentMethod" id="transffer" required/>
                              </div>
                              <div class="col-12">
                                <label for="accnumber">Numero de cuenta bancaria: </label>
                                <input class="form-control" id="accnumber" type="number" placeholder="numbero de cuenta" required/>
                              </div>
                            </div>
                            <div class="modal-footer">
                            <input type="submit" class="btn btn-primary" value="Enviar"/>
                            <button type="button" class="btn btn-secondary">Cerrar</button>
                            </div>
                          </form>
                            </div>
                            
                        </div>
                        </div>
                    </div>`

    let cardMethod = document.getElementById("creditCard");
    let transfferMethod = document.getElementById("transffer");

    let cardNumber = document.getElementById("cardNumber");
    let securityCode = document.getElementById("securityCode");
    let expireDate = document.getElementById("expireDate");
    let accnumber = document.getElementById("accnumber");

    function selectPaymentMethod() {

        if (cardMethod?.checked) {
            accnumber.disabled = true;
        } else {
            accnumber.disabled = false;
        }

        if (transfferMethod?.checked) {
            cardNumber.disabled = true
            securityCode.disabled = true
            expireDate.disabled = true
        } else {
            cardNumber.disabled = false;
            securityCode.disabled = false;
            expireDate.disabled = false;
        }
    }

    cardMethod.addEventListener("change", selectPaymentMethod)
    transfferMethod.addEventListener("change", selectPaymentMethod)






})



