function savePanier(panier) {
    localStorage.setItem("panier",JSON.stringify(panier));
}

function getPanier() {
    let panier = (localStorage.getItem("panier"));
    if(panier == null) {
        return [];
    } else {
        return JSON.parse(basket);
    }

}

function addPanier(product) {
    let panier = getPanier();
    let foundProducts = basket.find( p => p.id ==product.id);
    if(foundProducts != undefined ) {
        foundProducts.quantity++;

    }else {
        product.quantity =1;
        panier.push(product);
    }    
    savePanier(panier);
}
------------------

const productstest = [
    {
    id: id,
    color: color,
    qty :qty }
]
function savePanier(productstest) {
    localStorage.setItem("panier",JSON.stringify(productstest));
}

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
} 

