import { Router } from "express";
import routerSession from "./sessions.routes.js";
import routerViews from "./views.routes.js";
import routerProduct from "./products.routes.js";
import routerCart from "./carts.routes.js";
import routerSocket from "./socket.routes.js"
import routerUser from "./users.routes.js";
import routerGithub from "./github.routes.js";
import routerPolicies from "./policies.routes.js";

const router = Router()

//router.use('/', routerSocket)
//router.use('/realtimeproducts', routerSocket)
router.use('/', routerViews)

router.use('/api/products', routerProduct)

router.use('/api/carts', routerCart)

router.use('/api/session', routerSession)

router.use('/authSession', routerGithub)

router.use('/chat', routerSocket)

router.use('/user', routerUser)

router.use('/policies', routerPolicies)

// router.use('*', (req, res) => {
//     res.status(404).send({ error: "404 not found" })
// })



export default router