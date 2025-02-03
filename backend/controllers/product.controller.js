import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req,res) => {
    try{
        const products = await Product.find({});
        res.json({sucess:true, data:products});
    }catch(error){
        console.error("Error in fetching the products : ", error.Message);
        res.status(500).json({sucess : False, message: "Server error"}); 
    }
}

export const createProduct = async (req,res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image){
        return res.status(400).json({sucess:false, Message: "Please provide all the fields"});
    }
    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({sucess:true, data:newProduct});
    }catch(error){
        console.error("Error in creating the product : ", error.Message);
        res.status(500).json({sucess : False, message: "Server error"}); 
    }
}

export const deleteProduct = async (req,res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({sucess:false, message: "Invalid product id"});
    }
    try{
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({sucess:false, message: "Product not found"});
        }else{
            res.status(200).json({sucess:true, message: `Product removed ${product}`});
        }
    }catch(error){
        console.error("Error in deleting the product : ", error.Message);
        res.status(500).json({sucess : False, message: "Server error"});
    }
}

export const updateProduct = async (req,res) => {
    const {id} = req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({sucess:false, message: "Invalid product id"});
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({sucess:true, data:updatedProduct});
    }catch(error){
        console.error("Error in updating the product : ", error.message);
        res.status(500).json({sucess : false, message: "Server error"});
    }
}

