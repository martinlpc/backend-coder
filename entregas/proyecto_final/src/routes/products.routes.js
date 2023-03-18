import { Router } from 'express'
import { getManagerProducts } from '../dao/daoManager.js'

const selectedDB = process.env.DBSELECTION
const routerProduct = Router()
const managerData = await getManagerProducts()
const manager = new managerData()

routerProduct.get('/', async (req, res) => {
    let { limit = 10, page = 1, query = undefined, sort = undefined } = req.query;
    if (selectedDB == 1) {
        // Pagination filter and options
        const filter = {}
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
            let prevPageLink, nextPageLink
            if (query) {
                prevPageLink = products.hasPrevPage ? `/api/products?limit=${limit}&page=${products.prevPage}&query=${query}&sort=${sort}` : null
                nextPageLink = products.hasNextPage ? `/api/products?limit=${limit}&page=${products.nextPage}&query=${query}&sort=${sort}` : null
            } else {
                prevPageLink = products.hasPrevPage ? `/api/products?limit=${limit}&page=${products.prevPage}&sort=${sort}` : null
                nextPageLink = products.hasNextPage ? `/api/products?limit=${limit}&page=${products.nextPage}&sort=${sort}` : null
            }

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
            res.send({ error })
        }

    } else {
        // SQL not implemented
    }

});

routerProduct.get("/:pid", async (req, res) => {
    if (selectedDB == 1) {
        // MongoDB
        const product = await manager.getElementById(req.params.pid)
        res.send({ response: product })
    } else {
        // SQL not implemented
    }
});

routerProduct.post('/', async (req, res) => {
    if (selectedDB == 1) {
        // MongoDB
        const { title, description, code, price, status, stock, category, thumbnails } = req.body
        try {
            const data = await manager.addElements({
                title: title,
                description: description,
                code: code,
                price: price,
                status: status,
                stock: parseInt(stock),
                category: category,
                thumbnails: thumbnails
            })
            console.log(data)
            res.send({ response: data })
        } catch (error) {
            res.send({ response: error })
            console.log(error)
        }
    } else {
        // SQL not implemented
    }

})

routerProduct.put('/:pid', async (req, res) => {
    try {
        if (selectedDB == 1) {
            // MongoDB
            const data = await manager.updateElement(req.params.pid, req.body)
            res.send({ response: data })
        } else {
            // SQL not implemented
        }
    } catch (error) {
        res.send({ response: error })
    }

    // let { title, description, code, price, status, stock, category, thumbnails } = req.body
    // let data = await manager.updateProduct(parseInt(req.params.pid), title, description, code, price, status, stock, category, thumbnails)
    // data && res.send(data)
})

routerProduct.delete('/:pid', async (req, res) => {
    try {
        if (selectedDB == 1) {
            // MongoDB
            const data = await manager.deleteElement(req.params.pid)
            res.send({ response: data })
        } else {
            // SQL not implemented
        }

    } catch (error) {
        res.send({ response: error })

    }
    //let data = await manager.deleteProduct(parseInt(req.params.pid))
    //res.send(data)
})

export default routerProduct