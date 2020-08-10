let url = location.search;

// Affichage de la page en fonction du produit choisi
const removeChild = () => {
    let footer = document.querySelector('footer');

    if (url === '?id=teddy') {
        productTeddy.classList.add("mt-5");

        productCamera.parentNode.removeChild(productCamera);
        productFurniture.parentNode.removeChild(productFurniture);

        footer.classList.add('fixed-bottom');
    } else if (url === '?id=camera') {
        productCamera.classList.add("mt-5");

        productCamera.parentNode.removeChild(productTeddy);
        productFurniture.parentNode.removeChild(productFurniture);

        footer.classList.add('fixed-bottom');
    } else if (url === '?id=furniture') {
        productFurniture.classList.add("mt-5");

        productTeddy.parentNode.removeChild(productTeddy);
        productCamera.parentNode.removeChild(productCamera);

        footer.classList.add('fixed-bottom');
    }
}

removeChild();