// * Server
import 'dotenv/config'
import routerProduct from "./routes/products.routes.js";
import routerCart from "./routes/carts.routes.js";
import routerSocket from "./routes/socket.routes.js";
import express from 'express'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import { getManagerMsg } from './dao/daoManager.js'
import { __dirname } from "./path.js";
import * as path from 'path'

const app = express()
const managerMsg = getManagerMsg()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'))

// Port setting
app.set("port", process.env.PORT || 8080)

// Server launch
const server = app.listen(app.get("port"), () => {
    console.log(`Server running on http://localhost:${app.get("port")}`)
})

// ServerIO to manage socket messages
const io = new Server(server)
io.on("connection", async (socket) => {

    socket.on("message", async info => {
        await managerMsg.getElements([info])
        const messages = await managerMsg.getElements()
        console.log(messages)
        socket.emit("allMessages", messages)
    })
})

// Routes
app.use('/', express.static(__dirname + '/public'))
app.use('/', routerSocket)
app.use('/api/products', routerProduct)
app.use('/api/carts', routerCart)
app.use('/realtimeproducts', routerSocket)