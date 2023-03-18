import { Router } from 'express'
import { getManagerProducts } from '../dao/daoManager.js'

const routerProduct = Router()
const managerData = await getManagerProducts()
const manager = new managerData()

routerProduct.get('/', async (req, res) => {
    let { limit = 10, page = 1, query = undefined, sort = undefined } = req.query;

    // Pagination filter and options
    const filter = { stock: { $gt: 0 } } // Showing products with stock >= 1
    if (query) filter.category = query
    const options = {
        page: page,
        limit: limit,
        sort: sort && Object.keys(sort).length ? sort : undefined
    };

    // Sorting definition, if no parameter is received, do not sort
    if (sort != undefined) {
        if (sort != "ASC" && sort != "DESC") {
            throw "Invalid sorting parameter"
        } else {
            sort == "ASC" ? options.sort = "price" : options.sort = "-price"
        }
    }

    // DB request
    try {
        // Getting paginated and filtered products
        const products = await manager.paginate(filter, options)

        // Creating links to prev and next pages
        const queryLink = query ? `&query=${query}` : ""
        const limitLink = limit ? `&limit=${limit}` : ""
        const sortLink = sort ? `&sort=${sort}` : ""
        const prevPageLink = products.hasPrevPage ? `/api/products?page=${products.prevPage}${limitLink}${queryLink}${sortLink}` : null
        const nextPageLink = products.hasNextPage ? `/api/products?page=${products.nextPage}${limitLink}${queryLink}${sortLink}` : null

        const response = {
            status: "success",
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: prevPageLink,
            nextLink: nextPageLink
        }

        res.send({ response })
    } catch (error) {
        res.send({ status: "error", error: error })
    }
});

routerProduct.get("/:pid", async (req, res) => {
    const product = await manager.getElementById(req.params.pid)
    res.send({ product })

});

routerProduct.post('/', async (req, res) => {
    try {
        const info = req.body
        const data = await manager.addElements(info)
        console.log(data)
        res.send({ data })
    } catch (error) {
        res.send({ error })
        console.log(error)
    }
})

routerProduct.put('/:pid', async (req, res) => {
    try {
        const data = await manager.updateElement(req.params.pid, req.body)
        res.send({ response: data })
    } catch (error) {
        res.send({ response: error })
    }

    // let { title, description, code, price, status, stock, category, thumbnails } = req.body
    // let data = await manager.updateProduct(parseInt(req.params.pid), title, description, code, price, status, stock, category, thumbnails)
    // data && res.send(data)
})

routerProduct.delete('/:pid', async (req, res) => {
    try {

        // MongoDB
        const data = await manager.deleteElement(req.params.pid)
        res.send({ response: data })


    } catch (error) {
        res.send({ response: error })

    }
    //let data = await manager.deleteProduct(parseInt(req.params.pid))
    //res.send(data)
})

export default routerProduct