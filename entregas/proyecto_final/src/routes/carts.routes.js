import { Router } from 'express'
import { getManagerCarts } from '../dao/daoManager.js'

const routerCart = Router()

const cartManagerData = await getManagerCarts()
const cartManager = new cartManagerData()

routerCart.get('/:cid', async (req, res) => {
    try {
        const cart = await cartManager.getElementById(req.params.cid)
        const popCart = await cart.populate({ path: 'products.productId', model: cartManager.productModel })

        res.send({
            status: "success",
            payload: popCart
        })
    } catch (error) {
        res.send({
            status: "error",
            payload: error
        })
    }
})

// * Create a new empty cart
routerCart.post('/', async (req, res) => {
    try {
        const newCart = {}
        const data = await cartManager.addElements(newCart)

        res.send({
            status: "success",
            payload: data
        })
        console.log(data)
    } catch (error) {
        res.send({
            status: "error",
            payload: error
        })
        console.log(error)
    }
})

// * Add a single product to a specified cart
routerCart.post('/:cid/product/:pid', async (req, res) => {
    try {
        const data = await cartManager.addProduct(req.params.cid, req.params.pid, 1)

        res.send({
            status: "success",
            payload: data
        })

    } catch (error) {
        res.send({
            status: "error",
            payload: error
        })
    }
})

// * Replace all products with an array via req.body
routerCart.put('/:cid', async (req, res) => {
    try {
        const productsToAdd = req.body

        const response = await cartManager.replaceAllProducts(req.params.cid, productsToAdd)

        res.send({
            status: "success",
            payload: response
        })
    } catch (error) {
        res.send({
            status: "error",
            payload: error
        })
    }
})

// * Change quantity of a single product in a specified cart
routerCart.put('/:cid/product/:pid', async (req, res) => {
    try {
        const { quantity } = req.body
        const newQuantity = parseInt(quantity)

        const updatedProduct = await cartManager.changeQuantity(req.params.cid, req.params.pid, newQuantity)

        res.send({
            status: "success",
            payload: updatedProduct
        })

    } catch (error) {
        res.send({
            status: "error",
            payload: error
        })
    }

})

// * Remove an entire product from the cart 
routerCart.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const cart = await cartManager.removeProduct(req.params.cid, req.params.pid)

        res.send({
            status: "success",
            payload: cart
        })
    } catch (error) {
        res.send({
            status: "error",
            payload: error
        })

    }
})

// * Remove all products (empty) from the cart
routerCart.delete('/:cid', async (req, res) => {
    // Empty selected cart
    try {
        const cart = await cartManager.emptyCart(req.params.cid)
        res.send({
            status: "success",
            payload: cart
        })
    } catch (error) {
        res.send({
            status: "error",
            payload: error
        })
    }
})

export default routerCart