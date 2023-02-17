const socket = io()

const form = document.getElementById("productForm")
form.addEventListener("submit", e => {
    e.preventDefault();
    const title = document.getElementById("title")
    const description = document.getElementById("description")
    const price = document.getElementById("price")
    const code = document.getElementById("code")
    const stock = document.getElementById("stock")
    const category = document.getElementById("category")
    const thumbnail = document.getElementById("thumbnail")
    const product = { title, description, price, code, stock, category, thumbnail }
    socket.emit("addProduct", product)
})

socket.on("msgProductAdded", msg => {
    console.log(msg)
})

socket.on("getProducts", products => {
    const prodsFromSrv = document.getElementById("productsFromServer")
    prodsFromSrv.innerHTML = ""
    products.forEach(prod => {
        prodsFromSrv.innerHTML += `
            <div>
                <h3>${prod.title}</h2>
                <p>${prod.description}</p>
                <p>Precio: $${prod.price}</p>
                <p>Stock: ${prod.stock} un.</p>
                <p>Código de producto: ${prod.code}</p>
                <p>ID: ${prod.id}</p>
            </div>
        `
    });
})