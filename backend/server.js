import express from 'express';
import dotenv from "dotenv";
import { connectionDb } from './config/db.js';
import productRoutes from "./routes/product.route.js"
import path from "path"

dotenv.config();

const app = express();
app.use(express.json());// Allows us to accept JSON data in the req.body
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();
app.use("/api/products",productRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
    })
}

app.listen(PORT,()=>{
    connectionDb();
    console.log("Server started at http://localhost:"+PORT);
})

// VYPtfG2lJ7bkq0Ta