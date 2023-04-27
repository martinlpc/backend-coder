import passport from "passport";
import { createUser } from "../services/userServices.js";

export const registerUser = async (req, res) => {
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
            message: "Server internal error",
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

            return res.status(200).send(`Welcome ${rq.session.user.sole} ${req.session.user.first_name}`)
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
            req.session.destroy()
            res.status(200).send(`Session terminated.`)
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