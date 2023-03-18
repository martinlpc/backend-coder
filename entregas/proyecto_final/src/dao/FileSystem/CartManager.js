import { promises as fs, existsSync, writeFileSync } from "fs";

class Cart {
    // Internal class to manage data
    constructor(id, products) {
        this.id = id
        this.products = products
    }
}
export class CartManager {
    constructor(path) {
        this.path = path
    }

    checkFile = () => {
        // If the file doesn't exists, we create it. Otherwise, do nothing
        !existsSync(this.path) && writeFileSync(this.path, "[]", "utf-8");
    };

    async createCart() {
        this.checkFile()
        try {
            // Reading file to create the correct ID for the new cart
            const read = await fs.readFile(this.path, 'utf-8')
            let data = JSON.parse(read)
            let newId
            // No data => id=1, otherwise id=lastid+1
            data.length > 0 ? newId = data[data.length - 1].id + 1 : newId = 1
            const newCart = new Cart(newId, []);
            data.push(newCart)
            await fs.writeFile(this.path, JSON.stringify(data))
            return newId
        } catch (err) {
            console.error(err)
            return null
        }
    }

    async addProduct(cartId, prodId, prodQty) {
        this.checkFile();
        try {
            // Reading file
            const read = await fs.readFile(this.path, "utf-8");
            let data = JSON.parse(read);
            // Check existing cart id
            const foundCartIndex = data.findIndex(elem => elem.id === cartId)
            if (foundCartIndex === -1) {
                throw `Cart ID not found`
            } else {
                // Extract products array
                const cartObj = new Cart(cartId, data[foundCartIndex].products)
                const foundProdIndex = cartObj.products.findIndex(elem => elem.product === prodId)
                if (foundProdIndex === -1) {
                    // Push new product to the array value products
                    cartObj.products.push({ product: prodId, quantity: prodQty })
                    // Write updated cart to data array
                    data[foundCartIndex] = cartObj
                } else {
                    // Increase quantity by modifying only its value
                    data[foundCartIndex].products[foundProdIndex].quantity += prodQty
                }
            }
            // Write data to the file
            await fs.writeFile(this.path, JSON.stringify(data), "utf-8");
            return true;
        } catch (err) {
            console.error(err);
            return err
        }
    }

    async getCart(id) {
        this.checkFile()
        try {
            const read = await fs.readFile(this.path, "utf-8");
            const data = JSON.parse(read);
            const found = data.findIndex(elem => elem.id === id)
            if (found === -1) {
                throw "Cart ID not found"
            } else {
                return data[found] // Cart[id]
            }
        } catch (err) {
            console.error(err)
            return null
        }
    }

    async removeProductById(cartId, prodId) {
        this.checkFile()
        try {
            // Reading file
            const read = await fs.readFile(this.path, "utf-8");
            let data = JSON.parse(read);
            // Check existing cart id
            const foundCartIndex = data.findIndex(elem => elem.id === cartId)
            if (foundCartIndex === -1) {
                return `Cart ID not found`
            } else {
                // Extract products array
                const cartObj = new Cart(cartId, data[foundCartIndex].products)
                const foundProdIndex = cartObj.products.findIndex(elem => elem.product === prodId)
                if (foundProdIndex === -1) {
                    return `Product id "${prodId}" not found on cart id "${cartId}"`
                } else {
                    // Remove product (total quantity)
                    data[foundCartIndex].products.splice(foundProdIndex, 1)
                    await fs.writeFile(this.path, JSON.stringify(data), "utf-8");
                    return true
                }
            }
        } catch (err) {
            console.error(err)
            return err
        }
    }
}