import { Router } from 'express'
import { CartManager } from '../controllers/CartManager.js'

const routerCart = Router()
const manager = new CartManager('src/models/carts.json')

routerCart.post('/:cid/product/:pid', async (req, res) => {
    let cartId = req.params.cid
    let prodId = req.params.pid
    // * By now, prodQty is hardcoded to 1 as required
    const data = await manager.addProduct(parseInt(cartId), parseInt(prodId), 1)
    data ? res.send("Product added to cart") : res.send("Error on adding product")
})

routerCart.post('/', async (req, res) => {
    const data = await manager.createCart()
    data ? res.send(`Cart created with id ${data}`) : res.send("Error on creating cart")
})

routerCart.get('/:cid', async (req, res) => {
    const cart = await manager.getCart(parseInt(req.params.cid))
    cart ? res.send(cart) : res.send("Cart not found")
})

export default routerCart