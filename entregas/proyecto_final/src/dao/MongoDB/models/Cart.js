import { ManagerMongoDB } from "../../../db/mongoDBManager.js";
import { Schema } from "mongoose";

const url = process.env.URLMONGODB

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]

})

class ManagerCartMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "messages", cartSchema)
    }
}

export default ManagerCartMongoDB