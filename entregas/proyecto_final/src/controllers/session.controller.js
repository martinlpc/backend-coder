import { userManager } from "./user.controller.js"
import { validatePassword } from "../utils/bcrypt.js"

export const getSession = (req, res) => {
    try {
        if (req.session.login) { // Session is still active?
            res.redirect('/product')
        }
        // Session inactive
        res.redirect('/api/session/login', 500, { message: "Logueate para continuar" })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const checkLogin = async (req, res) => {
    try {
        // Get login info from form
        const { email, password } = req.body
        const user = await userManager.getUserByEmail(email)

        if (user && validatePassword(password, user.password)) {
            req.session.login = true
            res.status(200).json({
                message: "Logged in"
            })
        } else {
            res.status(401).json({
                message: "User or password incorrect"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const destroySession = (req, res) => {
    try {
        if (req.session.login) {
            req.session.destroy()
        }
        res.redirect('/products', 200, { message: 'Cerraste tu sesión' })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}