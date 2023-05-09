import { Router } from "express";
import { purchaseCart, getCart, addProduct, changeProductQuantity, clearCart, removeProduct, overwriteCart, createNewCart } from "../controllers/cart.controller.js";
import { checkRole } from "../config/middlewares.js";

const routerCart = Router()

routerCart.route('/')
    .post(checkRole("user"), createNewCart)

routerCart.route('/:cid')
    .get(checkRole("user"), getCart)
    .put(checkRole("user"), overwriteCart)
    .delete(checkRole("user"), clearCart)

routerCart.route('/:cid/product/:pid')
    .post(checkRole("user"), addProduct)
    .put(checkRole("user"), changeProductQuantity)
    .delete(checkRole("user"), removeProduct)

routerCart.route('/purchase')
    .post(checkRole("user"), purchaseCart)

export default routerCart