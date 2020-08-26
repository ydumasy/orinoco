let cartContent = JSON.parse(localStorage.getItem('cartContent'));
let main = document.querySelector('main');

if (cartContent.length > 0) {
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

        addButton.addEventListener('click', function() {
            cartContent[i].quantity++;
            calculatePrice(cartContent[i], price, cartContent[i].quantity);
            quantity.textContent = "Quantité : " + cartContent[i].quantity;
            localStorage.setItem('cartContent', JSON.stringify(cartContent));
        });
        removeButton.addEventListener('click', function() {
            if (cartContent[i].quantity > 1) {
                cartContent[i].quantity--;
                calculatePrice(cartContent[i], price, cartContent[i].quantity);
                quantity.textContent = "Quantité : " + cartContent[i].quantity;
                localStorage.setItem('cartContent', JSON.stringify(cartContent));
            } else {
                confirm("Voulez-vous vraiment retirer ce produit du panier ?");
                if (confirm) cartContent.splice(i, 1);
                localStorage.setItem('cartContent', JSON.stringify(cartContent));
                location.reload();
            }
        });

        let price = document.createElement('p');
        price.textContent = "Prix : " + cartContent[i].price / 100 + " €";
        colRight.appendChild(price);

        let spanElt = document.createElement('span');
        colRight.appendChild(spanElt);
        let deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-light', 'btn-sm');
        deleteButton.textContent = "Supprimer";
        spanElt.appendChild(deleteButton);

        deleteButton.addEventListener('click', function() {
            confirm("Voulez-vous vraiment retirer ce produit du panier ?");
            if (confirm) cartContent.splice(i, 1);
            localStorage.setItem('cartContent', JSON.stringify(cartContent));
            location.reload();
        });

        let footer = document.querySelector('footer');
        footer.classList.remove('fixed-bottom', 'footer-cart');
    }
}