let cartContent = JSON.parse(localStorage.getItem('cartContent'));
let main = document.querySelector('main');

if (cartContent !== null) {
    while (main.firstChild) main.removeChild(main.firstChild);
    main.classList.remove('container-size');

    for (let article of cartContent) {
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
        productImage.src = article.image;
        productImage.style.width = '100%';
        productImage.alt = 'Ours en peluche';
        colLeft.appendChild(productImage);

        let productName = document.createElement('h1');
        productName.classList.add('mt-3', 'product-name');
        productName.textContent = article.name;
        colRight.appendChild(productName);

        let rowQuantity = document.createElement('div');
        let quantity = document.createElement('p');
        quantity.style.display = 'inline';
        quantity.textContent = "Quantité : " + article.quantity;
        colRight.appendChild(quantity);

        let price = document.createElement('p');
        price.textContent = "Prix : " + article.price / 100 + " €";
        colRight.appendChild(price);

        let footer = document.querySelector('footer');
        footer.classList.remove('fixed-bottom', 'footer-cart');
    }
}