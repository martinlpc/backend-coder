import { userManager } from "./user.controller.js";
import { validatePassword } from "../utils/bcrypt.js";
import passport from "passport";

export const getSession = (req, res) => {
    try {
        if (req.session.login) {
            const sessionData = {
                name: req.session.name,
                role: req.session.role,
            };
            return sessionData;
        } else {
            res.redirect("/login", 500, { message: "Logueate para continuar" });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const tryLogin = async (req, res) => {
    passport.authenticate('login', (error, user) => {
        try {
            if (error) {
                console.log(`TRYLOGIN> error`)
                req.session.message = "An error ocurred, try again later"
                res.redirect('/login')
            }
            if (!user) {
                console.log(`TRYLOGIN> incorrect credentials`)
                req.session.message = "Username or password incorrect"
                res.redirect('/login')
            }

            console.log(`TRYLOGIN> authenticated`)
            req.session.login = true
            req.session.name = user.first_name
            req.session.role = user.role

            res.redirect('/products')
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    })(req, res)
}

// export const checkLogin = async (req, res) => {
//     try {
//         // Get login info from form
//         const { email, password } = req.body;

//         if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
//             req.session.login = true;
//             req.session.user.first_name = "Admin Coder";
//             req.session.user.role = "admin";
//             console.log(`sessionctrler> ${email} logged in`);
//             res.redirect("/products");
//         } else {
//             const user = await userManager.getUserByEmail(email);

//             if (user && validatePassword(password, user.password)) {
//                 console.log("sessionctrler> pass valid");
//                 req.session.login = true;
//                 //req.session.user.first_name = user.first_name
//                 // req.session.user.role = user.role
//                 console.log(`sessionctrler> ${email} logged in as ${user.role}`);
//                 res.redirect("/products");
//             } else {
//                 res.status(401).json({
//                     message: "User or password incorrect",
//                 });
//             }
//         }
//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//         });
//     }
// };

export const destroySession = (req, res) => {
    try {
        if (req.session.login) {
            req.session.destroy();
            console.log(`SESSIONCTRL> Session closed`);
            res.status(200).redirect("/");
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const requireAuth = (req, res, next) => {
    console.log(`SESSIONCTRL> Is session active?: ${req.session.login}`);
    req.session.login ? next() : res.redirect("/login");
};
