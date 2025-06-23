import express from 'express'; 
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import { errorHandler } from './errors/errorHandler.js';
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';


import productRoutes from "./routes/product.route.js";
import authRoutes from "./routes/auth.route.js";
import reportRoutes from "./routes/report.route.js";


dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json()); //Permite recibir datos en formato JSON
app.use(cookieParser());

// Servir estaticos del FE
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Rutas
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);


// Es importante que este sea el ultimo middleware en la lista
app.use(errorHandler)

// Todas las demas rutas no indicadas en la API seran dirigidas al FE
app.get('/*path', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});

