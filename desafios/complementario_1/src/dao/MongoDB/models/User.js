import { ManagerMongoDB } from "../../../db/mongoDBManager.js";
import { Schema } from "mongoose";

const url = process.env.URLMONGODB

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
    date: {
        type: Date,
        default: Date.now
    }
});

// const userModel = model('Users', userSchema);
// export default userModel
class ManagerUserMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "users", userSchema)
    }
}

export default ManagerUserMongoDB