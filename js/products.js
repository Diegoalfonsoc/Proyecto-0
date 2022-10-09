const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentProductArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortProduct(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}


function showProductList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductArray.length; i++){
        let product = currentProductArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

            htmlContentToAppend += `
            <a href="product-info.html">
                <div class="list-group-item list-group-item-action" onclick="searchProductId(`+ product.id +`)">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.image + `" alt="product image" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                            <h4>`+ product.name +`</h4> 
                            <p> `+ product.description + `</p> 
                            <p> `+ "$" + product.cost +`</p>
                            </div>
                            <small class="text-muted">` + product.soldCount+ ` artículos</small> 
                        </div>

                    </div>
                </div>
            </div>
            </a>`
        }

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProduct(sortCriteria, productArray){
    currentSortCriteria = sortCriteria;

    if(productArray != undefined){
        currentProductArray = productArray;
    }
    currentProductArray = sortProduct(currentSortCriteria, currentProductArray);

    showProductList();
}


function searchProductId(productId){    
    localStorage.setItem("prodId",productId);
}


document.addEventListener("DOMContentLoaded", function(){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            currentProductArray = resultObj.data.products;
            console.log(currentProductArray)
            showProductList();
        }
    });
    document.getElementById("productsortAsc").addEventListener("click", function(){
        sortAndShowProduct(ORDER_ASC_BY_NAME, currentProductArray.products);
    });

    document.getElementById("productsortDesc").addEventListener("click", function(){
        sortAndShowProduct(ORDER_DESC_BY_NAME, currentProductArray.products);
    });

    document.getElementById("productsortByCount").addEventListener("click", function(){
        sortAndShowProduct(ORDER_BY_PROD_COUNT, currentProductArray.products);
    });

    document.getElementById("productclearRangeFilter").addEventListener("click", function(){
        document.getElementById("productrangeFilterCountMin").value = "";
        document.getElementById("productrangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductList();
    });

    document.getElementById("productrangeFilterCount").addEventListener("click", function(){
        minCount = document.getElementById("productrangeFilterCountMin").value;
        maxCount = document.getElementById("productrangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductList();
    });
});

