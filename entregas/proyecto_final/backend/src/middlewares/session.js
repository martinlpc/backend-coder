export const isSessionActive = async (req, res, next) => {
    try {
        if (req.session.login) {
            return next()
        }
        return res.status(401).send('No active session')

    } catch (error) {
        res.status(500).send({
            message: "Server internal error",
            error: error.message
        })
    }
}

export const checkRole = (role) => {
    return (req, res, next) => {
        if (req.session.login) {
            if (req.session.user.role !== role) {
                return res.status(401).send(`Action not allowed to ${req.session.user.role}`)
            }
            next()

        } else {
            return res.status(401).send(`No active session found`)
        }
    }
}