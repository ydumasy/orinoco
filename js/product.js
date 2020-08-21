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
            let footer = document.querySelector('footer');
            footer.classList.remove('fixed-bottom');
            
            let teddies = JSON.parse(response);
            for (let i = 0 ; i < teddies.length ; i++) {
                let carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                if (i === 0) carouselItem.classList.add('active');
                carouselInner.appendChild(carouselItem);

                let teddieImg = document.createElement('img');
                teddieImg.src = teddies[i].imageUrl;
                teddieImg.alt = "Ours en peluche";
                teddieImg.classList.add('d-block', 'w-100');
                carouselItem.appendChild(teddieImg);

                let teddieName = document.createElement('h1');
                teddieName.textContent = teddies[i].name;
                teddieName.classList.add('text-center', 'mt-3');
                carouselItem.appendChild(teddieName);

                let teddieDescription = document.createElement('p');
                teddieDescription.textContent = teddies[i].description;
                teddieDescription.classList.add('text-center', 'font-italic');
                carouselItem.appendChild(teddieDescription);

                let rowColor = document.createElement('div');
                rowColor.classList.add('row');
                carouselItem.appendChild(rowColor);
                let labelColor = document.createElement('label');
                labelColor.setAttribute('for', 'teddieColor' + i);
                labelColor.classList.add('col-3', 'col-form-label');
                labelColor.textContent = 'Couleur :';
                rowColor.appendChild(labelColor);
                let teddieColor = document.createElement('select');
                teddieColor.id = 'teddieColor' + i;
                teddieColor.classList.add('col-4', 'form-control');
                rowColor.appendChild(teddieColor); 
                for (let j = 0 ; j < teddies[i].colors.length ; j++) {
                    let option = document.createElement('option');
                    if (i === 0) option.setAttribute('selected', '');
                    option.textContent = teddies[i].colors[j];
                    teddieColor.appendChild(option);
                }

                let quantity = selectQuantity(carouselItem, teddies[i]);

                let teddiePrice = document.createElement('p');
                teddiePrice.classList.add('mt-3');
                teddiePrice.textContent = "Prix : " + teddies[i].price / 100 + " €";
                carouselItem.appendChild(teddiePrice);

                calculatePrice(teddies[i], teddiePrice, quantity);

                let addCart = document.createElement('button');
                addCart.classList.add('btn', 'btn-primary', 'btn-block');
                addCart.textContent = "Ajouter au panier";
                carouselItem.appendChild(addCart);
            }
        });
        break;
        
    case '?id=cameras':
        ajaxGet('http://localhost:3000/api/cameras', function(response) {
            let footer = document.querySelector('footer');
            footer.classList.remove('fixed-bottom');
            
            let cameras = JSON.parse(response);
            for (let i = 0 ; i < cameras.length ; i++) {
                let carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                if (i === 0) carouselItem.classList.add('active');
                carouselInner.appendChild(carouselItem);

                let cameraImg = document.createElement('img');
                cameraImg.src = cameras[i].imageUrl;
                cameraImg.alt = "Caméra vintage";
                cameraImg.classList.add('d-block', 'w-100');
                carouselItem.appendChild(cameraImg);

                let cameraName = document.createElement('h1');
                cameraName.textContent = cameras[i].name;
                cameraName.classList.add('text-center', 'mt-3');
                carouselItem.appendChild(cameraName);

                let cameraDescription = document.createElement('p');
                cameraDescription.textContent = cameras[i].description;
                cameraDescription.classList.add('text-center', 'font-italic');
                carouselItem.appendChild(cameraDescription);

                let rowLens = document.createElement('div');
                rowLens.classList.add('row');
                carouselItem.appendChild(rowLens);
                let labelLens = document.createElement('label');
                labelLens.setAttribute('for', 'teddieColor' + i);
                labelLens.classList.add('col-3', 'col-form-label');
                labelLens.textContent = 'Lentille :';
                rowLens.appendChild(labelLens);
                let cameraLens = document.createElement('select');
                cameraLens.id = 'cameraLens' + i;
                cameraLens.classList.add('col-4', 'form-control');
                rowLens.appendChild(cameraLens); 
                for (let j = 0 ; j < cameras[i].lenses.length ; j++) {
                    let option = document.createElement('option');
                    if (i === 0) option.setAttribute('selected', '');
                    option.textContent = cameras[i].lenses[j];
                    cameraLens.appendChild(option);
                }

                let quantity = selectQuantity(carouselItem, cameras[i]);

                let cameraPrice = document.createElement('p');
                cameraPrice.classList.add('mt-3');
                cameraPrice.textContent = "Prix : " + cameras[i].price / 100 + " €";
                carouselItem.appendChild(cameraPrice);

                calculatePrice(cameras[i], cameraPrice, quantity);

                let addCart = document.createElement('button');
                addCart.textContent = "Ajouter au panier";
                carouselItem.appendChild(addCart);

                let addCart = document.createElement('button');
                addCart.classList.add('btn', 'btn-primary', 'btn-block');
                addCart.textContent = "Ajouter au panier";
                carouselItem.appendChild(addCart);
            }
        });
        break;

    case '?id=furniture':
        ajaxGet('http://localhost:3000/api/furniture', function(response) {
            let footer = document.querySelector('footer');
            footer.classList.remove('fixed-bottom');
            
            let furniture = JSON.parse(response);
            for (let i = 0 ; i < furniture.length ; i++) {
                let carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                if (i === 0) carouselItem.classList.add('active');
                carouselInner.appendChild(carouselItem);

                let furnitureImg = document.createElement('img');
                furnitureImg.src = furniture[i].imageUrl;
                furnitureImg.alt = "Meuble en chêne";
                furnitureImg.classList.add('d-block', 'w-100');
                carouselItem.appendChild(furnitureImg);

                let furnitureName = document.createElement('h1');
                furnitureName.textContent = furniture[i].name;
                furnitureName.classList.add('text-center', 'mt-3');
                carouselItem.appendChild(furnitureName);

                let furnitureDescription = document.createElement('p');
                furnitureDescription.textContent = furniture[i].description;
                furnitureDescription.classList.add('text-center', 'font-italic');
                carouselItem.appendChild(furnitureDescription);

                let rowVarnish = document.createElement('div');
                rowVarnish.classList.add('row');
                carouselItem.appendChild(rowVarnish);
                let labelVarnish = document.createElement('label');
                labelVarnish.setAttribute('for', 'teddieColor' + i);
                labelVarnish.classList.add('col-3', 'col-form-label');
                labelVarnish.textContent = 'Vernis :';
                rowVarnish.appendChild(labelVarnish);
                let furnitureVarnish = document.createElement('select');
                furnitureVarnish.id = 'furnitureVarnish' + i;
                furnitureVarnish.classList.add('col-4', 'form-control');
                rowVarnish.appendChild(furnitureVarnish); 
                for (let j = 0 ; j < furniture[i].varnish.length ; j++) {
                    let option = document.createElement('option');
                    if (i === 0) option.setAttribute('selected', '');
                    option.textContent = furniture[i].varnish[j];
                    furnitureVarnish.appendChild(option);
                }

                let quantity = selectQuantity(carouselItem, furniture[i]);

                let furniturePrice = document.createElement('p');
                furniturePrice.classList.add('mt-3');
                furniturePrice.textContent = "Prix : " + furniture[i].price / 100 + " €";
                carouselItem.appendChild(furniturePrice);

                calculatePrice(furniture[i], furniturePrice, quantity);

                let addCart = document.createElement('button');
                addCart.classList.add('btn', 'btn-primary', 'btn-block');
                addCart.textContent = "Ajouter au panier";
                carouselItem.appendChild(addCart);
            }
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