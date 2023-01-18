class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(productObj) {
        // Check if the product has missing data (empty value)
        if (Object.values(productObj).includes("") || Object.values(productObj).includes(null)) {
            return console.log("Missing product field");
        } else {
            // Check existing code
            const repeatedCode = this.products.find((prod) => prod.code === productObj.code);
            if (repeatedCode) {
                return console.error("Code " + productObj.code + " already exists");
            } else {
                // Push obj to the array
                this.products.push({ ...productObj, id: this.products.length + 1 });
                console.log("Product has been added");
            }
        }
    }

    getProducts() {
        console.log("Products:");
        return console.log(this.products);
    }

    getProductByID(id) {
        let found = this.products.find((prod) => prod.id === id);
        if (found) {
            return console.log(found);
        } else {
            return console.error("Not found");
        }
    }
}

// Clase para construir un producto
class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

// TESTING
// - Crear instancia de ProductManager
const prodMan = new ProductManager();
// - Se llama al método getProduct() que deverá devolver un [] vacío
prodMan.getProducts(); // devuelve []

// - Se crea un producto para agregar a la instancia prodMan
const testProduct = new Product("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
prodMan.addProduct(testProduct);
// - Se llama al método getProduct() que deverá devolver el producto recien agregado con id sin repetirse
prodMan.getProducts(); // devuelve testProduct
// - Se llama de nuevo a addProduct() con los mismos campos, debe arrojar error por code repetido
const testProduct2 = new Product("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
prodMan.addProduct(testProduct2);
// - Se llama a getProductById() con un ID existente y otro no
prodMan.getProductByID(1);
prodMan.getProductByID(2);
