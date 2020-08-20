// Mise en place des éléments communs aux différents carousels
let main = document.createElement('main');
main.classList.add('container');
document.body.appendChild(main);

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
carouselControlPrev.role = 'button';
carouselControlPrev.setAttribute('data-slide', 'prev');
carouselControls.appendChild(carouselControlPrev);
let carouselControlPrevIcon = document.createElement('span');
carouselControlPrevIcon.classList.add('carousel-control-prev-icon');
carouselControlPrevIcon.setAttribute('aria-hidden', 'true');
carouselControlPrev.appendChild(carouselControlPrevIcon);

let carouselControlNext = document.createElement('a');
carouselControlNext.classList.add('carousel-control-next');
carouselControlNext.href = '#carouselControls';
carouselControlNext.role = 'button';
carouselControlNext.setAttribute('data-slide', 'next');
carouselControls.appendChild(carouselControlNext);
let carouselControlNextIcon = document.createElement('span');
carouselControlNextIcon.classList.add('carousel-control-next-icon');
carouselControlNextIcon.setAttribute('aria-hidden', 'true');
carouselControlNext.appendChild(carouselControlNextIcon);

let carouselItem = document.createElement('div');
carouselItem.classList.add('carousel-item', 'active');
carouselInner.appendChild(carouselItem);

// Mise en place des éléments propres à chaque catégorie de produits
let url = location.search;

switch(url) {
    case '?id=teddies':
        ajaxGet('http://localhost:3000/api/teddies', function(response) {
            let teddies = JSON.parse(response);
            for(let teddie of teddies) {
                let carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                carouselInner.appendChild(carouselItem);

                let teddieImg = document.createElement('img');
                teddieImg.src = teddie.imageUrl;
                teddieImg.alt = "Ours en peluche";
                teddieImg.classList.add('d-block', 'w-100');
                carouselItem.appendChild(teddieImg);
            }
        });
        break;
    case '?id=cameras':
        break;
    case '?id=furniture':
        break;
}

/*
// Affichage de la page en fonction du produit choisi

let url = location.search;

    if (url === '?id=teddies') {
        teddies.style.display = 'block';
        document.querySelector('footer').classList.remove('fixed-bottom');
    } else if (url === '?id=cameras') {
        cameras.style.display = 'block';
        document.querySelector('footer').classList.remove('fixed-bottom');
    } else if (url === '?id=furniture') {
        furniture.style.display = 'block';
        document.querySelector('footer').classList.remove('fixed-bottom');
    }

// Modification du prix en fonction de la quantité choisie

let formElts = document.getElementsByTagName('form');

for (i = 0 ; i < formElts.length ; i++) {
    let oldPrice = document.createElement('input');
    oldPrice.value = formElts[i].price.value;
    
    formElts[i].addEventListener('change', function() {
        this.price.value = oldPrice.value;
        this.price.value = parseInt(this.price.value, 10) * parseInt(this.quantity.options[this.quantity.selectedIndex].text, 10) + " €";
    });
}

// Confirmation de l'ajout au panier
for (i = 0 ; i < formElts.length ; i++) {
    formElts[i].addEventListener('submit', function() {
        alert("Votre produit a bien été ajouté au panier");
        document.location.href = "cart.html";
    });
}
*/