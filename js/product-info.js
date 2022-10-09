let currentProductArray = {};
let productInfoContainer = document.getElementById("product-info");
let prodContent = "";
let comments = [];  
let commcont = document.getElementById('comm');
let relatedProducts = document.getElementById('relatedProd')

function setRelatedProdId(relatedId){
    localStorage.setItem("prodId",relatedId);
}

document.addEventListener("DOMContentLoaded", function(){
    console.log(PRODUCT_INFO_URL)
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        
        if (resultObj.status === "ok"){
            currentProductArray=resultObj.data;
            productInfoContainer.innerHTML = `
            <div class="general"><br>
                <h4 class="title">` + currentProductArray.name + `</h4>
                <hr>
                <p class="cost"><strong>Precio</strong> <br>` + currentProductArray.cost +` ` + currentProductArray.currency + `</</p><br>
                <p class="count"><strong>Cantidad de vendidos</strong> <br>` + currentProductArray.soldCount + `</p>
                <p class="cat"><strong>Categoria</strong> <br>`+ currentProductArray.category +`</p>
                <p class="desc"><strong>Descripcion</strong> <br>` + currentProductArray.description + `</p>
            </div>`
            
            for(u = 0; u < currentProductArray.relatedProducts.length; u++){
                let relpimg = currentProductArray.relatedProducts[u].image;
                let relpname = currentProductArray.relatedProducts[u].name;
                let relpID = currentProductArray.relatedProducts[u].id;

                relatedProducts.innerHTML += `
                <div class="col-4" onclick="setRelatedProdId(${relpID})">  
                    <a href="product-info.html">  
                        <div class="card" style="width: 18rem;">
                            <img class="card-img-top" src="${relpimg}" alt="Card image cap">
                            <div class="card-body">
                            <p class="card-text">${relpname}</p>
                            </div>
                        </div>
                    </a>
                </div>
                `
            }

            for(let i=0 ; i < currentProductArray.images.length; i++){
                prodContent+= `

        
                         <img class="img-fluid img-thumbnail img-fit col-2" src="../`+ currentProductArray.images[i] +`"alt=` + currentProductArray.name + `>
                `
                document.getElementById("prodImag").innerHTML = prodContent;
            }
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        
        if (resultObj.status === "ok"){
           
             comments = resultObj.data;

            let commtoappend = "";
             for(i = 0; i < comments.length; i++){

                commtoappend = `
                <div class="commcontainer">
                    <p class="ucomment"><strong>${comments[i].user}</strong> - <span class="commdate">${comments[i].dateTime}</span> - <span class="rate" id=${"rate"+i} ></span></p>
                    <p class="comment">${comments[i].description}</p>
                </div>`
                commcont.innerHTML += commtoappend;

                let htmlScoreToAppend = "";
                let rate = document.getElementById(`rate${i}`);

                for(j = 1 ; j <= 5; j++){

                    if(j <= comments[i].score){
                        htmlScoreToAppend += `<span class="fa fa-star checked"></span>`
                    }else{
                        htmlScoreToAppend += `<span class="fa fa-star"></span>`
                    }

                    rate.innerHTML = htmlScoreToAppend;
                }

             }

        
        }
    });

});


