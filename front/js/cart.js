import { get, has, fetchProducts, notifyAndRedirect, store } from './tools.js';
let html = "";
let totalPrice = 0
let totalQty = 0;


if (!has('products')) {
    showEmptyBasket();
} else {
    const products = await buildCompleteList();
    displayProducts(products);
    displayTotal(products);
    listenForQtyUpdate(products);
    listenForDeletion(products);

}

// changer quantité d'un élement 
function listenForQtyUpdate(products) {
    products.forEach((product) => {
        const input = document.querySelector(`article[data-id="${product._id}"][data-color="${product.color}"] .itemQuantity`)
        input.addEventListener('input', (e) => {
            const qty = e.target.value;
            const cart = get('products');
            const item = cart.find(a => a.id == product._id && a.color == product.color)
            item.qty = Number(qty);
            store('products', cart)
            location.reload();
        })
    });

}
// supprimer un element 
function listenForDeletion(products) {
    products.forEach((product) => {
        const input = document.querySelector(`article[data-id="${product._id}"][data-color="${product.color}"] .deleteItem`)
        input.addEventListener('click', (e) => {
            const cart = get('products');
            const index = cart.findIndex(a => a.id == product._id && a.color == product.color);
            cart.splice(index, 1);
            store('products', cart);
            location.reload();
        })
    });

}



// Le panier est vide 
function showEmptyBasket() {
    document.querySelector('.cart').style.display = 'none'
    document.querySelector('h1').innerText = `Votre panier est vide`
}


//liste des produits

async function buildCompleteList() {
    const cart = get('products')
    const all = await fetchProducts();
    const list = [];
    cart.forEach(item => {
        const findNeedProduct = all.find(p => p._id == item.id)
        const product = {
            ...findNeedProduct
        };
        product.qty = item.qty;
        product.color = item.color;
        list.push(product)


    });
    return list;
}


// afficher produit dans le panier 
function displayProducts(products) {
    products.forEach((element) => {
        document.getElementById("cart__items").innerHTML += ` <article class="cart__item" data-id="${element._id}" data-color="${element.color}">
        <div class="cart__item__img">
          <img src="${element.imageUrl}" alt="${element.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${element.name}</h2>
            <h3>${element.color}</h3>
            <p>${element.description}</p>
            <p>${element.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${element.qty}>
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem" >Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;


    })
}

// total du prix et de la quantité 
function displayTotal(products) {
    products.forEach((element) => {

        totalPrice += element.price * element.qty;
        document.getElementById("totalPrice").innerHTML = totalPrice;

        totalQty += [1] * element.qty;
        document.getElementById("totalQuantity").innerHTML = totalQty;
    })


}