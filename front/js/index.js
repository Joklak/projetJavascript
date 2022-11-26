import { fetchProducts} from './tools.js'


// afficher les produits
const products = await fetchProducts();
let html = "";
products.forEach((element) => {
    let renderHtml = `<a href="./product.html?id=${element._id}">
        <article>
        <img src="${element.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
        <h3 class="productName">${element.name}</h3>
        <p class="productDescription">${element.description}</p>        
        </article>
      </a>`;

    html += renderHtml;
});
document.getElementById("items").innerHTML = html;


