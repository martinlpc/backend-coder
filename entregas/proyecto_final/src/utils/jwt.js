import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    const token = jwt.sign({ user }, process.env.SIGNED_COOKIE, { expiresIn: '24h' })
    return token
}

export const authToken = (req, res, next) => {
    // Check header
    const authHeader = req.headers.authorization

    // Token not found or expired
    if (!authHeader) {
        return res.status(401).send({ error: "User not authenticated" })
    } else {
        // Token  found
        const token = authHeader.split(' ')[1] // Remove string "bearer" from token

        // Validate token
        jwt.sign(token, process.env.SIGNED_COOKIE, (error, credentials) => {
            if (error) {
                return res.status(403).send({ error: "Unauthorized user" })
            } else {
                req.user = credentials.user
                next()
            }
        })
    }
}