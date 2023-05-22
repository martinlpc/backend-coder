import passport from "passport";

export const registerUser = async (req, res, next) => {
    try {
        passport.authenticate('register', async (err, user) => {
            if (err) {
                req.logger.error(`Error on register procedure - ${err.message}`)
                return res.status(401).send({
                    message: `Error on register`,
                    error: err.message
                })
            }
            if (!user) {
                req.logger.info(`Register process cancelled - Email already in use`)
                return res.status(401).send(`Email already in use`)
            }
            req.logger.info(`User ${req.user.email} registered`)
            return res.status(200).send(`User succesfully registered`)
        })(req, res, next)
    } catch (error) {
        req.logger.error(`Error in register procedure - ${error.message}`)
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
                req.logger.error(`Login error - ${err.message}`)
                return res.status(401).send({
                    message: `Error on login`,
                    error: err.message
                })
            }
            if (!user) {
                req.logger.info(`Login error - wrong credentials`)
                return res.status(401).send(`Wrong credentials`)
            }
            req.session.login = true
            req.session.user = user

            req.logger.info(`User logged in < ${req.session.user.email} >`)

            return res.status(200).send(`Welcome ${req.session.user.role} ${req.session.user.first_name}`)
        })(req, res, next)
    } catch (error) {
        req.logger.error(`Error in log-in procedure - ${error.message}`)
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
            req.logger.info(`${username} logged out`)
            res.status(200).send(`Session "${username}" terminated.`)
        } else {
            req.logger.debug('No active session')
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
            req.logger.debug(req.session.user)
            res.status(200).json(req.session.user);
        } else {
            req.logger.debug('No active session')
            return res.status(401).send(`No active session found`)
        }
    } catch (error) {
        res.status(500).send({
            message: "Server internal error",
            error: error.message
        })
    }
}



