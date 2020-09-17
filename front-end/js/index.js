let carouselInner = document.querySelector('.carousel-inner');

// Réquête à l'API pour la catégorie des ours en peluche
ajaxGet('http://localhost:3000/api/teddies')
        // Récupération de la promesse
        .then ((teddies) => {
            // Affichage des différents produits de la catégorie
            for (let i = 0 ; i < teddies.length ; i++) {
                let carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                if (i === 0) carouselItem.classList.add('active');
                carouselInner.appendChild(carouselItem);
        
                let img = document.createElement('img');
                img.src = teddies[i].imageUrl;
                img.alt = "Ours en peluche";
                img.classList.add('d-block', 'w-100');
                carouselItem.appendChild(img);
        
                // Affichage des caractéristiques de chaque produit
                let name = document.createElement('h1');
                name.textContent = teddies[i].name;
                name.classList.add('text-center', 'mt-3');
                carouselItem.appendChild(name);

                let reference = document.createElement('p');
                reference.classList.add('text-center');
                reference.innerHTML = '<em>Référence</em> : ' + teddies[i]._id;
                carouselItem.appendChild(reference);
        
                let viewProduct = document.createElement('button');
                viewProduct.classList.add('btn', 'btn-primary', 'btn-block');
                viewProduct.textContent = "Consulter ce produit";
                carouselItem.appendChild(viewProduct);
            }
        });