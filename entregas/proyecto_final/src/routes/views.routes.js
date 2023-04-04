import { Router } from "express";
import { requireAuth, tryLogin } from "../controllers/session.controller.js";
import { renderProducts, viewCarts, viewLogin, viewRegister } from "../controllers/view.controller.js";

const routerViews = Router();

routerViews.get("/", requireAuth, viewLogin); //requireAuth, viewProducts);

routerViews.get("/login", viewLogin) //viewLogin);

routerViews.get("/register", viewRegister);

routerViews.get("/products", requireAuth, renderProducts); //requireAuth, renderProducts);

routerViews.get("/carts/:cid", requireAuth, viewCarts);

export default routerViews;
