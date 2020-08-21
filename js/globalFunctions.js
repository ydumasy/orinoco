// Fonction permettant d'effectuer une requête HTTP asynchrone
function ajaxGet(url, callback) {
    let req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function() {
        if (req.status >= 200 && req.status < 400) {
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function() {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}


// Fonction permettant de choisir la quantité de produits voulue
function selectQuantity(item, product) {
    let rowQuantity = document.createElement('div');
    rowQuantity.classList.add('row');
    item.appendChild(rowQuantity);
    let labelQuantity = document.createElement('label');
    labelQuantity.setAttribute('for', product.name);
    labelQuantity.classList.add('col-3', 'col-form-label', 'mt-3');
    labelQuantity.textContent = 'Quantité :';
    rowQuantity.appendChild(labelQuantity);
    let quantity = document.createElement('select');
    quantity.id = product.name;
    quantity.classList.add('col-2', 'form-control', 'mt-3');
    rowQuantity.appendChild(quantity);
    for (let i = 1 ; i <= 9 ; i++) {
        let option = document.createElement('option');
        if (i === 0) option.setAttribute('selected', '');
        option.textContent = i;
        quantity.appendChild(option);
    }
    return quantity;
}

// Fonction permettant de recalculer le prix en fonction de la quantité choisie
function calculatePrice(product, price, quantity) {
    quantity.addEventListener('change', function(e) {
    price.textContent = "Prix : " + product.price * e.target.options[e.target.selectedIndex].text / 100 + " €";
    });
}