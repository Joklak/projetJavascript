import { get, notifyAndRedirect } from './tools.js';
const form = document.getElementById('formulaire');
const firstNameEl = document.getElementById('firstName');
const lastNameEl = document.getElementById('lastName');
const addressEl = document.getElementById('address');
const cityEl = document.getElementById('city');
const emailEl = document.getElementById('email');


// envoie des données dans le formulaire 
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideError(firstNameEl);
    if (!isFirstNameValid()) {
        showError(firstNameEl, 'Le prénom doit comporter au moins 2 caractères')
        return;
    }
    hideError(lastNameEl);
    if (!isLastNameValid()) {
        showError(lastNameEl, 'Le nom doit comporter au moins 2 caractères')
        return;
    }
    hideError(addressEl);
    if (!isAddressValid()) {
        showError(addressEl, "L'adresse doit comporter au moins 5 caractères")
        return;
    }
    hideError(cityEl);
    if (!isCityValid()) {
        showError(cityEl, "L'adresse doit comporter au moins 3 caractères")
        return;
    }
    hideError(emailEl);
    if (!isMailValid()) {
        showError(emailEl, "L'adresse doit comporter au moins 3 caractères")
        return;
    }

    // envoie vers le serveurs

    const payload = {
        contact: {
            'firstName': 'test',
            'lastName': 'test',
            'address': 'test',
            'city': 'test',
            'email': 'test@gmail.com'
        },
        products: get('products').map(a => a.id),

    }
    const res = await fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-type": "application/json"
            },
        }).then(a => a.json())
        .then((data) => {
            localStorage.clear();
            let confirmationUrl = "./confirmation.html?id=" + data.orderId;
            notifyAndRedirect('Merci pour votre commande', window.location.href = confirmationUrl);
        })




})
// verification des informations dans l'input 

function isFirstNameValid() {
    const firstName = firstNameEl.value;

    if (firstName.trim(' ').length < 3) {
        return false
    }
    return true
}

function isLastNameValid() {
    const lastName = lastNameEl.value;

    if (lastName.trim(' ').length < 3) {
        return false
    }
    return true
}

function isAddressValid() {
    const address = addressEl.value;

    if (address.trim(' ').length < 5) {
        return false
    }
    return true
}

function isCityValid() {
    const city = cityEl.value;

    if (city.trim(' ').length < 3) {
        return false
    }
    return true
}

function isMailValid() {
    const mail = emailEl.value;

    if (mail.trim(' ').length < 6) {
        return false
    }
    return true
}

//  empecher qu'un message d'erreur ne soit la avant
function hideError(el) {
    el.nextElementSibling.innerText = ''
}

// Afficher l'erreur sous l'input
function showError(el, msg) {
    el.nextElementSibling.innerText = msg
}