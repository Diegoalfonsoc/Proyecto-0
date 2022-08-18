
let productsArray = [];


function showProductsList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        product = array[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name +`</h4> 
                        <p> `+ product.description +`</p> 
                        </div>
                        <small class="text-muted">` + product.soldCount+ ` artículos</small> 
                    </div>

                </div>
            </div>
        </div>`
        
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend; 
    } 
}



document.addEventListener("DOMContentLoaded", function(){
    getJSONData(CAR_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            console.log(productsArray)
            showProductsList(productsArray.products);
        }
    });
    
});