import express from "express";

import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";


const router = express.Router();

//Obtener todos los productos
router.get("/", getProducts)

//Crear un producto
router.post("/", createProduct)

//Actualizar un producto
router.put("/:id", updateProduct)

//Eliminar un producto
router.delete("/:id", deleteProduct)

export default router;