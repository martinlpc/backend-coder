import { Router } from "express";
import { purchaseCart, getCart, addProduct, changeProductQuantity, clearCart, removeProduct, overwriteCart, createNewCart } from "../controllers/cart.controller.js";
import { checkRole } from "../controllers/session.controller.js";

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


//routerCart.get('/:cid', checkRole("user"), getCart)
//routerCart.post('/', checkRole("user"), createNewCart)
//routerCart.post('/:cid/product/:pid', checkRole("user"), addProduct)
//routerCart.post('/purchase', checkRole("user"), purchaseCart)
//routerCart.put('/:cid', checkRole("user"), overwriteCart)
//routerCart.put('/:cid/product/:pid', checkRole("user"), changeProductQuantity)
// routerCart.delete('/:cid/product/:pid', checkRole("user"), removeProduct)
//routerCart.delete('/:cid', checkRole("user"), clearCart)

export default routerCart