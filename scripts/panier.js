
const form = document.getElementById('formulaire');

/* ID creer ?  */
const firstName =document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');
const button =document.getElementById('order')
let nom ="";
let prenom ="";
let adresse ="";
let ville ="";
let mail =""

let total = 0

async function infoBasket()  {
    const element = getBasket(); 
    let priceBasket = document.getElementById("totalPrice"); 
    let qtyBasket = document.getElementById("totalQuantity"); 

    priceBasket.innerHTML = `${element.price}`; 
    qtyBasket.innerHTML = `${element.qty}`; 
}




function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(products));   
    console.log("marche") ;
   }

    function getBasket() {
        let basket = localStorage.getItem("basket");
        if (basket == null) {
            return [];

        } else {
            return JSON.parse("basket");            
        }
    };

    function addBasket(product) {
        let  basket = getBasket();
        let foundProduct = basket.find(p => p.id == product.id);
        if (foundProduct != undefined ) {
            foundProduct.qty++;
        }else {
            product.qty =1;
            basket.push(product)
        }
        saveBasket(basket);        

    }

    function removeFromBasket(product) {
        let basket =getBasket();
        basket = basket.filter(p => p.id == product.id);
        saveBasket(basket);        
    }
   function changeQuantity(product,qty) {
    let  basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id);
    if (foundProduct != undefined ) {
        foundProduct.qty += qty;
            if(foundProduct.qty <= 0) {
                removeFromBasket(foundProduct);
            } else {
                saveBasket(basket);
            }
   } 
   
}

    function getNumberProduct() {
        let basket = getBasket();
        let number = 0;
        for(let product of basket) {
            number += product.qty;

        }
        return number;
    }

    function getTotalPrice() {
        let basket = getBasket();
                for (let produt of basket) {
            total += product.qty * product.price;
        }
        return total;
    }



/* ----------------------------------------------- Formulaire  */
//recuperation valeur formulaire



button.addEventListener("click", (e) =>{
    e.preventDefault();

    localStorage.setItem("firstname" , firstName.value);
    localStorage.setItem("lastName" , lastName.value);
    localStorage.setItem("address" , address.value);    
    localStorage.setItem("city" , city.value);
    localStorage.setItem("email" , email.value);

    const formulaire = {
        firstname:localStorage.getItem("firstname"),
        lastName:localStorage.getItem("lastName"),
        address:localStorage.getItem("address"),
        city:localStorage.getItem("city"),
        email:localStorage.getItem("email"),        
    }    

// envoie vers le serveurs

let basket = getBasket();
const sendServer= {
    basket,
    formulaire,
    
}

console.log(sendServer);




    const serverRecup = fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: JSON.stringify(sendServer),       
    })
    console.log(serverRecup);
})










/* firstName.addEventListener("input" , (e) => {
    nom =e.target.value;
}); */








//  evite de recharger la page 
form.addEventListener('submit', (e) => {
    e.preventDefault()
})