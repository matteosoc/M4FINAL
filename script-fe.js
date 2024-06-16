var token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4Mzg4NThmYzBmMzAwMTU1ZTVhYmMiLCJpYXQiOjE3MTgyMTg5NTYsImV4cCI6MTcxOTQyODU1Nn0.jlZJGhJxPctJiVJxkcNfr3WFcQinp0z91HC29l8_BE4"
var cardsContainer = document.getElementById("cardsContainer")
var url = "https://striveschool-api.herokuapp.com/api/product/"
var urlDetail = "./index-de.html?id="
var arrayProducts = []
var carrello = []


document.addEventListener("DOMContentLoaded", () =>  {
    console.log("inizio caricamento pagina")

    showProducts()
})

function showProducts() {
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
        arrayProducts = data

        data.forEach(element => {
            let card = document.createElement('div')
            card.innerHTML =    `<div class="card">
                                    <div class="imgContainer ratio ratio-1x1">
                                    <img src="${element.imageUrl}" class="card-img-top" alt="${element.name}">
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title">${element.name}</h5>
                                        <p class="card-text">${element.price} €</p>
                                        <div class="d-grid gap-2">
                                            <button class="btn btn-primary" type="button" onclick="aggiungiCarrello('${element._id}')">Aggiungi al carrello</button>
                                            <a class="btn btn-light" type="button" href="${urlDetail}${element._id}">Dettagli</a>
                                        </div>
                                </div>` 
            card.classList.add("col-6")
            card.classList.add("col-lg-3")
            cardsContainer.appendChild(card)

            let idCode = document.createElement('div')
            idCode.innerHTML = `<div>${element._id}</div>`
            idCode.style.display = "none"
            card.appendChild(idCode)
        });
    })
}

function aggiungiCarrello(id) {
    console.log("questo prodotto ha codice " + id)

    arrayProducts.forEach(element => {
        let idElemento = element._id

        if (idElemento === id) {
            // console.log("hai premuto " + element.name)
            carrello.push(element)
        }
    })

    alert('Prodotto aggiunto al carrello')

    aggiornaCarrello()
}

function aggiornaCarrello() {
    let carrelloContainer = document.getElementById("carrelloDropdown")
    carrelloContainer.innerHTML = ""
    let totaleSpesa = 0

 // Pulisce il carrello prima di aggiornarlo
    carrello.forEach(element => {
        let prodotto = document.createElement('li');
        prodotto.innerHTML =    `<li class="dropdown-item">
                                    ${element.name} - ${element.price} € 
                                    <ion-icon name="close-outline" onclick="rimuoviCarrello('${element._id}')"></ion-icon>
                                </li>`

        carrelloContainer.appendChild(prodotto);
        totaleSpesa += element.price
    });

    let divisore = document.createElement('li')
    divisore.innerHTML = `<li><hr class="dropdown-divider"></li>`
    carrelloContainer.appendChild(divisore)

    let contatoreSpesa = document.createElement('li')
    contatoreSpesa.innerHTML = `<li class="dropdown-item">Totale carrello: ${totaleSpesa} €</li>`
    carrelloContainer.appendChild(contatoreSpesa)
}

function rimuoviCarrello(id) {
    
    carrello.forEach((element,index) => {
        let idElemento = element._id

        if (idElemento === id) {
            // console.log("hai premuto " + element.name)
            carrello.splice(index)
        }
    })

    alert("Prodotto rimosso dal carrello")

    aggiornaCarrello()
}