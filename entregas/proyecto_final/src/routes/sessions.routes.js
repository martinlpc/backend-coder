import { Router } from "express";
import { destroySession, checkLogin } from "../controllers/session.controller.js";
import passport from "passport";
import { viewProducts } from "../controllers/view.controller.js";

const routerSession = Router();

routerSession.post(
    "/login",
    passport.authenticate("login", {
        successRedirect: "/products",
        failureRedirect: "/login",
    })
);
//), viewProducts); //checkLogin)

routerSession.get("/logout", destroySession);

routerSession.get(
    "/testJWT",
    passport.authenticate("jwt", { session: false }, (req, res) => {
        res.send({ message: "tokenJWT" });
    })
);

export default routerSession;
