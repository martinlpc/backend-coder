import { Router } from 'express'
import { getManagerCarts, getManagerProducts } from '../dao/daoManager.js'
import mongoose from "mongoose"


const routerCart = Router()

const cartManagerData = await getManagerCarts()
const cartManager = new cartManagerData()
const prodManagerData = await getManagerProducts()
const prodManager = new prodManagerData()

routerCart.get('/:cid', async (req, res) => {
    const cart = await cartManager.getElementById(req.params.cid)
    const popCart = await cart.populate({ path: 'products.productId', model: cartManager.productModel })
    res.send({ popCart })
})
routerCart.post('/:cid/product/:pid', async (req, res) => {
    // const cartSchema = new Schema({
    //     products: {
    //         type: Array,
    //         required: true
    //     }

    // })
    // const cart = mongoose.model("Cart", cartSchema)

    // const productQty = 1 // Hardcoded by now 

    // try {
    //     const productInfo = await prodManager.getElementById(req.params.pid)
    //     if (productInfo) {
    //         const dataToWrite = new cart({
    //             products: [
    //                 { id: req.params.pid, quantity: productQty }
    //             ]
    //         })
    //         const response = await cartManager.addElements(dataToWrite)

    //         res.send(`Product with id: "${req.params.pid}" added to cart`)
    //     } else {
    //         res.send(`The id: "${req.params.pid}" was not found`)
    //     }
    // } catch (error) {
    //     res.send("Error accessing to the database")
    // }
    try {

    } catch (error) {

    }
})

routerCart.post('/', async (req, res) => {
    // const data = await cartManager.createCart()
    // data ? res.send(`Cart created with id ${data}`) : res.send("Error on creating cart")
    try {
        const data = await cartManager.addElements({ products: [] })
        res.send({ data })
        console.log(data)
    } catch (error) {
        res.send({ error })
        console.log(error)
    }
})

routerCart.put('/:cid', async (req, res) => {

})

routerCart.put('/:cid/products/:pid', async (req, res) => {

})

routerCart.delete('/:cid/product/:pid', async (req, res) => {
    // const data = await cartManager.removeProductById(parseInt(req.params.cid), parseInt(req.params.pid))
    // res.send(data)
})

routerCart.delete('/:cid', async (req, res) => {
    // Empty selected cart
})

export default routerCart