import express from "express";
import routerProduct from "./routes/products.routes.js";
import routerCart from "./routes/carts.routes.js";
import { __dirname } from './path'
import multer from 'multer'

//const upload = multer({ dest: 'src/public/img' })  // config basica

// config avanzada
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
})
const upload = multer({ storage: storage })

const app = express();
const PORT = 8080;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/static', express.static(__dirname + '/public'))
app.use('/api/products', routerProduct)
app.use('/api/carts', router)

app.get('/', (req, res) => {
    res.send("Backend - Primera entrega - Comisión 39685 - Martín Pacheco");
});

app.post('/upload', upload.single('product'), (req, res) => {
    //console.log(req.body)
    console.log(req.file) // las imgs se consultan con req.file
    res.send("Image uploaded")
})

app.listen(PORT, () => {
    console.log(`Server created on localhost:${PORT}`);
});
