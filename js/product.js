// Mise en place des éléments communs aux différents carousels
let footer = document.querySelector('footer');

let main = document.createElement('main');
main.classList.add('container');
document.body.insertBefore(main, footer);

let row = document.createElement('div');
row.classList.add('row', 'my-5');
main.appendChild(row);

let divElt = document.createElement('div');
divElt.classList.add('col', 'offset-lg-3', 'col-lg-6');
row.appendChild(divElt);

let carouselControls = document.createElement('div');
carouselControls.id = 'carouselControls';
carouselControls.classList.add('carousel', 'slide');
carouselControls.setAttribute('data-ride', 'carousel');
carouselControls.setAttribute('data-interval', 'false');
divElt.appendChild(carouselControls);

let carouselInner = document.createElement('div');
carouselInner.classList.add('carousel-inner');
carouselControls.appendChild(carouselInner);

let carouselControlPrev = document.createElement('a');
carouselControlPrev.classList.add('carousel-control-prev');
carouselControlPrev.href = '#carouselControls';
carouselControlPrev.setAttribute('role', 'button');
carouselControlPrev.setAttribute('data-slide', 'prev');
carouselControls.appendChild(carouselControlPrev);
let carouselControlPrevIcon = document.createElement('span');
carouselControlPrevIcon.classList.add('carousel-control-prev-icon');
carouselControlPrevIcon.setAttribute('aria-hidden', 'true');
carouselControlPrev.appendChild(carouselControlPrevIcon);

let carouselControlNext = document.createElement('a');
carouselControlNext.classList.add('carousel-control-next');
carouselControlNext.href = '#carouselControls';
carouselControlNext.setAttribute('role', 'button');
carouselControlNext.setAttribute('data-slide', 'next');
carouselControls.appendChild(carouselControlNext);
let carouselControlNextIcon = document.createElement('span');
carouselControlNextIcon.classList.add('carousel-control-next-icon');
carouselControlNextIcon.setAttribute('aria-hidden', 'true');
carouselControlNext.appendChild(carouselControlNextIcon);

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

        let rowQuantity = document.createElement('div');
        rowQuantity.classList.add('row');
        carouselItem.appendChild(rowQuantity);
        let labelQuantity = document.createElement('label');
        labelQuantity.setAttribute('for', products[i].name);
        labelQuantity.classList.add('offset-1', 'offset-sm-0', 'col-sm-3', 'col-form-label', 'mt-3');
        labelQuantity.textContent = 'Quantité :';
        rowQuantity.appendChild(labelQuantity);
        let quantity = document.createElement('select');
        quantity.classList.add('offset-1', 'col-10', 'offset-sm-0', 'col-sm-2', 'form-control', 'mt-3');
        rowQuantity.appendChild(quantity);
        for (let i = 1 ; i <= 9 ; i++) {
            let option = document.createElement('option');
            if (i === 0) option.setAttribute('selected', '');
            option.textContent = i;
            quantity.appendChild(option);
        }

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

let url = location.search;

switch(url) {
    case '?id=teddies':
        ajaxGet('http://localhost:3000/api/teddies')
            .then (function(response) {
                let teddies = response;
                showProducts(teddies);
            });
        break;
        
    case '?id=cameras':
        ajaxGet('http://localhost:3000/api/cameras')
            .then (function(response) {
                let cameras = response;
                showProducts(cameras);
            });
        break;

    case '?id=furniture':
        ajaxGet('http://localhost:3000/api/furniture')
            .then (function(response) {
                let furniture = response;
                showProducts(furniture);
            });
        break;
}

// Calcul du prix en fonction de la quantité choisie
function calculatePrice(product, price, quantity) {
    quantity.addEventListener('change', function(e) {
    price.textContent = "Prix : " + product.price * e.target.options[e.target.selectedIndex].text / 100 + " €";
    });
}