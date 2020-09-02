// Fonctions avec promesses permettant d'effectuer des requêtes HTTP asynchrones
function ajaxGet(url) {
    let req = new XMLHttpRequest();
    return new Promise ((resolve, reject) => {
        req.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status >= 200 && this.status < 400) {
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject(console.error(this.status + " " + this.statusText + " " + url));
                }
            }
        };
        req.open("GET", url);
        req.send(null);
    });
}

function ajaxPost(url, data) {
    let req = new XMLHttpRequest();
    return new Promise ((resolve, reject) => {
        req.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status >= 200 && this.status < 400) {
                    resolve(this.responseText);
                } else {
                    reject(console.error(this.status + " " + this.statusText + " " + url));
                }
            }
        };
        req.open("POST", url);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(data);
    });
}

// Modification du header en fonction du nombre de produits présents dans le panier
function headerModifications() {
    let cart = document.getElementById('cart');
    let cartContent = JSON.parse(localStorage.getItem('cartContent'));
    
    if (cartContent !== null && cartContent.length > 0) cart.textContent = "Mon Panier(" + cartContent.length + ")";
}
headerModifications();

// Calcul du prix en fonction de la quantité choisie
function calculatePrice(price, quantity) {
    if (price < 0 && quantity <1) {
        console.error("Prix et quantité incorrects");
    } else if (price < 0) {
        console.error("Prix incorrect");
    } else if (quantity < 1) {
        console.error("Quantité incorrecte");
    } else {
        return (price * quantity) / 100;
    }
}

