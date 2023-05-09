import { Router } from "express";
import { checkRole, isSessionActive } from "../config/middlewares.js";
import { viewCart, viewChat, viewLogin, viewProducts, viewRegister } from "../controllers/views.controller.js";

const routerViews = Router()

routerViews.get('/', viewLogin)
routerViews.get('/login', viewLogin)
routerViews.get('/register', viewRegister)
routerViews.get('/products', isSessionActive, viewProducts)
routerViews.get('/carts/:cid', checkRole("user"), viewCart)
routerViews.get('/chat', viewChat)

export default routerViews