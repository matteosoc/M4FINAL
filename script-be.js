var token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4Mzg4NThmYzBmMzAwMTU1ZTVhYmMiLCJpYXQiOjE3MTgyMTg5NTYsImV4cCI6MTcxOTQyODU1Nn0.jlZJGhJxPctJiVJxkcNfr3WFcQinp0z91HC29l8_BE4"

document.addEventListener("DOMContentLoaded", () => {
    aggiornaProdotti()
})

function addProduct() {
    const getName = document.getElementById("name").value;
    console.log(getName);

    const getDescription = document.getElementById("description").value;
    console.log(getDescription);

    const getBrand = document.getElementById("brand").value;
    console.log(getBrand);

    const getImageUrl = document.getElementById("imageUrl").value;
    console.log(getImageUrl);

    const getPrice = document.getElementById("price").value;
    console.log(getPrice);

    if ((getName !== "") && (getDescription !== "") && (getBrand !== "") && (getImageUrl !== "") && (getPrice !== "")) {

    fetch("https://striveschool-api.herokuapp.com/api/product/", {
        method: "POST",
        headers: {
            "Authorization": token,
            "content-type": "application/json"
        },
        body: JSON.stringify({
            name: getName,
            description: getDescription,
            brand: getBrand,
            imageUrl: getImageUrl,
            price: getPrice
        })
    })
    .then(response => {
        if (response.status === 200) {
            aggiornaProdotti()
            renderModal("Notifica","Prodotto caricato correttamente",["Prosegui","closeModal()"],null,3000)

        } else {
            renderModal("errore","articolo già in magazzino")
        }
    })
    } else {
        renderModal("Errore nel caricamento","Non hai compilato tutti i campi",["Prosegui","closeModal()"],null,3000)
    }

}


function aggiornaProdotti() {
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
        headers: {
            "Authorization": token,
             "Content-Type": "application/json"
        }
    })
        .then(response => {
            return response.json()
        })
        .then(data => {
            const containerProducts = document.querySelector(".t-body")
            containerProducts.innerHTML = ""
            

            data.forEach(element => {

                console.log(element)

                let trProduct = document.createElement('tr')
                trProduct.classList.add("tableRow")

                let tdId = document.createElement('td')
                tdId.innerHTML = element._id
                trProduct.append(tdId)

                let tdName = document.createElement('td')
                tdName.innerHTML = element.name
                trProduct.append(tdName)

                let tdDescription = document.createElement('td')
                tdDescription.innerHTML = element.description
                trProduct.append(tdDescription)

                let tdBrand = document.createElement('td')
                tdBrand.innerHTML = element.brand
                trProduct.append(tdBrand)

                let tdImage = document.createElement('td')
                tdImage.innerHTML = element.imageUrl
                trProduct.append(tdImage)

                let tdPrice = document.createElement('td')
                tdPrice.innerHTML = element.price
                trProduct.append(tdPrice)


                let tdEdit = document.createElement('td')
                tdEdit.setAttribute("onclick", `primostepEdit("${element._id}")`)
                tdEdit.innerHTML = `<ion-icon name="create-outline"></ion-icon>`
                trProduct.append(tdEdit)

                let tdDelete = document.createElement('td')
                tdDelete.setAttribute("onclick", `primostepDelete("${element._id}")`)
                tdDelete.innerHTML = `<ion-icon name="trash-outline"></ion-icon>`
                trProduct.append(tdDelete)

                containerProducts.appendChild(trProduct)
            })
        })
}

function primostepEdit(id) {
    document.getElementById("id").value = id

    document.getElementById("secModalId").classList.add("d-block")
}

function editProduct() {
    let editId = document.getElementById("id").value

    console.log("modifico " + editId)



    const editName = document.getElementById("editName").value;

    const editDescription = document.getElementById("editDescription").value;

    const editBrand = document.getElementById("editBrand").value;

    const editImageUrl = document.getElementById("editImageUrl").value;

    const editPrice = document.getElementById("editPrice").value;

    fetch("https://striveschool-api.herokuapp.com/api/product/" + editId, {
        method: "PUT",
        headers: {
            "Authorization": token,
            "content-type": "application/json"
        },
        body: JSON.stringify({
            name: editName,
            description: editDescription,
            brand: editBrand,
            imageUrl: editImageUrl,
            price: editPrice
        })
    }).then(variabile => {
    aggiornaProdotti()
    })

    closeModal()
}

function primostepDelete(id) {
    renderModal("Cancella prodotto","Sei sicuro di voler cancellare il prodotto?",["Cancella","deleteProduct(\"" + id + "\")"],["Annulla","closeModal()"],null)
}

function deleteProduct(id) {
    console.log("cancello " + id)

    fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
        method: "DELETE",
        headers: {
            "Authorization": token,
            "content-type": "application/json"
        }
    })

    aggiornaProdotti()
    closeModal()
}

function renderModal (title,message,ok,cancel,temp) {
    document.querySelector(".modal-footer").innerHTML = ""

    console.log(ok)
    //<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    //<button type="button" class="btn btn-primary">Save changes</button>

    let modalDiv = document.getElementById("modalId")
    modalDiv.classList.add("d-block")

    document.querySelector(".modal-title").innerHTML = title
    document.querySelector(".modal-body").innerHTML = message

    
    if (cancel !== null) {
        document.querySelector(".modal-footer").innerHTML += "<button type='button' class='btn btn-secondary' data-bs-dismiss='modal' onclick='"+ cancel[1] + "'>" + cancel[0] + "</button>"
    }

    if (ok !== null) {
        document.querySelector(".modal-footer").innerHTML += "<button type='button' class='btn btn-primary' onclick='"+ ok[1] +"' >" + ok[0] + "</button>"
    }
    
    if (temp !== null) {
        setTimeout (() => {
            closeModal()
        },temp)
    }

    svuotaCampi()
}

function closeModal() {
    let modalDiv = document.getElementById("modalId")
    modalDiv.classList.remove("d-block")

    let secModalDiv = document.getElementById("secModalId")
    secModalDiv.classList.remove("d-block")
}


function searchStart() {
    let searchValue = document.getElementById("searchBar").value.toLowerCase();
    console.log(searchValue);

    let tableRows = document.querySelectorAll(".tableRow");
    console.log(tableRows);

    tableRows.forEach(tableRow => {
        let tableContent = tableRow.innerHTML.toLowerCase();
        if (tableContent.includes(searchValue)) {
            tableRow.style.display = 'table-row';
            console.log("mostralo");
        } else {
            tableRow.style.display = 'none';
            console.log("non mostrarlo");
        }
    });
}


function svuotaCampi() {
    document.getElementById("name").value = ""
    document.getElementById("description").value = ""
    document.getElementById("brand").value = ""
    document.getElementById("imageUrl").value = ""
    document.getElementById("price").value = ""
    
}