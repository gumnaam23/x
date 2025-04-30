import express from "express";
import mongoose from "mongoose";
import { Msg } from "./model.js";
import cors from 'cors'

const app = express();
const PORT = 8000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use(cors({
  origin: "http://localhost:5173/",  // React app ka origin
  credentials: true                 // important for cookies/auth
}));

app.get("/", async(req, res)=>{
    try {
        const msg = await Msg.find({})
        res.send("hello")
        res.status(200).json({msg})
    } catch (error) {
        throw new error
    }
})

app.post("/msg", async(req, res)=>{
    const {msg} = req.body;
    if(!msg) return res.status(400).json({msg: "msg is required"})

    try {
        await Msg.create({msg})
        res.status(201).json({msg: "msg sent successfully"})
    } catch (error) {
        console.error(error)
    }


})

mongoose.connect("mongodb+srv://aqibdev23:oGXUhNOTAVp02G27@cluster0.swqejm2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
                 {
                   dbname: "user"
                 })
.then(()=>console.log("mongodb connected"))
.catch((err)=> console.log("database connection err", err))

app.listen(PORT, ()=>{
    console.log(`http://localhost:${8000}`);
})
