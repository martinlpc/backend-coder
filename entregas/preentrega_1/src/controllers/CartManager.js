import { promises as fs, existsSync, writeFileSync } from "fs";

/*

TODO: Tomar referencia de ProductManager y crear los métodos

*/

class CartManager {
    constructor(products) {
        this.products = products
    }
}

export default CartManager