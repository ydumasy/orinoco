let cartContent = JSON.parse(localStorage.getItem('cartContent'));
let main = document.querySelector('main');

// Affichage du panier d'achat si celui-ci n'est pas vide
if (cartContent !== null && cartContent.length > 0) {
    while (main.firstChild) main.removeChild(main.firstChild);
    main.classList.remove('container-size');

    for (let i in cartContent) {
        let rowElt = document.createElement('div');
        rowElt.classList.add('row', 'my-3');
        main.appendChild(rowElt);

        let colLeft = document.createElement('div');
        colLeft.classList.add('col-12', 'col-sm-6', 'col-lg-4');
        rowElt.appendChild(colLeft);
        let colRight = document.createElement('div');
        colRight.classList.add('col-12', 'col-sm-6', 'text-center', 'text-sm-left', 'col-right');
        rowElt.appendChild(colRight);

        let productImage = document.createElement('img');
        productImage.src = cartContent[i].image;
        productImage.style.width = '100%';
        productImage.alt = 'Ours en peluche';
        colLeft.appendChild(productImage);

        let productName = document.createElement('h1');
        productName.classList.add('mt-3', 'product-name');
        productName.textContent = cartContent[i].name;
        colRight.appendChild(productName);

        let rowQuantity = document.createElement('div');
        let quantity = document.createElement('p');
        quantity.style.display = 'inline';
        quantity.textContent = "Quantité : " + cartContent[i].quantity;
        let addButton = document.createElement('button');
        addButton.classList.add('btn', 'btn-light', 'mx-3');
        addButton.textContent = "+";
        let removeButton = document.createElement('button');
        removeButton.classList.add('btn', 'btn-light');
        removeButton.textContent = "-";    
        colRight.appendChild(rowQuantity);  
        rowQuantity.appendChild(quantity);
        rowQuantity.appendChild(addButton);
        rowQuantity.appendChild(removeButton);

        // Possibilité de modifier la quantité de produits demandée
        addButton.addEventListener('click', function() {
            cartContent[i].quantity++;
            calculatePrice(cartContent[i], price, cartContent[i].quantity);
            quantity.textContent = "Quantité : " + cartContent[i].quantity;
            totalPrice.textContent = "Prix total : " + calculateTotalPrice(cartContent) + " €";
            localStorage.setItem('cartContent', JSON.stringify(cartContent));
        });
        removeButton.addEventListener('click', function() {
            if (cartContent[i].quantity > 1) {
                cartContent[i].quantity--;
                calculatePrice(cartContent[i], price, cartContent[i].quantity);
                quantity.textContent = "Quantité : " + cartContent[i].quantity;
                totalPrice.textContent = "Prix total : " + calculateTotalPrice(cartContent) + " €";
                localStorage.setItem('cartContent', JSON.stringify(cartContent));
            } else {
                if (confirm("Voulez-vous vraiment retirer ce produit du panier ?")) {
                    cartContent.splice(i, 1);
                    localStorage.setItem('cartContent', JSON.stringify(cartContent));
                    location.reload();
                }
            }
        });

        let price = document.createElement('p');
        price.textContent = "Prix : " + (cartContent[i].price * cartContent[i].quantity) / 100 + " €";
        colRight.appendChild(price);

        let spanElt = document.createElement('span');
        colRight.appendChild(spanElt);
        let deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-light', 'btn-sm');
        deleteButton.textContent = "Supprimer";
        spanElt.appendChild(deleteButton);

        // Possibilité de supprimer l'article du panier
        deleteButton.addEventListener('click', function() {
            if (confirm("Voulez-vous vraiment retirer ce produit du panier ?")) {
                cartContent.splice(i, 1);
                localStorage.setItem('cartContent', JSON.stringify(cartContent));
                location.reload();
            }
        });       
    }

    // Calcul du prix total
    let totalPrice = document.createElement('h5');
    totalPrice.textContent = "Prix total : " + calculateTotalPrice(cartContent) + " €";
    main.appendChild(totalPrice);

    // Mise en place du formulaire
    let formElt = document.createElement('form');
    formElt.classList.add('mt-5');
    main.appendChild(formElt);

    let formGroupName = document.createElement('div');
    formGroupName.classList.add('form-group', 'row');
    formElt.appendChild(formGroupName)
    let labelName = document.createElement('label');
    labelName.setAttribute ('for', 'name');
    labelName.classList.add('col-12', 'col-sm-4', 'col-md-3', 'col-lg-2', 'text-center', 'text-sm-left', 'col-form-label');
    labelName.textContent = "Votre nom :";
    let name = document.createElement('input');
    name.type = 'text';
    name.id = 'name';
    name.classList.add('col-12', 'col-sm-5', 'col-md-4', 'form-control');
    formGroupName.appendChild(labelName);
    formGroupName.appendChild(name);
    let helpName = document.createElement('span');
    helpName.classList.add('ml-3', 'pt-2');
    helpName.style.color = 'red';
    formGroupName.appendChild(helpName);

    let formGroupFirstName = document.createElement('div');
    formGroupFirstName.classList.add('form-group', 'row');
    formElt.appendChild(formGroupFirstName)
    let labelFirstName = document.createElement('label');
    labelFirstName.setAttribute ('for', 'firstName');
    labelFirstName.classList.add('col-12', 'col-sm-4', 'col-md-3', 'col-lg-2', 'text-center', 'text-sm-left', 'col-form-label');
    labelFirstName.textContent = "Votre prénom :";
    let firstName = document.createElement('input');
    firstName.type = 'text';
    firstName.id = 'firstName';
    firstName.classList.add('col-12', 'col-sm-5', 'col-md-4', 'form-control');
    formGroupFirstName.appendChild(labelFirstName);
    formGroupFirstName.appendChild(firstName);
    let helpFirstName = document.createElement('span');
    helpFirstName.classList.add('ml-3', 'pt-2');
    helpFirstName.style.color = 'red';
    formGroupFirstName.appendChild(helpFirstName);

    // Contrôle du nom et du prénom en fin de saisie
    name.addEventListener("blur", function (e) {
        let regexName = /^[a-zA-Z]+$/;
        let errorMessage = "";
        if (!regexName.test(e.target.value)) {
            errorMessage = "Nom incorrect";
        }
        helpName.textContent = errorMessage;
    });
    firstName.addEventListener("blur", function (e) {
        let regexFirstName = /^[a-zA-Z]+$/;
        let errorMessage = "";
        if (!regexFirstName.test(e.target.value)) {
            errorMessage = "Prénom incorrect";
        }
        helpFirstName.textContent = errorMessage;
    });

    let formGroupAddress = document.createElement('div');
    formGroupAddress.classList.add('form-group', 'row');
    formElt.appendChild(formGroupAddress)
    let labelAddress = document.createElement('label');
    labelAddress.setAttribute ('for', 'address');
    labelAddress.classList.add('col-12', 'col-sm-4', 'col-md-3', 'col-lg-2', 'text-center', 'text-sm-left', 'col-form-label');
    labelAddress.textContent = "Votre adresse :";
    let address = document.createElement('input');
    address.type = 'text';
    address.id = 'address';
    address.classList.add('col-12', 'col-sm-8', 'col-lg-10', 'form-control');
    formGroupAddress.appendChild(labelAddress);
    formGroupAddress.appendChild(address);
    let helpAddress = document.createElement('span');
    helpAddress.classList.add('ml-3', 'pt-2');
    helpAddress.style.color = 'red';
    formGroupAddress.appendChild(helpAddress);

    // Contrôle de l'adresse en fin de saisie
    address.addEventListener("blur", function(e) {
        let regexAddress = /[a-zA-Z]+.+[0-9]+/;
        let errorMessage = "";
        if (!regexAddress.test(e.target.value)) {
            errorMessage = "Adresse incorrecte";
        }
        helpAddress.textContent = errorMessage;
    });

    let formGroupCity = document.createElement('div');
    formGroupCity.classList.add('form-group', 'row');
    formElt.appendChild(formGroupCity)
    let labelCity = document.createElement('label');
    labelCity.setAttribute ('for', 'city');
    labelCity.classList.add('col-12', 'col-sm-4', 'col-md-3', 'col-lg-2', 'text-center', 'text-sm-left', 'col-form-label');
    labelCity.textContent = "Votre ville :";
    let city = document.createElement('input');
    city.type = 'text';
    city.id = 'city';
    city.classList.add('col-12', 'col-sm-5', 'col-md-4', 'form-control');
    formGroupCity.appendChild(labelCity);
    formGroupCity.appendChild(city);
    let helpCity = document.createElement('span');
    helpCity.classList.add('ml-3', 'pt-2');
    helpCity.style.color = 'red';
    formGroupCity.appendChild(helpCity);

    // Contrôle de la ville en fin de saisie
    city.addEventListener("blur", function(e) {
        let regexCity = /^[a-zA-Z]+.+[a-zA-Z]$/;
        let errorMessage = "";
        if (!regexCity.test(e.target.value)) {
            errorMessage = "Nom de ville incorrect";
        }
        helpCity.textContent = errorMessage;
    });

    let formGroupMail = document.createElement('div');
    formGroupMail.classList.add('form-group', 'row');
    formElt.appendChild(formGroupMail)
    let labelMail = document.createElement('label');
    labelMail.setAttribute ('for', 'mail');
    labelMail.classList.add('col-12', 'col-sm-4', 'col-md-3', 'col-lg-2', 'text-center', 'text-sm-left', 'col-form-label');
    labelMail.textContent = "Votre e-mail :";
    let mail = document.createElement('input');
    mail.type = 'email';
    mail.id = 'mail';
    mail.classList.add('col-12', 'col-sm-5', 'col-md-4', 'form-control');
    formGroupMail.appendChild(labelMail);
    formGroupMail.appendChild(mail);
    let helpMail = document.createElement('span');
    helpMail.classList.add('ml-3', 'pt-2');
    helpMail.style.color = 'red';
    formGroupMail.appendChild(helpMail);

    // Contrôle du mail en fin de saisie
    mail.addEventListener("blur", function(e) {
        let regexMail = /^.+@.+\..+$/;
        let errorMessage = "";
        if (!regexMail.test(e.target.value)) {
            errorMessage = "Adresse incorrecte";
        }
        helpMail.textContent = errorMessage;
    });

    let formButton = document.createElement('button');
    formButton.classList.add('btn', 'btn-light', 'mb-5');
    formButton.textContent = "Passer commande";
    formElt.appendChild(formButton);

    let footer = document.querySelector('footer');
    footer.classList.remove('fixed-bottom', 'footer-cart');
}

// Fonction permettant le calcul du prix total
function calculateTotalPrice(articles) {
    let sum = 0;
    for (let i in articles) {
        sum += (articles[i].price * articles[i].quantity) / 100;
    }
    return sum;
}
