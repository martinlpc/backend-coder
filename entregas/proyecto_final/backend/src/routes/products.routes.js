import { Router } from "express";
import { getProducts, getProduct, addProducts, modifyProduct, removeProduct } from "../controllers/product.controller.js";
import { Roles, checkRole, isSessionActive } from "../middlewares/session.js";

const routerProduct = Router()

routerProduct.route('/')
    .get(isSessionActive, getProducts)
    .post(checkRole(Roles.ADMIN), addProducts)

routerProduct.route('/:pid')
    .get(isSessionActive, getProduct)
    .put(checkRole(Roles.ADMIN), modifyProduct)
    .delete(checkRole(Roles.ADMIN), removeProduct)

export default routerProduct