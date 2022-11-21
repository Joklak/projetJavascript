const storage = localStorage


function get(key) {
    if (!has(key)) {
        throw 'this key does not exists'
        return;
    }
    return JSON.parse(storage.getItem(key));
}
function has(key) {
    if (storage.getItem(key)) {
        return true;
    }
    return false;
}
function store(key, value) {
    storage.setItem(key, JSON.stringify(value));
}

function notifyAndRedirect(message, destination) {
    alert(message)
    location.href = destination
}

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

export { get, has, fetchProducts, store, notifyAndRedirect };