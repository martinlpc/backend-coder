import { Router } from 'express'
//import { CartManager } from '../dao/FileSystem/CartManager.js'
import { getManagerCarts, getManagerProducts } from '../dao/daoManager.js'
import mongoose from "mongoose"

const selectedDB = process.env.DBSELECTION
const routerCart = Router()
//const cartManager = new CartManager('src/models/carts.json')
//const prodManager = new ProductManager('src/models/products.json')
const cartManagerData = await getManagerCarts()
const cartManager = new cartManagerData()

const prodManagerData = await getManagerProducts()
const prodManager = new prodManagerData()

routerCart.post('/:cid/product/:pid', async (req, res) => {
    if (selectedDB == 1) {
        // MongoDB
        const cartSchema = new Schema({
            products: {
                type: Array,
                required: true
            }

        })
        const cart = mongoose.model("Cart", cartSchema)

        const productQty = 1 // Hardcoded by now 

        try {
            const productInfo = await prodManager.getElementById(req.params.pid)
            if (productInfo) {
                const dataToWrite = new cart({
                    products: [
                        { id: req.params.pid, quantity: productQty }
                    ]
                })
                const response = await cartManager.addElements(dataToWrite)

                res.send(`Product with id: "${req.params.pid}" added to cart`)
            } else {
                res.send(`The id: "${req.params.pid}" was not found`)
            }
        } catch (error) {
            res.send("Error accessing to the database")
        }


    } else {
        //SQL not implemented
    }

    // * FileSystem deprecated
    // const prodQty = 1 // By now, prodQty is hardcoded to 1 as required
    // const productInfo = await prodManager.getProductById(parseInt(req.params.pid))
    // if (productInfo) {
    //     const data = await cartManager.addProduct(parseInt(req.params.cid), parseInt(req.params.pid), prodQty)
    //     data ? res.send(`Product "${productInfo.id}" added to cart`) : res.send(`Error on adding product`)
    // } else {
    //     res.send(`Product "${req.params.pid}" not found`)
    // }

})

routerCart.post('/', async (req, res) => {
    const data = await cartManager.createCart()
    data ? res.send(`Cart created with id ${data}`) : res.send("Error on creating cart")
})

routerCart.get('/:cid', async (req, res) => {
    const cart = await cartManager.getCart(parseInt(req.params.cid))
    cart ? res.send(cart) : res.send(`Cart not found`)
})

routerCart.delete('/:cid/product/:pid', async (req, res) => {
    const data = await cartManager.removeProductById(parseInt(req.params.cid), parseInt(req.params.pid))
    res.send(data)
})

export default routerCart