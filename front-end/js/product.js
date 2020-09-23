// Requête à l'API pour le produit choisi
ajaxGet('http://localhost:3000/api/teddies/' + location.search.split('?id=')[1])
    .then((teddie) => {
        let productContainer = document.getElementById('product-container');

        // Affichage des caractéristiques du produit choisi
        showProductSpecificities(productContainer, teddie);

        // Calcul du prix en fonction de la quantité choisie
        definePrice(productContainer, teddie);

        // Création du bouton d'ajout au panier
        let addCart = document.createElement('button');
        addCart.classList.add('btn', 'btn-primary', 'btn-block');
        addCart.textContent = "Ajouter au panier";
        productContainer.appendChild(addCart);

        // Stockage des informations du produit ajouté au panier
        addCart.addEventListener('click', function() {
            addToCart(teddie);
            alert("Votre produit a bien été ajouté au panier");
            headerModifications();
        });
    })
    .catch(error => console.log(error));

// Fonction d'affichage des caractéristiques produit
function showProductSpecificities(container, product) {
    let img = document.createElement('img');
    img.src = product.imageUrl;
    img.alt = "Ours en peluche";
    img.classList.add('d-block', 'w-100');
    container.appendChild(img);

    let name = document.createElement('h1');
    name.textContent = product.name;
    name.classList.add('text-center', 'mt-3');
    container.appendChild(name);

    let description = document.createElement('p');
    description.textContent = product.description;
    description.classList.add('text-center', 'font-italic');
    container.appendChild(description);

    let rowAttribute = document.createElement('div');
    rowAttribute.classList.add('row');
    container.appendChild(rowAttribute);
    let labelAttribute = document.createElement('label');
    labelAttribute.setAttribute('for', 'attribute');
    labelAttribute.classList.add('offset-1', 'offset-sm-0', 'col-sm-3', 'col-form-label');
    labelAttribute.textContent = 'Couleur :';
    rowAttribute.appendChild(labelAttribute);
    let attribute = document.createElement('select');
    attribute.id = 'attribute';
    attribute.classList.add('offset-1', 'col-10', 'offset-sm-0', 'col-sm-4', 'form-control');
    rowAttribute.appendChild(attribute); 
    for (let i = 0 ; i < product.colors.length ; i++) {
        let option = document.createElement('option');
        option.textContent = product.colors[i];
        attribute.appendChild(option);
    }    
}

// Fonction de définition du prix
function definePrice(container, product) {
    let rowQuantity = document.createElement('div');
    rowQuantity.classList.add('row');
    container.appendChild(rowQuantity);
    let labelQuantity = document.createElement('label');
    labelQuantity.setAttribute('for', 'quantity');
    labelQuantity.classList.add('offset-1', 'offset-sm-0', 'col-sm-3', 'col-form-label', 'mt-3');
    labelQuantity.textContent = 'Quantité :';
    rowQuantity.appendChild(labelQuantity);
    let quantity = document.createElement('select');
    quantity.id = 'quantity',
    quantity.classList.add('offset-1', 'col-10', 'offset-sm-0', 'col-sm-2', 'form-control', 'mt-3');
    rowQuantity.appendChild(quantity);
    for (let i = 1 ; i <= 9 ; i++) {
        let option = document.createElement('option');
        option.textContent = i;
        quantity.appendChild(option);
    }

    let price = document.createElement('p');
    price.classList.add('offset-1', 'offset-sm-0', 'mt-3');
    price.textContent = "Prix : " + product.price / 100 + " €";
    quantity.addEventListener('change', function() {
        let chosenQuantity = quantity.options[quantity.selectedIndex].text;
        price.textContent = "Prix : " + calculatePrice(product.price, chosenQuantity) + " €";
    });
    container.appendChild(price);
}

// Fonction d'ajout au panier
function addToCart(product) {
    let newProduct = {
        image: product.imageUrl,
        name: product.name,
        id: product._id,            
        quantity: quantity.options[quantity.selectedIndex].text,
        price: product.price
    }

    let cartContent = [];
    if (JSON.parse(localStorage.getItem('cartContent')) === null) {
        cartContent.push(newProduct);
    } else {
        cartContent = JSON.parse(localStorage.getItem('cartContent'));
        let productInCart = false;
        for (let article of cartContent) {
            if (article.id === newProduct.id) {
                article.quantity = parseInt(article.quantity, 10) + parseInt(newProduct.quantity, 10);
                productInCart = true;
            }
        }
        if (!productInCart) cartContent.push(newProduct);
    }
    localStorage.setItem('cartContent', JSON.stringify(cartContent));
    console.log("Voici les information stockées dans le panier : " + localStorage.getItem('cartContent'));
}