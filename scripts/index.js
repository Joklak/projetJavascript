async function fetchProducts() {
    const url = "http://localhost:3000/api/products";

    try {
        const response = await fetch(url);
        console.log(typeof response);
        console.log(response.status);
        console.log(response.ok);
        return await response.json();
        
    } catch (error) {
        console.log(error);        
    }
}
 

async function renderProducts() {
    const products = await fetchProducts();
    let html = "";
    products.forEach((element) => {
        let renderHtml = `<a href="./product.html?id=${element._id}">
        <article>
        <img src="${element.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
        <h3 class="productName">${element.name}</h3>
        <p class="productDescription">${element.description}</p>
        <p class="productPrice">${element.price}$</p>
      </article>
      </a>`;

      html += renderHtml;
    });
    document.getElementById("items").innerHTML = html;

}

renderProducts();