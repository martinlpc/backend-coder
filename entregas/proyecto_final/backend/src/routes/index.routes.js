import { Router } from "express"
import { __dirname } from "../path.js"
import routerCart from "./carts.routes.js"
import routerProduct from "./products.routes.js"
import routerSession from "./sessions.routes.js"
import routerUser from "./users.routes.js"
import routerViews from "./views.routes.js"
import routerGithub from "./github.routes.js"
import { routerChat } from "./chat.routes.js"
import { getRandomProducts } from "../utils/mocking/mocking.controller.js"

const router = Router()

router.use('/api/carts', routerCart)
router.use('/api/products', routerProduct)
router.use('/api/session', routerSession)
router.use('/api/users', routerUser)
router.use('/api/chat', routerChat)
router.use('/authSession', routerGithub)
router.use('/', routerViews)

// Temporal endpoint to create 100 random products
router.get('/mockingproducts', getRandomProducts)

export default router