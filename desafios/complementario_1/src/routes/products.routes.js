import { Router } from 'express'
import { managerProducts } from '../dao/MongoDB/models/Product.js';
//import ProductManager from '../controllers/ProductManager.js';

const routerProduct = Router()
const manager = new ProductManager('src/models/products.json')

routerProduct.get('/', async (req, res) => {
    // const products = await manager.getProducts();
    // let { limit } = req.query;
    // let data;
    // if (!limit) {
    //     data = products;
    // } else {
    //     data = products.slice(0, parseInt(limit));
    // }
    // res.send(data);
    const products = await managerProducts.getElements();
    res.send({ response: products })
});

routerProduct.get("/:pid", async (req, res) => {
    // const product = await manager.getProductById(parseInt(req.params.pid));
    // product === null ? res.send("Product not found") : res.send(product);
    const productId = req.params.pid
    const product = await managerProducts.getElementById(productId)
    res.send({ response: product })
});

routerProduct.post('/', async (req, res) => {
    let { title, description, code, price, status, stock, category, thumbnails } = req.body;
    const data = await manager.addProduct(title, description, code, price, status, stock, category, thumbnails)
    res.send(`${data}`);
})

routerProduct.put('/:pid', async (req, res) => {
    let { title, description, code, price, status, stock, category, thumbnails } = req.body
    let data = await manager.updateProduct(parseInt(req.params.pid), title, description, code, price, status, stock, category, thumbnails)
    data && res.send(data)
})

routerProduct.delete('/:pid', async (req, res) => {
    let data = await manager.deleteProduct(parseInt(req.params.pid))
    res.send(data)
})

export default routerProduct