import { Router } from "express";
import { getProducts, getProduct, addProducts, modifyProduct, removeProduct } from "../controllers/product.controller.js";
import { checkRole, isSessionActive } from "../config/middlewares.js";

const routerProduct = Router()

routerProduct.route('/')
    .get(isSessionActive, getProducts)
    .post(checkRole("admin"), addProducts)

routerProduct.route('/:pid')
    .get(isSessionActive, getProduct)
    .put(checkRole("admin"), modifyProduct)
    .delete(checkRole("admin"), removeProduct)

export default routerProduct