import { ManagerMongoDB } from "../../../db/mongoDBManager.js";
import mongoose, { Schema } from "mongoose";
import ManagerProductsMongoDB from "./Product.js";

const url = process.env.URLMONGODB

const cartSchema = new mongoose.Schema({
    products: {
        type: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'products',
                required: true
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

    async changeQuantity(cartID, productID, newQuantity) {
        await this._setConnection()

        // Get cart
        const cart = await this.model.findById(cartID)

        // Check product existance and get its index
        const productIndex = cart.products.findIndex(product => product.productId.equals(productID))
        if (productIndex === -1) throw new Error("Product not found in the specified cart")

        // Update/change product quantity
        cart.products[productIndex].quantity = newQuantity

        // Save updated doc
        await cart.save()

        return cart.products[productIndex]
    }

    async removeProduct(cartID, productID) {
        await this._setConnection()

        // Get cart
        const cart = await this.model.findById(cartID)

        // Check product existance and get its index
        const productIndex = cart.products.findIndex(product => product.productId.equals(productID))
        if (productIndex === -1) throw new Error("Product not found in the specified cart")

        // Remove specified product
        cart.products.splice(productIndex, 1)

        // Save updated doc
        await cart.save()

        return cart.products
    }

    async addProduct(cartID, productID, quantity) {
        this._setConnection()
        try {
            const cart = await this.model.findById(cartID)
            cart.products.push({
                productId: productID,
                quantity: quantity
            })
            await cart.save()
            return cart.products
        } catch (error) {
            return error
        }
    }

    async replaceAllProducts(cartID, productsToAdd) {
        this._setConnection()
        try {
            const cart = await this.model.findById(cartID)
            cart.products = productsToAdd
            await cart.save()
            return cart.products
        } catch (error) {
            return error
        }
    }

    async emptyCart(cartID) {
        this._setConnection()
        try {
            const cart = await this.model.findById(cartID)
            cart.products = []
            await cart.save()
            return cart
        } catch (error) {
            return error
        }
    }

}

export default ManagerCartMongoDB