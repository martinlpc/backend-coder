import local from "passport-local";
import passport from "passport";
import GitHubStrategy from "passport-github2";
import jwt from "passport-jwt";
import { userManager } from "../controllers/user.controller.js";
import { createHash, validatePassword } from "../utils/bcrypt.js";
import mongoose from "mongoose";
import { authToken, generateToken } from "../utils/jwt.js";

// Passport se va a manejar como si fuera un middleware
const LocalStrategy = local.Strategy;

const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initializePassport = () => {
    const cookieExtractor = (req) => {
        // If cookies exists, verify there is a jwt cookie
        const token = req && req.cookies ? req.cookies("jwtCookies") : null;
        return token;
    };

    passport.use(
        "jwt",
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
                secretOrKey: process.env.COOKIE_SECRET,
            },
            async (jwt_payload, done) => {
                try {
                    return done(null, jwt_payload);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use(
        "register",
        new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {
            const { first_name, last_name, email } = req.body;

            try {
                const user = await userManager.getUserByEmail(username); // username <=> email
                if (user) {
                    return done(null, false); // null: no errores - false: no se creo el user
                } else {
                    const hashPassword = createHash(password);

                    const createdUser = await userManager.addElements({
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        password: hashPassword,
                    });

                    const token = generateToken(createdUser);
                    console.log(`PASSPORT> token: ${token}`);
                    return done(null, createdUser);
                }
            } catch (error) {
                return done(error);
            }
        })
    );

    passport.use(
        "login",
        new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
            try {
                // ! CHEQUEAR ESTA SECCION
                // if (username === "adminCoder@coder.com" && password === "adminCod3r123") {
                //     const user = {
                //         _id: new mongoose.Types.ObjectId(),
                //         first_name: "AdminCoder",
                //         last_name: " ",
                //         email: "adminCoder@coder.com",
                //         password: " ", // Default password required by Challenge #5
                //         role: "admin",
                //     };
                //     return done(null, user);
                // }

                const user = await userManager.getUserByEmail(username);
                console.log("PASSPORT> user logging-in: ", user.email);
                if (!user) {
                    //User not found
                    console.log("PASSPORT> User not found");
                    return done(null, false);
                }
                if (validatePassword(password, user.password)) {
                    const token = generateToken(user);
                    console.log("PASSPORT> User found");
                    return done(null, user);
                }
                // Wrong password
                console.log("PASSPORT> Wrong credentials");
                return done(null, false);
            } catch (error) {
                return done(error);
            }
        })
    );

    passport.use(
        "github",
        new GitHubStrategy(
            {
                clientID: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                callbackURL: "http://localhost:8080/authSession/githubSession",
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    console.log(profile);
                    const user = await userManager.getUserByEmail(profile._json.email);

                    if (user) {
                        console.log("encontró user existente en github");
                        done(null, user);
                    } else {
                        console.log("nuevo user desde github");
                        //const hashPassword = createHash('')
                        const createdUser = await userManager.addElements({
                            first_name: profile._json.name,
                            last_name: " ",
                            email: profile._json.email,
                            password: " ", // Default password required by Challenge #5
                            role: "user",
                        });

                        done(null, createdUser);
                    }
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    // Iniciar sesión
    passport.serializeUser((user, done) => {
        console.log("user:", user);
        if (!user) {
            done(null, null);
        }
        if (Array.isArray(user)) {
            done(null, user[0]._id);
        } else {
            done(null, user._id);
        }
    });

    // Eliminar sesión
    passport.deserializeUser(async (id, done) => {
        const user = await userManager.getElementById(id);
        done(null, user);
    });
};

export default initializePassport;
