
const urlsite = new URL(location.href)
const id = urlsite.searchParams.get("id");


async function fetchProducts() {
    const url = "http://localhost:3000/api/products";

    try {
        const response = await fetch(url);
        console.log(typeof response);
        console.log(response.status);
        console.log(response.ok);
        console.log("ca marche");
        return await response.json();
        
    } catch (error) {
        console.log(error);        
    }
}


 async function produitSeul()  {
    const products = await fetchProducts();
    console.log(products);
     let html2 ="";
     products.forEach((element) => {     

         let productImg = document.querySelector(".item__img");
         if (id=== element._id) {
 
            productImg.innerHTML = `<img src="${element.imageUrl}"alt="${element.altTxt}">
        ` ; }
          else {
             console.log("pasbonneid")
          }

      
         let productTitle = document.getElementById("title");
         if (id=== element._id) {
 
            productTitle.innerHTML = `${element.name}`; }
          else {
             console.log("pasbonneid")
          }

          
        let productPrice = document.getElementById("price");
        if (id=== element._id) {

            productPrice.innerHTML = `${element.price}`; }
         else {
            console.log("pasbonneid")
         }

         let productDescription = document.getElementById("description");
         if (id=== element._id) {
 
            productDescription.innerHTML = `${element.description}`; }
          else {
             console.log("pasbonneid")
          }
          let productColors = document.getElementById("colors");
          if (id=== element._id) {
  
            productColors.innerHTML = `<option value="${element.colors[1]}">${element.colors[1]}</option>
            <option value="${element.colors[0]}">${element.colors[0]}</option> <option value="${element.colors[2]}">${element.colors[2]}</option>`; }
           else {
              console.log("pasbonneid")
           }
          

     });     
     
 }

 produitSeul();

function panierQuantity() {
    let quantite = document.getElementById("quantity");
    return quantite.value;
    console.log (quantite);
}
function colorChoice() {
    let colorchoix = document.getElementById("colors");
    return colorchoix.value;
    console.log(colorchoix);
}

const addPanier = document.getElementById("addToCart");
addPanier.addEventListener("click" , () => {
    let quantite = panierQuantity();
    let colorchoix = colorChoice ();
    console.log(quantite);
    console.log(colorchoix);
})


