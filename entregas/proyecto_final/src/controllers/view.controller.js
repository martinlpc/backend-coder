import { getSession } from "./session.controller.js"

const PRODUCTS_URL = 'http://localhost:8080/api/products'
const CARTS_URL = 'http://localhost:8080/api/carts'

export const viewProducts = (req, res) => {
    res.redirect('/products')
}

export const viewLogin = (req, res) => {
    res.render('login')
}

export const viewRegister = (req, res) => {
    res.render('register')
}

export const viewCarts = async (req, res) => {
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
        res.render('carts', {
            status: "error",
            message: "Cart not found"
        })
    }
}

export const renderProducts = async (req, res) => {
    try {
        let { limit = 10, page = 1, category = undefined, stock = undefined, sort = undefined } = req.query;

        // Creating links to prev and next pages
        const categoryLink = category ? `&category=${category}` : ""
        const stockLink = stock ? `&stock=${stock}` : ""
        const limitLink = limit ? `&limit=${limit}` : ""
        const sortLink = sort ? `&sort=${sort}` : ""
        const pageLink = page ? `&page=${page}` : ""

        const response = await fetch(`${PRODUCTS_URL}?${categoryLink}${stockLink}${limitLink}${sortLink}${pageLink}`)
        const data = await response.json()

        const { status, payload, totalPages, prevPage, nextPage, actualPage, hasPrevPage, hasNextPage, prevLink, nextLink } = data

        let statusBool = status === "success" ? true : false

        // Getting session data

        const sessionData = await getSession(req, res)
        console.log({ sessionData })
        const userFirst = sessionData.name
        const userRole = sessionData.role

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
            userFirst,
            userRole
        })
    } catch (error) {
        res.render('products', {
            status: "error",
            payload: error
        })
        console.log(error)
    }
}