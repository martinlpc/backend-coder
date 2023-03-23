import { ManagerMongoDB } from "../../../db/mongoDBManager.js";
import { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

class ManagerUserMongoDB extends ManagerMongoDB {
    constructor() {
        super(process.env.URLMONGODB, "users", userSchema)
    }

    async getUserByEmail(email) {
        super._setConnection()
        try {
            return await this.model.findOne({ email: email })
        } catch (error) {
            return error
        }
    }
}

export default ManagerUserMongoDB