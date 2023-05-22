// * Server
import './config/config.js'
import router from './routes/index.routes.js'
import express from 'express'
//import multer from 'multer'
import { engine } from 'express-handlebars'
import { __dirname } from "./path.js";
import * as path from 'path'
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import session from 'express-session';
import initializePassport from './config/passport.js'
import passport from 'passport'
import { Server as SocketServer } from 'socket.io'
import { readMessages, createMessage } from './services/messageServices.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { log, middlewareLogger } from './middlewares/logger.js';

const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(middlewareLogger)
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 60 * 60
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: false
}))

// Passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

// Handlebars as template engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'))

// Port setting
app.set("port", process.env.PORT)

// Router
app.use('/', router)

// Pathfile
app.use('/', express.static(__dirname + '/public'))

// ERROR HANDLER (LAST MIDDLEWARE TO USE)
app.use(errorHandler)

// Multer settings
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'src/public/img')
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}${file.originalname}`)
//     }
// })
// const upload = multer({ storage: storage })

const connectToMongoDB = async () => {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .catch(error => log('error', error.message))
    log('info', `Database connected`)
}

connectToMongoDB()

// Server launch
const server = app.listen(app.get("port"), () => {
    log('info', `Server running on http://localhost:${app.get("port")}`)
})

// Socket server for chat service
export const chatServer = new SocketServer(server)
log('info', `Chat server online`)
chatServer.on("connection", async (socket) => {
    log('info', "Connection to chat detected")

    socket.on("message", async (newMessage) => {
        await createMessage([newMessage])
        const messages = await readMessages()
        log('info', 'New chat message received')
        chatServer.emit("allMessages", messages)
    })

    socket.on("load messages", async () => {
        const messages = await readMessages()
        chatServer.emit("allMessages", messages)
    })
})

