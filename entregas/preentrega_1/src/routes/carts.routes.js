import { Router } from 'express'
import CartManager from '../controllers/CartManager'

const routerCart = Router()
const manager = new CartManager();

routerCart.get('/', (req, res) => {
    res.send("API CARTS");
})

export default routerCart