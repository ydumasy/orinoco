let url = location.search;

// Affichage de la page en fonction du produit choisi
const showProduct = () => {
    if (url === '?id=teddies') {
        productTeddies.style.display = 'block';
    } else if (url === '?id=cameras') {
        productCameras.style.display = 'block';
    } else if (url === '?id=furniture') {
        productFurniture.style.display = 'block';
    }
}

showProduct();

//Modification du prix en fonction de la quantité choisie
let formElts = document.getElementsByTagName('form');

for (i = 0 ; i < formElts.length ; i++) {
    let oldPrice = document.createElement('input');
    oldPrice.value = formElts[i].price.value;
    
    formElts[i].addEventListener('change', function() {
        this.price.value = oldPrice.value;
        this.price.value = parseInt(this.price.value, 10) * parseInt(this.quantity.options[this.quantity.selectedIndex].text, 10) + " €";
    });
}