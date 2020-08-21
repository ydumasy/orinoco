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


// Affichage de la page produit en fonction de la catégorie de produits choisie

function showProducts(products) {
    for (let i = 0 ; i < products.length ; i++) {
        let carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (i === 0) carouselItem.classList.add('active');
        carouselInner.appendChild(carouselItem);

        let img = document.createElement('img');
        img.src = products[i].imageUrl;
        if (img.src.indexOf('teddy') !== -1) {
            img.alt = "Ours en peluche";
        } else if (img.src.indexOf('vcam') !== -1) {
            img.alt = "Caméra vintage";
        } else if (img.src.indexOf('oak') !== -1) {
            img.alt = "Meuble en chêne";
        }
        img.classList.add('d-block', 'w-100');
        carouselItem.appendChild(img);

        let name = document.createElement('h1');
        name.textContent = products[i].name;
        name.classList.add('text-center', 'mt-3');
        carouselItem.appendChild(name);

        let description = document.createElement('p');
        description.textContent = products[i].description;
        description.classList.add('text-center', 'font-italic');
        carouselItem.appendChild(description);

        let rowAttribute = document.createElement('div');
        rowAttribute.classList.add('row');
        carouselItem.appendChild(rowAttribute);
        let labelAttribute = document.createElement('label');
        labelAttribute.setAttribute('for', 'attribute' + i);
        labelAttribute.classList.add('offset-1', 'offset-sm-0', 'col-sm-3', 'col-form-label');
        if (img.src.indexOf('teddy') !== -1) {
            labelAttribute.textContent = 'Couleur :';
        } else if (img.src.indexOf('vcam') !== -1) {
            labelAttribute.textContent = 'Lentille :';
        } else if (img.src.indexOf('oak') !== -1) {
            labelAttribute.textContent = 'Vernis :';
        }
        rowAttribute.appendChild(labelAttribute);
        let attribute = document.createElement('select');
        attribute.id = 'attribute' + i;
        attribute.classList.add('offset-1', 'col-10', 'offset-sm-0', 'col-sm-4', 'form-control');
        rowAttribute.appendChild(attribute); 
        if (img.src.indexOf('teddy') !== -1) {
            for (let j = 0 ; j < products[i].colors.length ; j++) {
                let option = document.createElement('option');
                if (i === 0) option.setAttribute('selected', '');
                option.textContent = products[i].colors[j];
                attribute.appendChild(option);
            }
        } else if (img.src.indexOf('vcam') !== -1) {
            for (let j = 0 ; j < products[i].lenses.length ; j++) {
                let option = document.createElement('option');
                if (i === 0) option.setAttribute('selected', '');
                option.textContent = products[i].lenses[j];
                attribute.appendChild(option);
            }
        } else if (img.src.indexOf('oak') !== -1) {
            for (let j = 0 ; j < products[i].varnish.length ; j++) {
                let option = document.createElement('option');
                if (i === 0) option.setAttribute('selected', '');
                option.textContent = products[i].varnish[j];
                attribute.appendChild(option);
            }
        }

        let quantity = selectQuantity(carouselItem, products[i]);

        let price = document.createElement('p');
        price.classList.add('offset-1', 'offset-sm-0', 'mt-3');
        price.textContent = "Prix : " + products[i].price / 100 + " €";
        carouselItem.appendChild(price);

        calculatePrice(products[i], price, quantity);

        let addCart = document.createElement('button');
        addCart.classList.add('btn', 'btn-primary', 'btn-block');
        addCart.textContent = "Ajouter au panier";
        carouselItem.appendChild(addCart);

        let footer = document.querySelector('footer');
        footer.classList.remove('fixed-bottom');
    }
}

// Choix du nombre de produits
function selectQuantity(item, product) {
    let rowQuantity = document.createElement('div');
    rowQuantity.classList.add('row');
    item.appendChild(rowQuantity);
    let labelQuantity = document.createElement('label');
    labelQuantity.setAttribute('for', product.name);
    labelQuantity.classList.add('offset-1', 'offset-sm-0', 'col-sm-3', 'col-form-label', 'mt-3');
    labelQuantity.textContent = 'Quantité :';
    rowQuantity.appendChild(labelQuantity);
    let quantity = document.createElement('select');
    quantity.id = product.name;
    quantity.classList.add('offset-1', 'col-10', 'offset-sm-0', 'col-sm-2', 'form-control', 'mt-3');
    rowQuantity.appendChild(quantity);
    for (let i = 1 ; i <= 9 ; i++) {
        let option = document.createElement('option');
        if (i === 0) option.setAttribute('selected', '');
        option.textContent = i;
        quantity.appendChild(option);
    }
    return quantity;
}

// Calcul du prix en fonction de la quantité choisie
function calculatePrice(product, price, quantity) {
    quantity.addEventListener('change', function(e) {
    price.textContent = "Prix : " + product.price * e.target.options[e.target.selectedIndex].text / 100 + " €";
    });
}