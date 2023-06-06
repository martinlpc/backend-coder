import { Router } from "express";
import { purchaseCart, getCart, addProduct, changeProductQuantity, clearCart, removeProduct, overwriteCart, createNewCart } from "../controllers/cart.controller.js";
import { Roles, checkRole } from "../middlewares/session.js";

const routerCart = Router()

// Middleware to use in every cart related request
routerCart.use(checkRole(Roles.USER))

routerCart.route('/')
    .post(createNewCart)
    .get(getCart)

routerCart.route('/:cid')
    .put(overwriteCart)
    .delete(clearCart)

routerCart.route('/product/:pid')
    .post(addProduct)

routerCart.route('/:cid/product/:pid')
    .put(changeProductQuantity)
    .delete(removeProduct)

routerCart.route('/purchase')
    .post(purchaseCart)

export default routerCart