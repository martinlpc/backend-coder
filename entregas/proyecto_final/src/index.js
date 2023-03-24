// * Server
import 'dotenv/config'
import router from './routes/index.routes.js'
import express from 'express'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
//import { getManagerMessages } from './dao/daoManager.js'
import { __dirname } from "./path.js";
import * as path from 'path'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import session from 'express-session';

const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.URLMONGODB,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 90
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

// Handlebars as template engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'))

// Port setting
app.set("port", process.env.PORT || 8080)

// Router
app.use('/', router)

// Pathfile
app.use('/', express.static(__dirname + '/public'))

// Server launch
const server = app.listen(app.get("port"), () => {
    console.log(`Server running on http://localhost:${app.get("port")}`)
})

// ServerIO to manage socket messages (chat)
const io = new Server(server)

// const data = await getManagerMessages();
// export const managerMessages = new data();

io.on("connection", async (socket) => {
    console.log("Connection detected")

    socket.on("message", async newMessage => {
        await managerMessages.addElements([newMessage])
        const messages = await managerMessages.getElements()
        console.log(messages)
        io.emit("allMessages", messages)
    })

    socket.on("load messages", async () => {
        const messages = await managerMessages.getElements()
        console.log(messages)
        io.emit("allMessages", messages)
    })
})