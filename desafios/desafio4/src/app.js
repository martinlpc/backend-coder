import express from "express";
import ProductManager from "./controllers/ProductManager.js";
import routerProduct from "./routes/products.routes.js";
import routerCart from "./routes/carts.routes.js";
import routerSocket from "./routes/socket.routes.js";
import { Server } from 'socket.io'
import { engine } from 'express-handlebars';
import { __dirname } from "./path.js";
import * as path from 'path'

const productManager = new ProductManager('src/models/products.json');
const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Server on http://localhost:${PORT}`)
})

//ServerIO
const io = new Server(server)
io.on("connection", async (socket) => {
    console.log("Cliente conectado")

    socket.on("addProduct", async info => {
        socket.emit("msgProductAdded", await productManager.addProduct(info.title, info.description, info.code, info.price, true, info.stock, info.category, info.thumbnails))
        socket.emit("getProducts", await productManager.getProducts())
    })

    socket.on("deleteProduct", async id => {
        socket.emit("msgProductDeleted", await productManager.deleteProduct(parseInt(id)))
        socket.emit("getProducts", await productManager.getProducts())
    })

    socket.emit("getProducts", await productManager.getProducts());
})

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'))

// Routes
app.use('/', express.static(__dirname + '/public'))
app.use('/', routerSocket)
app.use('/api/products', routerProduct)
app.use('/api/carts', routerCart)
app.use('/realtimeproducts', routerSocket)