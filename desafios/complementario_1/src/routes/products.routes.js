import { Router } from 'express'
import { getManagerProducts } from '../dao/daoManager.js'
//import ProductManager from '../controllers/ProductManager.js';

const selectedDB = process.env.DBSELECTION
const routerProduct = Router()
const managerData = await getManagerProducts()
const manager = new managerData()

routerProduct.get('/', async (req, res) => {
    let { limit } = req.query;
    if (selectedDB == 1) {
        // MongoDB
        let products
        !limit
            ? products = await manager.getElements(0)
            : products = await manager.getElements(limit)
        res.send({ response: products })
    } else {
        // SQL not implemented
    }

    // * FileSystem deprecated
    // const products = await manager.getProducts();
    // let { limit } = req.query;
    // let data;
    // if (!limit) {
    //     data = products;
    // } else {
    //     data = products.slice(0, parseInt(limit));
    // }
    // res.send(data);

});

routerProduct.get("/:pid", async (req, res) => {
    // const product = await manager.getProductById(parseInt(req.params.pid));
    // product === null ? res.send("Product not found") : res.send(product);
    if (selectedDB == 1) {
        // MongoDB
        const product = await manager.getElementById(req.params.pid)
        res.send({ response: product })
    } else {
        // SQL not implemented
    }
});

routerProduct.post('/', async (req, res) => {
    try {
        if (selectedDB == 1) {
            // MongoDB
            const data = await manager.addElements(req.body)
            res.send({ response: data })
        } else {
            // SQL not implemented
        }
    } catch (error) {
        res.send({ response: error })
    }

    // * FileSystem deprecated
    // let { title, description, code, price, status, stock, category, thumbnails } = req.body;
    // const data = await manager.addProduct(title, description, code, price, status, stock, category, thumbnails)
    // res.send(`${data}`);
})

routerProduct.put('/:pid', async (req, res) => {
    try {
        if (selectedDB == 1) {
            // MongoDB
            const data = await manager.updateElement(req.params.pid, req.body)
            res.send({ response: data })
        } else {
            // SQL not implemented
        }
    } catch (error) {
        res.send({ response: error })
    }

    // let { title, description, code, price, status, stock, category, thumbnails } = req.body
    // let data = await manager.updateProduct(parseInt(req.params.pid), title, description, code, price, status, stock, category, thumbnails)
    // data && res.send(data)
})

routerProduct.delete('/:pid', async (req, res) => {
    try {
        if (selectedDB == 1) {
            // MongoDB
            const data = await manager.deleteElement(req.params.pid)
            res.send({ response: data })
        } else {
            // SQL not implemented
        }

    } catch (error) {
        res.send({ response: error })

    }
    //let data = await manager.deleteProduct(parseInt(req.params.pid))
    //res.send(data)
})

export default routerProduct