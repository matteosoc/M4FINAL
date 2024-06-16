var token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4Mzg4NThmYzBmMzAwMTU1ZTVhYmMiLCJpYXQiOjE3MTgyMTg5NTYsImV4cCI6MTcxOTQyODU1Nn0.jlZJGhJxPctJiVJxkcNfr3WFcQinp0z91HC29l8_BE4";
var otherProductsContainer = document.getElementById("cardsContainer")
var urlDetail = "./index-de.html?id="


document.addEventListener("DOMContentLoaded", async () => {
    console.log("inizio caricamento pagina");

    console.log(window.location.search);

    showProduct()
    showOtherProducts()
});

function showProduct() {
    var params = new URLSearchParams(location.search);

    console.log(params);

    var id = params.get("id");

    console.log(id);

    // document.getElementById("contenitore2").innerHTML = ""; // Se non serve, questo può essere rimosso

    fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(productData => {

        let divCard = document.createElement('div');
        divCard.innerHTML = `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-6">
                        <img src="${productData.imageUrl}" class="img-fluid rounded-start" alt="${productData.name}">
                    </div>
                    <div class="col-md-6">
                        <div class="card-body">
                            <h1>${productData.name}</h5>
                            <p class="card-text">${productData.description}</p>
                            <p class="card-text">${productData.price} €</p>
                            <p class="card-text"><small class="text-body-secondary">Spedizione standard: 4/6 giorni lavorativi</small></p>
                        </div>
                    </div>
                </div>
            </div>`;

        let cardDiv = document.getElementById("cardDiv");
        
        cardDiv.appendChild(divCard);
    })
    .catch(error => {
        console.error("Errore nel caricamento del prodotto:", error);
    });
}


function showOtherProducts () {
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
        headers: {
            "Authorization": token,
            "content-type": "application/json"
        }
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        data.forEach((element,index) => {
            if (index < 4) {
            console.log(index)
            let card = document.createElement('div')

            card.innerHTML = `<div class="card"><div class="imgContainer ratio ratio-1x1"><img src="${element.imageUrl}" class="card-img-top" alt="${element.name}"></div><div class="card-body"><h5 class="card-title">${element.name}</h5><p class="card-text">${element.price} €</p><a href="${urlDetail}${element._id}" class="btn btn-primary">Dettagli</a></div></div>` 
            card.classList.add("col-6")
            card.classList.add("col-lg-3")
            otherProductsContainer.appendChild(card)

            let idCode = document.createElement('div')
            idCode.innerHTML = `<div>${element._id}</div>`
            idCode.style.display = "none"
            card.appendChild(idCode)
            }
        });
    })
}
