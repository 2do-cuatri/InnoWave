import express from 'express'; 
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import { errorHandler } from './errors/errorHandler.js';
import cors from 'cors'

import productRoutes from "./routes/product.route.js";
import authRoutes from "./routes/auth.route.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json()); //Permite recibir datos en formato JSON
app.use(cookieParser());

// Rutas
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);


// Es importante que este sea el ultimo middleware en la lista
app.use(errorHandler)

// Iniciar servidor
app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});

