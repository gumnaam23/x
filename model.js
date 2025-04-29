import mongoose from "mongoose";

const msgSchema = new mongoose.Schema({
    msg:{
        type: String,
        required: true
    }
})

export const Msg = mongoose.model("msg", msgSchema)