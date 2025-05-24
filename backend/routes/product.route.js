import express from "express";

import { createProduct, deleteProduct, getProducts, updateProduct, updateProductStock } from "../controllers/product.controller.js";
import { authenticate } from "../auth/authenticate.js";


const router = express.Router();

//Obtener todos los productos
router.get("/", authenticate, getProducts)

//Crear un producto
router.post("/", authenticate, createProduct)

//Actualizar un producto
router.put("/:id", authenticate, updateProduct)

//Actualizar el stock de un producto
router.patch("/:id", authenticate, updateProductStock)

//Eliminar un producto
router.delete("/:id", authenticate, deleteProduct)

export default router;