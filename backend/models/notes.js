import mongoose, { Schema } from "mongoose";

const notesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tag: { type: String, default: "General" },
    date: { type: Date, default: Date.now },
});

const notesModel = mongoose.model('notes', notesSchema)
export {notesModel}