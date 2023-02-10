import { Router } from 'express'
import ProductManager from '../controllers/ProductManager.js';

const routerProduct = Router()
const manager = new ProductManager('src/models/products.json')

routerProduct.get('/', async (req, res) => {
    const products = await manager.getProducts();
    let { limit } = req.query;
    let data;
    if (!limit) {
        data = products;
    } else {
        data = products.slice(0, parseInt(limit));
    }
    res.send(data);
});

routerProduct.get("/:pid", async (req, res) => {
    const product = await manager.getProductById(parseInt(req.params.pid));
    product === null ? res.send("Product not found") : res.send(product);
});

routerProduct.post('/', async (req, res) => {
    let { title, description, price, category, thumbnails, code, stock, status } = req.body;
    await manager.addProduct(title, description, price, category, thumbnails, code, stock, status)
    res.send("Product added to the database");
})

routerProduct.put('/:pid', async (req, res) => {
    let data = await manager.updateProduct(req.params.id, req.body)
    data && res.send(data)
})

routerProduct.delete('/:pid', async (req, res) => {
    let data = await manager.deleteProduct(req.params.id)
    res.send(data)
})

export default routerProduct