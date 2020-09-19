let order = JSON.parse(sessionStorage.getItem('order'));
console.log(order);

let main = document.querySelector('main');
let productsContainer = document.getElementById('products-container');
let contactContainer = document.getElementById('contact-container');
let commandId = document.getElementById('command-id');

// Affichage des produits commandés
showArticles(productsContainer, order);

// Affichage des informations de contact   
showClientInformations(contactContainer, order); 

// Affichage de l'identifiant de commande
commandId.innerHTML = '<em>' + order.orderId + '</em>'

// Fonction d'affichage des produits commandés
function showArticles(container, order) {
    let productsTitle = document.getElementById('products-title');
    if (order.products.length < 2) productsTitle.textContent = "Pour rappel, voici le produit que vous avez commandé :";

    for (let article of order.products) {
        let colLeft = document.createElement('div');
        colLeft.classList.add('col-12', 'col-sm-6', 'col-lg-4');
        container.appendChild(colLeft);
        let colRight = document.createElement('div');
        colRight.classList.add('col-12', 'col-sm-6', 'text-center', 'text-sm-left', 'col-confirm');
        container.appendChild(colRight);

        let productImage = document.createElement('img');
        productImage.src = article.imageUrl;
        productImage.style.width = '100%';
        productImage.alt = 'Ours en peluche';
        colLeft.appendChild(productImage);

        let productName = document.createElement('h1');
        productName.classList.add('product-name');
        productName.textContent = article.name;
        colRight.appendChild(productName);

        let productRef = document.createElement('p');
        productRef.innerHTML = '<em>Référence</em> : ' + article._id;
        colRight.appendChild(productRef);
    }
}

// Fonction d'affichage des informations de contact
function showClientInformations(container, order) {
    let clientName = document.createElement('div');
    clientName.innerHTML = '<span class="strong">Nom</span> : ' + order.contact.lastName;
    container.appendChild(clientName);

    let clientFirstName = document.createElement('div');
    clientFirstName.innerHTML = '<span class="strong">Prénom</span> : ' + order.contact.firstName;
    container.appendChild(clientFirstName);

    let clientAddress = document.createElement('div');
    clientAddress.innerHTML = '<span class="strong">Adresse</span> : ' + order.contact.address;
    container.appendChild(clientAddress);

    let clientCity = document.createElement('div');
    clientCity.innerHTML = '<span class="strong">Ville</span> : ' + order.contact.city;
    container.appendChild(clientCity);

    let clientMail = document.createElement('div');
    clientMail.innerHTML = '<span class="strong">E-mail</span> : ' + order.contact.email;
    container.appendChild(clientMail);
}