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

// Mise en place des éléments propres à chaque catégorie de produits
let url = location.search;

switch(url) {
    case '?id=teddies':
        ajaxGet('http://localhost:3000/api/teddies', function(response) {
            let teddies = JSON.parse(response);
            showProducts(teddies);
        });
        break;
        
    case '?id=cameras':
        ajaxGet('http://localhost:3000/api/cameras', function(response) {
            let cameras = JSON.parse(response);
            showProducts(cameras);
        });
        break;

    case '?id=furniture':
        ajaxGet('http://localhost:3000/api/furniture', function(response) {
            let furniture = JSON.parse(response);
            showProducts(furniture);
        });
        break;
}

/*
// Confirmation de l'ajout au panier
for (i = 0 ; i < formElts.length ; i++) {
    formElts[i].addEventListener('submit', function() {
        alert("Votre produit a bien été ajouté au panier");
        document.location.href = "cart.html";
    });
}
*/