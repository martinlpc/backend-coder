import { Router } from "express";
import { checkRole, isSessionActive } from "../controllers/session.controller.js";
import { viewCart, viewLogin, viewProducts, viewRegister } from "../controllers/views.controller.js";

const routerViews = Router()

routerViews.get('/', viewLogin)
routerViews.get('/login', viewLogin)
routerViews.get('/register', viewRegister)
routerViews.get('/products', isSessionActive, viewProducts)
routerViews.get('/carts/:cid', checkRole("user"), viewCart)

export default routerViews