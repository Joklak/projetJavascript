import { get, has, store, notifyAndRedirect } from './tools.js'
const id = getId();
const product = await fetchProduct(id);


display(product);
listen(product);

function listen(product) {

    document.getElementById("addToCart").addEventListener("click", () => {
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
        let products = [];

        // Le panier est vide

        if (!has("products")) {
            products.push(
                {
                    id: product._id,
                    color: color,
                    qty: qty,
                }
            )

            store("products", products);
            notifyAndRedirect('Votre produit est bien ajouté , redirection vers la page d acceuil', "index.html");
            return;
        }

        // le panier contient deja des produits 
        // produit déjà existant 
        products = get("products");
        const productExists = products.find(a => a.id == product._id && a.color == color)
        console.log('le produit existe', productExists)

        // le produit avec cette couleur existe deja

        if (productExists) {
            productExists.qty = Number(productExists.qty) + Number(qty);
        } else {
            products.push(
                {
                    id: product._id,
                    color: color,
                    qty: qty,
                }
            )

        }

        store("products", products);
        notifyAndRedirect('Votre produit est bien ajouté , redirection vers la page d acceuil', "index.html");
        return;
    })
}


async function fetchProduct(id) {
    const url = "http://localhost:3000/api/products/" + id;

    try {
        const response = await fetch(url);
        return await response.json();

    } catch (error) {
        console.log(error);
    }
}


async function display(product) {

    let html = "";
    let productImg = document.querySelector(".item__img");
    let productTitle = document.getElementById("title");
    let productPrice = document.getElementById("price");
    let productDescription = document.getElementById("description");
    let productColors = document.getElementById("colors");



    product.colors.forEach(color => {
        const option = document.createElement('option')
        option.value = color
        option.innerText = color
        productColors.appendChild(option)
    })

    productImg.innerHTML = `<img src="${product.imageUrl}"alt="${product.altTxt}"> `;
    productTitle.innerHTML = `${product.name}`;
    productPrice.innerHTML = `${product.price}`;
    productDescription.innerHTML = `${product.description}`;

}



function getId() {
    const urlsite = new URL(location.href)
    return urlsite.searchParams.get("id");
}