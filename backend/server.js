//const express = require('express'); (old methode of importing express)
//you can re-create path of running in the terminal ( node .\backend\server.js = node run dev )... in the script section of package.json put (dev: "node backend/server.js")
import express from "express"; //in order to make this moder method of importing you need to create a (type:"module") at package.json
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT||5000;
const __dirname = path.resolve();
app.use(express.json());//middleWare this let you pass a json file thorugh the req.body

app.use("/api/products", productRoutes); //this is the route for the product

app.use(express.static(path.join(__dirname,"/frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
    })

app.listen(PORT,() =>{
    connectDB();
    console.log('server started at  http://localhost:' + PORT);
});