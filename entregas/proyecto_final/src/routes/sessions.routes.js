import { Router } from "express";
import { destroySession, tryLogin } from "../controllers/session.controller.js";
import passport from "passport";
import { passportError, roleVerification } from "../utils/errorMessages.js";
import { getCurrentSession } from "../controllers/session.controller.js";

const routerSession = Router();

routerSession.post("/login", passport.authenticate('login'), tryLogin);

routerSession.get("/logout", destroySession);

routerSession.get("/testJWT", passport.authenticate("jwt", { session: false },
    (req, res) => {
        res.send({ message: "tokenJWT" });
    })
);

routerSession.get('/current', getCurrentSession)

// routerSession.get('/current', passportError('jwt'), roleVerification('Admin'), (req, res) => {
//     res.send(req.user)
// })

export default routerSession;
