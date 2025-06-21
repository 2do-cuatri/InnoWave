import express from "express";

import { getReport, createReport } from "../controllers/report.controller.js";
import { authenticate } from "../auth/authenticate.js";


const router = express.Router();

//Obtener el reporte más reciente
router.get("/", authenticate, getReport)

//Crear un reporte nuevo
router.post("/", authenticate, createReport)



export default router;