import mongoose,{ Schema } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const userModel = mongoose.model('user', userSchema)
userModel.createIndexes();

export {userModel}
