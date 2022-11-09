
const urlsite = new URL(location.href)
const id = urlsite.searchParams.get("id");
const addPanier = document.getElementById("addToCart");

produitSeul();


addPanier.addEventListener("click" , () => {
    const qty = document.getElementById("quantity").value;
    const color = document.getElementById("colors").value;
    

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
        qty :qty }
    ];

   function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(products));    
   }

    function getBasket() {
        let basket = localStorage.getItem("basket");
        if (basket == null) {
            return [];

        } else {
            return JSON.parse("basket")
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


    

   // function savePanier() {
 //       localStorage.setItem("panier",JSON.stringify(productstest));  
     //   reCalculate();       
    //}

/*     function reCalculate () {
        if ("panier" == null ) {
            console.log("c'est vide")
        } else {
            console.log("c'est pleins");
        }
    }
    function savePanier(){
        let products = [];
        if(localStorage.getItem('panier')){
            products = JSON.parse(localStorage.getItem('panier'));
        }
        products.push({'productId' : id, 'quantity' : qty});
        localStorage.setItem('products', JSON.stringify(products));
    }








    savePanier();
JSON.parse(localStorage.getItem("panier"))
    function getPanier() {
        let panier = (localStorage.getItem("panier"));
        if(panier == null) {
            return [];
        } else {
            return JSON.parse(panier);
        }
    }
    
    function addPanier(productstest) {
        let panier = getPanier();
        let foundProducts = panier.find( p => p.id ==productstest.id);
        if(foundProducts != undefined ) {
            foundProducts.quantity++;
    
        }else {
            product.quantity =1;
            panier.push(product);
        }    
        savePanier(panier);
    }  */
})





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



