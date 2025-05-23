import express from "express";

import { createProduct, deleteProduct, getProducts, updateProduct, updateProductStock } from "../controllers/product.controller.js";


const router = express.Router();

//Obtener todos los productos
router.get("/", getProducts)

//Crear un producto
router.post("/", createProduct)

//Actualizar un producto
router.put("/:id", updateProduct)

//Actualizar el stock de un producto
router.patch("/:id", updateProductStock)

//Eliminar un producto
router.delete("/:id", deleteProduct)

export default router;