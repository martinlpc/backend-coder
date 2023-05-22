import { Router } from "express";
import { checkRole, isSessionActive } from "../middlewares/session.js";
import { renderProducts, viewCart, viewChat, viewLogin, viewRegister } from "../controllers/views.controller.js";

const routerViews = Router()

routerViews.get('/', viewLogin)
routerViews.get('/login', viewLogin)
routerViews.get('/register', viewRegister)
routerViews.get('/products', isSessionActive, renderProducts)
routerViews.get('/carts/:cid', checkRole("user"), viewCart)
routerViews.get('/chat', isSessionActive, viewChat)

export default routerViews