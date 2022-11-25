import { get,  } from './tools.js';
const form = document.getElementById('formulaire');
const firstNameEl = document.getElementById('firstName');
const lastNameEl = document.getElementById('lastName');
const addressEl = document.getElementById('address');
const cityEl = document.getElementById('city');
const emailEl = document.getElementById('email');



form.addEventListener("submit", async  (e) => {
    e.preventDefault();
    hideError(firstNameEl);
    if (!isFirstNameValid()) {
        showError(firstNameEl, 'Le prenom nest pas valide')
        return;
    }
    console.log("ca marche");

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
        headers : {"Content-type" :"application/json"},
    }).then (a=> a.json())
console.log(res);

})

function isFirstNameValid() {
    const firstName = firstNameEl.value;

    if (firstName.trim(' ').lenght < 3) {
        return false
    }
    return true
}




function hideError(el) {
    el.nextElementSibling.innerText = ''
}


function showError(el, msg) {
    el.nextElementSibling.innerText = msg
}