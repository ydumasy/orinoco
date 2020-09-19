let carouselInner = document.querySelector('.carousel-inner');

// Réquête à l'API pour la catégorie des ours en peluche
ajaxGet('http://localhost:3000/api/teddies')
        // Récupération de la promesse
        .then ((teddies) => {
            for (let i = 0 ; i < teddies.length ; i++) {
                let carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                if (i === 0) carouselItem.classList.add('active');
                carouselInner.appendChild(carouselItem);
                // Pour chaque produit de la catégorie, on affiche son nom et sa référence
                showProduct(carouselItem, teddies[i]);
        
                // Création du bouton de redirection
                let viewProduct = document.createElement('button');
                viewProduct.classList.add('btn', 'btn-primary', 'btn-block');
                viewProduct.textContent = "Consulter ce produit";
                carouselItem.appendChild(viewProduct);

                // Redirection vers la page produit en fonction du choix de l'utilisateur
                redirectUser(viewProduct, teddies[i]);
            }
        })
        .catch(error => console.log(error));

// Fonction d'affichage d'un produit
function showProduct(container, product) {
    let img = document.createElement('img');
    img.src = product.imageUrl;
    img.alt = "Ours en peluche";
    img.classList.add('d-block', 'w-100');
    container.appendChild(img);

    let name = document.createElement('h1');
    name.textContent = product.name;
    name.classList.add('text-center', 'mt-3');
    container.appendChild(name);

    let reference = document.createElement('p');
    reference.classList.add('text-center');
    reference.innerHTML = '<em>Référence</em> : ' + product._id;
    container.appendChild(reference);
}

// Fonction de redirection de l'utilisateur
function redirectUser(button, product) {
    button.addEventListener('click', () => {
        location = "product.html?id=" + product._id;
    });
}