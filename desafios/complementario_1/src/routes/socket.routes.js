import { Router } from 'express'
//import ProductManager from '../controllers/ProductManager.js';
import { getManagerMessages, getManagerProducts } from '../dao/daoManager.js';

const routerSocket = Router()
const selectedDB = process.env.DBSELECTION
const prodManagerData = await getManagerProducts()
const prodManager = new prodManagerData()

const msgManagerData = await getManagerMessages()
const msgManager = new msgManagerData()

routerSocket.get('/', async (req, res) => {
    let { limit } = req.query;
    if (selectedDB == 1) {
        // MongoDB
        let products
        !limit
            ? products = await prodManager.getElements(0)
            : products = await prodManager.getElements(limit)
        res.render("home", { products })
    } else {
        // SQL not implemented
    }

    // const products = await manager.getProducts();
    // let { limit } = req.query;
    // let data;
    // if (!limit) {
    //     data = products;
    // } else {
    //     data = products.slice(0, parseInt(limit));
    // }
    // res.render("home", { data });
})

routerSocket.get("/realtimeproducts", async (req, res) => {

    if (selectedDB == 1) {
        const products = await prodManager.getElements(0)
        res.render("realTimeProducts", { products: products })
    } else {
        console.log("SQL not implemented")
    }

    // const products = await manager.getProducts()

    // res.render("realTimeProducts", {
    //     products: products
    // })
})

routerSocket.get("/chat", async (req, res) => {
    const messages = await msgManager.getElements(0)
    res.render("chat", { messages: messages })

})

export default routerSocket