import { ManagerMongoDB } from "../../../db/mongoDBManager.js";
import { Schema } from "mongoose";
import ManagerProductsMongoDB from "./Product.js";

const url = process.env.URLMONGODB

const cartSchema = new Schema({
    products: {
        type: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'products',
                default: "0"
            },
            quantity: {
                type: Number,
                default: 1
            }
        }],
        default: []
    }
})

class ManagerCartMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "carts", cartSchema)
        this.productModel = ManagerProductsMongoDB.model
    }
}

export default ManagerCartMongoDB