import { Router } from "express";
import { requireAuth } from "../controllers/session.controller.js";
import { renderProducts, viewCarts, viewLogin, viewProducts, viewRegister } from "../controllers/view.controller.js";

const routerViews = Router();

routerViews.get("/", viewLogin); //requireAuth, viewProducts);

routerViews.get("/login", viewLogin);

routerViews.get("/register", viewRegister);

routerViews.get("/products", (req, res) => {
    if (req.isAuthenticated()) {
        renderProducts;
    } else {
        res.redirect("/login");
    }
}); //, renderProducts); //requireAuth, renderProducts);

routerViews.get("/carts/:cid", requireAuth, viewCarts);

export default routerViews;
