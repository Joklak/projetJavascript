
const urlsite = new URL(location.href)
const id = urlsite.searchParams.get("id");
const addPanier = document.getElementById("addToCart");

produitSeul();


addPanier.addEventListener("click" , () => {
    const qty = document.getElementById("quantity").value;
    const color = document.getElementById("colors").value
    const price = document.getElementById("price").value;
    

    if (qty <= 0 || qty > 100) {
        alert('Merci de choisir une quantité entre 1 et 100')
        return;
    }
    if (color === '') {
        alert('Merci de choisir une couleur')
        return;
    }

    const products = [
        {
        id: id,
        color: color,
        qty :qty,
        price: price}
    ];   
    async function saveBasket(basket) {
        localStorage.setItem("basket", JSON.stringify(products));   
        console.log("marche") ;
       }    
    addBasket();
})

async function getBasket() {
    let basket =JSON.parse(localStorage.getItem("basket"));
    console.log("TESTBASKET");
    console.log(basket);
    if (basket == null) {
        console.log("c'est vide");
        return [];
        

    } else {
        console.log("je renvoie les données");
        return JSON.parse(localStorage.getItem("basket"));            
    }
};  


async function addBasket(product) {
    let  basket = getBasket();
    console.log(basket );
    let foundProduct = 10;
    if (foundProduct != undefined ) {
        foundProduct.qty++;
    }else {
        product.qty += qty;
        basket.push(product)
    }
    saveBasket(basket);      

};


async function fetchProduct() {
    const url = "http://localhost:3000/api/products/" +id;

    try {
        const response = await fetch(url);        
        return await response.json();
        
    } catch (error) {
        console.log(error);        
    }
}


 async function produitSeul()  {
    const element = await fetchProduct();    
     let html ="";    
     let productImg = document.querySelector(".item__img");
     let productTitle = document.getElementById("title"); 
     let productPrice = document.getElementById("price");
     let productDescription = document.getElementById("description");
     let productColors = document.getElementById("colors");
     
     
      
      element.colors.forEach(color => {
            const option = document.createElement('option')
            option.value = color
            option.innerText=color            
            productColors.appendChild(option)
        })    

     productImg.innerHTML = `<img src="${element.imageUrl}"alt="${element.altTxt}"> ` ; 
     productTitle.innerHTML = `${element.name}`; 
     productPrice.innerHTML = `${element.price}`;     
     productDescription.innerHTML = `${element.description}`; 
     
 }



