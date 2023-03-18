import { ManagerMongoDB } from "../../../db/mongoDBManager.js";
import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const url = process.env.URLMONGODB

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnails: {
        type: Array,
        default: []
    }
})

productSchema.plugin(mongoosePaginate)

class ManagerProductsMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "products", productSchema)
    }
    // * Cuando se puedan hacer los atributos y metodos protected
    // * traer acá los métodos específicos para model product
}

// Exporting an instance of the class ready to use
export default ManagerProductsMongoDB