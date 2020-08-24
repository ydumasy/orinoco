// Fonction avec promesse permettant d'effectuer une requête HTTP asynchrone
function ajaxGet(url) {
    let req = new XMLHttpRequest();
    return new Promise ((resolve, reject) => {
        req.open("GET", url);
        req.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status >= 200 && this.status < 400) {
                    resolve(JSON.parse(req.responseText));
                } else {
                    reject(console.error(req.status + " " + req.statusText + " " + url));
                }
            }
        };
        req.send(null);
    });
}

// Modification du header en fonction du nombre de produits présents dans le panier
function headerModifications() {
    let cart = document.getElementById('cart');
    let cartContent = JSON.parse(localStorage.getItem('cartContent'));
    
    if (cartContent !== null) cart.textContent += "(" + cartContent.length + ")";
}
headerModifications();

// Calcul du prix en fonction de la quantité choisie
function calculatePrice(product, price, quantity) {
    price.textContent = "Prix : " + (product.price * quantity) / 100 + " €";
    console.log(price.textContent);
}

