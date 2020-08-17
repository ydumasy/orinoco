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