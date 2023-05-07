import { Router } from "express";
import { getProducts, getProduct, addProducts, modifyProduct, removeProduct } from "../controllers/product.controller.js";
import { checkRole, isSessionActive } from "../controllers/session.controller.js";

const routerProduct = Router()

routerProduct.route('/')
    .get(isSessionActive, getProducts)
    .post(checkRole("admin"), addProducts)

routerProduct.route('/:pid')
    .get(isSessionActive, getProduct)
    .put(checkRole("admin"), modifyProduct)
    .delete(checkRole("admin"), removeProduct)


// routerProduct.get('/', isSessionActive, getProducts)
// routerProduct.get('/:pid', isSessionActive, getProduct)
// routerProduct.post('/', checkRole("admin"), addProducts)
// routerProduct.put('/:pid', checkRole("admin"), modifyProduct)
// routerProduct.delete('/:pid', checkRole("admin"), removeProduct)

export default routerProduct