import { Router } from 'express'
import ProductManager from '../controllers/ProductManager';

const routerProduct = Router()
const manager = new ProductManager('src/models/database.json')

/* 
 TODO: Testear todo el endpoint
 TODO: Replicar algo similar para cartRoutes
*/

routerProduct.get('/', (req, res) => {
    res.send("API PRODUCTS");
});

routerProduct.get('/products', async (req, res) => {
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

routerProduct.get("/products/:pid", async (req, res) => {
    const product = await manager.getProductById(parseInt(req.params.pid));
    product === null ? res.send("No se encontró el producto") : res.send(product);
});

routerProduct.post('/', async (req, res) => {
    let { title, description, code, price, status, stock, category, thumbnails } = req.body;
    await manager.addProduct(title, description, price, category, thumbnails, code, stock, status)
    res.send("Product added to the database");
})

routerProduct.put('/:id', async (req, res) => {
    let data = await manager.updateProduct(req.params.id, req.body)
    res.send(data)
})

routerProduct.delete('/:id', async (req, res) => {
    let data = await manager.deleteProduct(req.params.id)
    res.send(data)
})

export default routerProduct