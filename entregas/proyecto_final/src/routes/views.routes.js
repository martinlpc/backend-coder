import { Router } from "express";
import { getManagerProducts } from "../dao/daoManager.js";

const routerViews = Router()

const managerData = await getManagerProducts()
const manager = new managerData()

routerViews.get('/', async (req, res) => {
    // TODO: implementar la vista de productos paginados
})

export default routerViews