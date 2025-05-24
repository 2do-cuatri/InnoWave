import express from 'express'; 
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import { errorHandler } from './errors/errorHandler.js';

import productRoutes from "./routes/product.route.js";
import authRoutes from "./routes/auth.route.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); //Permite recibir datos en formato JSON
app.use(cookieParser());

// Es importante que este sea el ultimo middleware en la lista
app.use(errorHandler)

// Rutas
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});

