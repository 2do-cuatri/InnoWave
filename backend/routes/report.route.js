import express from "express";

import { getReport, createReport } from "../controllers/report.controller.js";
import { authenticate } from "../auth/authenticate.js";


const router = express.Router();

//Obtener todos los productos
router.get("/", authenticate, getReport)

//Crear un producto
router.post("/", authenticate, createReport)



export default router;