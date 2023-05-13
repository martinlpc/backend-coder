import { getProducts } from "./product.controller.js"

const PRODUCTS_URL = 'http://localhost:8080/api/products'
const CARTS_URL = 'http://localhost:8080/api/carts'

export const viewLogin = async (req, res) => {

    const message = req.session.message
    delete req.session.message

    res.render('login', { message })

}

export const viewRegister = (req, res) => {
    const message = req.session.message
    delete req.session.message
    res.render('register', { message })
}

export const viewCart = async (req, res) => {
    try {
        const response = await fetch(`${CARTS_URL}/${req.params.cid}`)
        const data = await response.json()

        const { status, payload } = data

        let products = []
        for (const item of payload.products) {
            products.push({
                title: item.productId.title,
                description: item.productId.description,
                price: item.productId.price,
                quantity: item.quantity
            })
        }

        res.render('carts', {
            status,
            products,
            cartID: req.params.cid
        })
    } catch (error) {
        res.render("carts", {
            status: "error",
            message: "Cart not found",
        });
    }
}

export const viewChat = async (req, res) => {
    console.log(`Enviando datos al render de chat:
        ${req.session.user.first_name} ${req.session.user.last_name},
        ${req.session.user.email},
        ${req.session.user.role}`)
    res.render('chat', {
        userdata: {
            name: `${req.session.user.first_name} ${req.session.user.last_name}`,
            mail: req.session.user.email,
            role: req.session.user.role
        }
    })
}

export const renderProducts = async (req, res) => {
    try {
        let { limit = 10, page = 1, category = undefined, stock = undefined, sort = undefined } = req.query;

        // Get session data prior to continue
        const userFirst = req.session.user.first_name
        const userRole = req.session.user.role

        // Creating links to prev and next pages
        const categoryLink = category ? `&category=${category}` : ""
        const stockLink = stock ? `&stock=${stock}` : ""
        const limitLink = limit ? `&limit=${limit}` : ""
        const sortLink = sort ? `&sort=${sort}` : ""
        const pageLink = page ? `&page=${page}` : ""

        console.debug(`fetching: ${PRODUCTS_URL}?${categoryLink}${stockLink}${limitLink}${sortLink}${pageLink}`)
        const response = await fetch(`${PRODUCTS_URL}?${categoryLink}${stockLink}${limitLink}${sortLink}${pageLink}`)
        console.log(`resp: ${response}`)
        const data = await response.json()
        console.log(`data: ${data} `)

        //const data = await getProducts(req, res)

        const { status, payload, totalPages, prevPage, nextPage, actualPage, hasPrevPage, hasNextPage, prevLink, nextLink } = data

        let statusBool = status === "success" ? true : false

        res.render('products', {
            statusBool,
            payload,
            totalPages,
            prevPage,
            nextPage,
            actualPage,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink,
            user: {
                name: userFirst,
                role: userRole
            }
        })
        console.log(`status ${status} `)
    } catch (error) {
        res.render('products', {
            status: "error",
            payload: error
        })
        console.error(error)
    }
}