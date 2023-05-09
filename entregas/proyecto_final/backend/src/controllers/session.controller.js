import passport from "passport";

export const registerUser = async (req, res, next) => {
    try {
        passport.authenticate('register', async (err, user) => {
            if (err) {
                return res.status(401).send({
                    message: `Error on register`,
                    error: err.message
                })
            }
            if (!user) {
                return res.status(401).send(`Email already in use`)
            }

            return res.status(200).send(`User succesfully registered`)
        })(req, res, next)
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            error: error.message
        })
    }
}

export const loginUser = async (req, res, next) => {
    try {
        passport.authenticate('login', (err, user) => {
            if (err) {
                return res.status(401).send({
                    message: `Error on login`,
                    error: err.message
                })
            }
            if (!user) {
                return res.status(401).send(`Wrong credentials`)
            }
            req.session.login = true
            req.session.user = user

            console.log(`Logon detected: ${req.session.user.email}`)

            return res.status(200).send(`Welcome ${req.session.user.role} ${req.session.user.first_name}`)
        })(req, res, next)
    } catch (error) {
        res.status(500).send({
            message: "Server internal error",
            error: error.message
        })
    }
}

export const destroySession = async (req, res) => {
    try {
        if (req.session.login) {
            const username = req.session.user.first_name
            req.session.destroy()
            res.status(200).send(`Session "${username}" terminated.`)
        } else {
            return res.status(401).send(`No active session found`)
        }
    } catch (error) {
        res.status(500).send({
            message: "Server internal error",
            error: error.message
        })
    }
}

export const getSession = async (req, res) => {
    try {
        if (req.session.login) {
            console.log(req.session.user)
            res.status(200).json(req.session.user);
        } else {
            return res.status(401).send(`No active session found`)
        }
    } catch (error) {
        res.status(500).send({
            message: "Server internal error",
            error: error.message
        })
    }
}



