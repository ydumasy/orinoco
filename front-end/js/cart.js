let cartContent = JSON.parse(localStorage.getItem('cartContent'));
let main = document.querySelector('main');

// Affichage du panier d'achat si celui-ci n'est pas vide
if (cartContent !== null && cartContent.length > 0) {
    while (main.firstChild) main.removeChild(main.firstChild);
    main.classList.remove('container-size');

    for (let i in cartContent) {
        //Mise en place de la structure d'affichage du (ou des) produit(s)
        let rowElt = document.createElement('div');
        rowElt.classList.add('row', 'my-3');
        main.appendChild(rowElt);

        let colLeft = document.createElement('div');
        colLeft.classList.add('col-12', 'col-sm-6', 'col-lg-4');
        rowElt.appendChild(colLeft);
        let colRight = document.createElement('div');
        colRight.classList.add('col-12', 'col-sm-6', 'text-center', 'text-sm-left', 'col-right');
        rowElt.appendChild(colRight);

        // Affichage de l'image et du nom de chaque produit présent dans le panier
        showCartArticles(colLeft, colRight, cartContent[i]);

        // Affichage de la quantité choisie et des boutons modificateurs
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
            price.textContent = "Prix : " + calculatePrice(cartContent[i].price, cartContent[i].quantity) + " €";
            quantity.textContent = "Quantité : " + cartContent[i].quantity;
            totalPrice.textContent = "Prix total : " + calculateTotalPrice(cartContent) + " €";
            localStorage.setItem('cartContent', JSON.stringify(cartContent));
        });
        removeButton.addEventListener('click', function() {
            if (cartContent[i].quantity > 1) {
                cartContent[i].quantity--;
                price.textContent = "Prix : " + calculatePrice(cartContent[i].price, cartContent[i].quantity) + " €";
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

        // Affichage du prix de chaque produit en fonction de la quantité choisie
        let price = document.createElement('p');
        price.classList.add('price');
        price.textContent = "Prix : " + calculatePrice(cartContent[i].price, cartContent[i].quantity) + " €";
        colRight.appendChild(price);

        // Affichage du bouton de suppression
        let spanElt = document.createElement('span');
        colRight.appendChild(spanElt);
        let deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-light', 'btn-sm');
        deleteButton.textContent = "Supprimer";
        spanElt.appendChild(deleteButton); 
        
        // Possibilité de supprimer l'article du panier
        deleteProduct(deleteButton, cartContent, i);       
    }

    // Calcul du prix total
    let totalPrice = document.createElement('h5');
    totalPrice.textContent = "Prix total : " + calculateTotalPrice(cartContent) + " €";
    main.appendChild(totalPrice);

    let footer = document.querySelector('footer');
    footer.classList.remove('fixed-bottom', 'footer-cart');
}

// Fonction permettant l'affichage de l'image et du nom d'un produit
function showCartArticles(leftContainer, rightContainer, product) {
    let productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.style.width = '100%';
    productImage.alt = 'Ours en peluche';
    leftContainer.appendChild(productImage);

    let productName = document.createElement('h1');
    productName.classList.add('product-name');
    productName.textContent = product.name;
    rightContainer.appendChild(productName);
}

// Fonction de suppression d'un produit
function deleteProduct(button, products, item) {
    button.addEventListener('click', function() {
        if (confirm("Voulez-vous vraiment retirer ce produit du panier ?")) {
            products.splice(item, 1);
            localStorage.setItem('cartContent', JSON.stringify(cartContent));
            location.reload();
        }
    });
}

// Fonction permettant le calcul du prix total
function calculateTotalPrice(articles) {
    let sum = 0;
    for (let i in articles) {
        if (articles[i].price < 0 && articles[i].quantity <1) {
            console.error("Prix et quantité incorrects");
            break;
        } else if (articles[i].price < 0) {
            console.error("Prix incorrect");
            break;
        } else if (articles[i].quantity < 1) {
            console.error("Quantité incorrecte");
            break;
        } else {
            sum += (articles[i].price * articles[i].quantity) / 100;
        }
    }
    return sum;
}
