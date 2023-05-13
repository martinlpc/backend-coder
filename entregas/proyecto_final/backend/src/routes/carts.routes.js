import { Router } from "express";
import { purchaseCart, getCart, addProduct, changeProductQuantity, clearCart, removeProduct, overwriteCart, createNewCart } from "../controllers/cart.controller.js";
import { checkRole } from "../config/middlewares.js";

const routerCart = Router()

// Middleware to use in every cart related request
routerCart.use(checkRole("user"))

routerCart.route('/')
    .post(createNewCart)

routerCart.route('/:cid')
    .get(getCart)
    .put(overwriteCart)
    .delete(clearCart)

routerCart.route('/:cid/product/:pid')
    .post(addProduct)
    .put(changeProductQuantity)
    .delete(removeProduct)

routerCart.route('/purchase')
    .post(purchaseCart)



export default routerCart