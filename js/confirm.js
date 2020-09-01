let order = JSON.parse(sessionStorage.getItem('order'));
console.log(order);

let main = document.querySelector('main');
let products = document.getElementById('products');
let contact = document.getElementById('contact');
let command = document.getElementById('command');

// Affichage des informations produits
for (let article of order.products) {
    let colLeft = document.createElement('div');
    colLeft.classList.add('col-12', 'col-sm-6', 'col-lg-4');
    products.appendChild(colLeft);
    let colRight = document.createElement('div');
    colRight.classList.add('col-12', 'col-sm-6', 'text-center', 'text-sm-left', 'col-confirm');
    products.appendChild(colRight);

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

// Affichage des informations de contact    
let clientName = document.createElement('div');
clientName.innerHTML = '<span class="strong">Nom</span> : ' + order.contact.lastName;
contact.appendChild(clientName);

let clientFirstName = document.createElement('div');
clientFirstName.innerHTML = '<span class="strong">Prénom</span> : ' + order.contact.firstName;
contact.appendChild(clientFirstName);

let clientAddress = document.createElement('div');
clientAddress.innerHTML = '<span class="strong">Adresse</span> : ' + order.contact.address;
contact.appendChild(clientAddress);

let clientCity = document.createElement('div');
clientCity.innerHTML = '<span class="strong">Ville</span> : ' + order.contact.city;
contact.appendChild(clientCity);

let clientMail = document.createElement('div');
clientMail.innerHTML = '<span class="strong">E-mail</span> : ' + order.contact.email;
contact.appendChild(clientMail);

// Affichage de l'identifiant de commande
command.innerHTML = '<em>' + order.orderId + '</em>'

let footer = document.querySelector('footer');
footer.classList.remove('fixed-bottom');