if (cartContent !== null && cartContent.length > 0) {
    // Mise en place du formulaire
    let formElt = document.createElement('form');
    formElt.classList.add('mt-5');
    main.appendChild(formElt);

    formElt.innerHTML = 
    '<div class="form-group row"><label for="last-name" class="col-12 col-sm-4 col-md-3 col-lg-2 text-center text-sm-left col-form-label">Votre nom :</label><input type="text" id="last-name" class="col-12 col-sm-5 col-md-4 form-control"><span id="help-lastname" class="ml-3 pt-2" style="color: red;"></span></div><div class="form-group row"><label for="first-name" class="col-12 col-sm-4 col-md-3 col-lg-2 text-center text-sm-left col-form-label">Votre prénom :</label><input type="text" id="first-name" class="col-12 col-sm-5 col-md-4 form-control"><span id="help-firstname" class="ml-3 pt-2" style="color: red;"></span></div><div class="form-group row"><label for="address" class="col-12 col-sm-4 col-md-3 col-lg-2 text-center text-sm-left col-form-label">Votre adresse :</label><input type="text" id="address" class="col-12 col-sm-8 col-lg-10 form-control"><span id="help-address" class="ml-3 pt-2" style="color: red;"></span></div><div class="form-group row"><label for="city" class="col-12 col-sm-4 col-md-3 col-lg-2 text-center text-sm-left col-form-label">Votre ville :</label><input type="text" id="city" class="col-12 col-sm-5 col-md-4 form-control"><span id="help-city" class="ml-3 pt-2" style="color: red;"></span></div><div class="form-group row"><label for="email" class="col-12 col-sm-4 col-md-3 col-lg-2 text-center text-sm-left col-form-label">Votre e-mail :</label><input type="email" id="email" class="col-12 col-sm-5 col-md-4 form-control"><span id="help-email" class="ml-3 pt-2" style="color: red;"></span></div><button class="btn btn-light mb-5">Passer commande</button>'

    // Contrôle du nom en fin de saisie
    let lastName = document.getElementById('last-name');
    let helpLastName = document.getElementById('help-lastname');
    lastNameControl(lastName, helpLastName);

    // Contrôle du prénom en fin de saisie
    let firstName = document.getElementById('first-name');
    let helpFirstName = document.getElementById('help-firstname');
    firstNameControl(firstName, helpFirstName);

    // Contrôle de l'adresse en fin de saisie
    let address = document.getElementById('address');
    let helpAddress = document.getElementById('help-address');
    addressControl(address, helpAddress);

    // Contrôle de la ville en fin de saisie
    let city = document.getElementById('city');
    let helpCity = document.getElementById('help-city');
    cityControl(city, helpCity);

    // Contrôle du mail en fin de saisie
    let email = document.getElementById('email');
    let helpEmail = document.getElementById('help-email');
    emailControl(email, helpEmail);

    formElt.addEventListener('submit', function(e) {
        e.preventDefault();
        // Contrôle final du formulaire avant soumission
        if (lastNameControl(lastName, helpLastName) 
          && firstNameControl(firstName, helpFirstName)
          && addressControl(address, helpAddress)
          && cityControl(city, helpCity)
          && emailControl(email, helpEmail)) {
            submitForm(lastName, firstName, address, city, email);
        } else {
            alert("Attention, le formulaire n'est pas valide");
        }
    });
}

// Fonction contrôlant la validité du nom de l'utilisateur
function lastNameControl(lastName, helpMessage){
    lastName.addEventListener("blur", function(e) {
        let regexName = /^[a-zA-Z]+.+[a-zA-Z]+$/;
        let errorMessage = "";
        if (e.target.value !== "" && !regexName.test(e.target.value)) {
            errorMessage = "Nom incorrect";
            helpMessage.textContent = errorMessage;
            return false;
        } else {
            helpMessage.textContent = "";
        } 
    });
    if (lastName.value !== "" && helpMessage.textContent === "") return true;
    else return false;
}

// Fonction contrôlant la validité du prénom de l'utilisateur
function firstNameControl(firstName, helpMessage) {
    firstName.addEventListener("blur", function(e) {
        let regexFirstName = /^[a-zA-Z]+.+[a-zA-Z]+$/;
        let errorMessage = "";
        if (e.target.value !== "" && !regexFirstName.test(e.target.value)) {
            errorMessage = "Prénom incorrect";
            helpMessage.textContent = errorMessage;
            return false;
        } else {
            helpMessage.textContent = "";
        }
    });
    if (firstName.value !== "" && helpMessage.textContent === "") return true;
    else return false;
}

// Fonction contrôlant la validité de l'adresse
function addressControl(address, helpMessage) {
    address.addEventListener("blur", function(e) {
        let regexAddress = /[a-zA-Z]+.+[0-9]+/;
        let errorMessage = "";
        if (e.target.value !== "" && !regexAddress.test(e.target.value)) {
            errorMessage = "Adresse incorrecte";
            helpMessage.textContent = errorMessage;
            return false;
        } else {
            helpMessage.textContent = "";
        }
    });
    if (address.value !== "" && helpMessage.textContent === "") return true;
    else return false;
}

// Fonction contrôlant la validité du nom de la ville
function cityControl(city, helpMessage) {
    city.addEventListener("blur", function(e) {
        let regexCity = /^[a-zA-Z]+.+[a-zA-Z]$/;
        let errorMessage = "";
        if (e.target.value !== "" && !regexCity.test(e.target.value)) {
            errorMessage = "Nom de ville incorrect";
            helpMessage.textContent = errorMessage;
            return false;
        } else {
            helpMessage.textContent = "";
        }
    });
    if (city.value !== "" && helpMessage.textContent === "") return true;
    else return false;
}

// Fonctrion contrôlant la validité de l'e-mail
function emailControl(email, helpMessage) {
    email.addEventListener("blur", function(e) {
        let regexEmail = /^.+@.+\..+$/;
        let errorMessage = "";
        if (e.target.value !== "" && !regexEmail.test(e.target.value)) {
            errorMessage = "E-mail incorrect";
            helpMessage.textContent = errorMessage;
            return false;
        } else {
            helpMessage.textContent = "";
        }
    });
    if (email.value !== "" && helpMessage.textContent === "") return true;
    else return false;
}

// Fonction gérant l'envoi du formulaire
function submitForm(lastName, firstName, address, city, email) {
    // Création de l'objet contact
    let contact = {
        lastName: lastName.value,
        firstName: firstName.value,
        address: address.value,
        city: city.value,
        email: email.value
    }
    // Création du tableau de produits
    let products = [];
    for (let article of cartContent) products.push(article.id);
    // Constitution de l'objet 'command'
    let command = {
        contact,
        products
    };
    console.log("Les informations suivantes vont être envoyées au serveur" + JSON.stringify(command));

    // Envoi des informations de commandes au serveur
    ajaxPost('http://localhost:3000/api/teddies/order', JSON.stringify(command))
        // Récupération de la réponse du serveur
        .then ((response) => {
            sessionStorage.setItem('order', response);
            localStorage.clear();
            location = 'confirm.html';
    });
}