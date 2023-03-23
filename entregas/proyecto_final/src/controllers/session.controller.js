export const getSession = (req, res) => {
    try {
        if (req.session.login) { // Si la sesión está activa en la DB
            res.redirect('/product')
        }
        // No está activa la sesión
        res.redirect('/api/session/login')
    } catch (error) {

    }
}

export const checkLogin = (req, res) => {
    try {
        // Consultar datos del form de login
        const { email, password } = req.body
        if (email == "m@m.com" && password == "1234") {
            // Login correcto
            req.session.login = true
            res.redirect('/product')
        } else {
            res.redirect('/api/session/login')
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
            req.session.destroy(() => {
                res.redirect('/api/session/login')
            })
        }
        res.redirect('/api/session/login')
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}