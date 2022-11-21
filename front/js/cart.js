import { get, has, fetchProducts, notifyAndRedirect } from './tools.js';
let html = "";
let totalPrice = 0
let totalQty = 0;


if (!has('products')) {
  showEmptyBasket();
} else {
  const productInCart = get('products')
  const allProducts = await fetchProducts();
  const products = buildCompleteList(productInCart, allProducts);
  console.log(products, "heyh");
  products.forEach((element) => {
    let renderHtml = ` <article class="cart__item" data-id="${element._id}" data-color="${element.color}">
        <div class="cart__item__img">
          <img src="${element.imageUrl}" alt="${element.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${element.name}</h2>
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
    html += renderHtml;


    //total du prix 

    totalPrice += element.price * element.qty;
    console.log(totalPrice)
    document.getElementById("totalPrice").innerHTML = totalPrice;

    totalQty += [1] * element.qty;
    console.log(totalQty)
    document.getElementById("totalQuantity").innerHTML = totalQty;
  })


  

}
document.getElementById("cart__items").innerHTML = html;


//ecouter la supression d'un élement
document.querySelector('.deleteItem').addEventListener("click", () => {
  console.log("supprime");
  totalQty += 0;
})

// Le panier est vide 
function showEmptyBasket() {
  document.querySelector('.cart').style.display = 'none'
  document.querySelector('h1').innerText = `Votre panier est vide`
}


//liste des produits

function buildCompleteList(cart, all) {

  const list = [];
  cart.forEach(item => {
    const findNeedProduct = all.find(p => p._id == item.id)
    findNeedProduct.qty = item.qty;
    findNeedProduct.color = item.color;
    list.push(findNeedProduct)


  });
  return list;
}




