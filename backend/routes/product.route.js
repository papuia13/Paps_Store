import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);
//Note: the difference between put and patch is that put is used to update the whole object and patch is used to update a part of the object


export default router;