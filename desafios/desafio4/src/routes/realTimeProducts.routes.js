import { Router } from 'express'
import ProductManager from '../controllers/ProductManager.js';
import { engine } from 'express-handlebars';
import * as path from 'path'

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views')); //__dirname + '/views'

const routerRealTimeProducts = Router()
const manager = new ProductManager('src/models/products.json')

routerRealTimeProducts.get('/', async (req, res) => {
    const products = await manager.getProducts();
    let { limit } = req.query;
    let data;
    if (!limit) {
        data = products;
    } else {
        data = products.slice(0, parseInt(limit));
    }
    res.send(data);

    /*
    const user = {
        nombre: "Pablo",
        email: "p@p.com",
        rol: "Tutor"
    }

    const cursos = [
        { numero: 123, dia: "LyM", horario: "Noche" },
        { numero: 456, dia: "MyJ", horario: "Mañana" },
        { numero: 789, dia: "JyV", horario: "Mediodia" },
    ]

    res.render("home", { // renderizar el siguiente contenido
        titulo: "Ecommerce backend",
        mensaje: "Pepe",
        usuario: user,
        isTutor: user.rol === "Tutor",
        cursos
    })
    */
})

export default routerRealTimeProducts