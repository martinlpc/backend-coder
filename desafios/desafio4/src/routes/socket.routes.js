import { Router } from 'express'
import ProductManager from '../controllers/ProductManager.js';

const routerSocket = Router()
const manager = new ProductManager('src/models/products.json')

routerSocket.get('/', async (req, res) => {
    const products = await manager.getProducts();
    let { limit } = req.query;
    let data;
    if (!limit) {
        data = products;
    } else {
        data = products.slice(0, parseInt(limit));
    }
    res.render("home", { data });
})

routerSocket.get("/realtimeproducts", async (req, res) => {
    const products = await manager.getProducts()

    res.render("realTimeProducts", {
        products: products
    })
})

export default routerSocket