
import { notifyAndRedirect } from './tools.js';
const form = document.getElementById('formulaire');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');
const button = document.getElementById('order')
let isFormOk = false
let nom = "";
let prenom = "";
let adresse = "";
let ville = "";
let mail = ""


form.addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.setItem("firstname", firstName.value);
    localStorage.setItem("lastName", lastName.value);
    localStorage.setItem("address", address.value);
    localStorage.setItem("city", city.value);
    localStorage.setItem("email", email.value);

    const formulaire = {
        firstname: localStorage.getItem("firstname"),
        lastName: localStorage.getItem("lastName"),
        address: localStorage.getItem("address"),
        city: localStorage.getItem("city"),
        email: localStorage.getItem("email"),
    }

    isFormOk = true;



    // envoie vers le serveurs

    /*     const sendServer = {
            basket,
            formulaire,
    
        }
        const serverRecup = fetch("http://localhost:3000/api/products", {
            method: "POST",
            body: JSON.stringify(sendServer),
        }) */


})

//  evite de recharger la page 



// redirection vers la page confirmation 

button.addEventListener("click", () => {
    if (isFormOk = true) {
        console.log("redirection)")
        notifyAndRedirect('Merci pour votre commande', "confirmation.html");
    }
    else {
        alert('Merci de remplir le formulaire')
        return;
    }

});

/* 
function formOk() {
    if (document.getElementById("firstName").required = true,
        document.getElementById("lastName").required = true,
        document.getElementById("address").required = true,
        document.getElementById("city").required = true,
        document.getElementById("email").required = true) {
        isFormOk = true;
        console.log("formulaire ok")
    } else {
        isFormOk = false;
    }
} */