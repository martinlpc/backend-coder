
# Natufriend - Ecommerce
 
## Proyecto final para la materia Backend de [CoderHouse](https://www.coderhouse.com), comisión #39685
 
### Alumno: Martín Pacheco

El contenido referido al proyecto final se ubica en la ruta [/entregas/proyecto_final](https://github.com/martinlpc/backend-coder/tree/master/entregas/proyecto_final)
  
## Brief

Servicio backend para un futuro sitio e-commerce de productos naturales para mascotas.

### API endpoints:
- /api/products
	- GET '/': Devuelve productos de la DB con paginación. Query params = {limit, page, category, sort, stock}
	- GET '/`product_id`': Busca un producto por su product_id
	- POST '/': Agrega producto/s a la DB via body en formato json
	- PUT '/`product_id`': Modifica un producto de la DB según product_id y la info enviada por body

- /api/carts
	- GET '/`cart_id`': Devuelve un carrito con toda la información de sus productos
	- POST '/': Crea un carrito vacío
	- POST '/`cart_id`/product/`product_id`': Agrega una cierta cantidad de unidades (body) de un producto (`product_id`) al carrito indicado vía `cart_id`
	- PUT '/`cart_id`': Reemplaza el contenido del carrito con la información enviada por body
	- PUT '/`cart_id`/product/`product_id`': Cambia la cantidad de unidades de un producto vía body
	- DELETE '/`cart_id`/product/`product_id`': Elimina la totalidad de un producto
	- DELETE '/`cart_id`': Vacía un carrito

  
## Dependencias utilizadas:

- [express.js](https://expressjs.com/es/)
`npm i express --save`
- [socket.io](https://socket.io/)
`npm i socket.io`
- [dotenv](https://www.npmjs.com/package/dotenv/)
`npm i dotenv`
- [express-handlebars](https://handlebarsjs.com/)
`npm i express-handlebars`
- [mongoose](https://mongoosejs.com/)
`npm i mongoose`
- [mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2)
`npm i mongoose-paginate-v2`
- [multer](https://www.npmjs.com/package/multer)
`npm i multer`
- [nodemon](https://nodemon.io/)
`npm i nodemon -D`





