import express from 'express'; 
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';
import { mongo, Mongoose, mongoose } from 'mongoose';

dotenv.config();

const app = express();

app.use(express.json()); //Permite recibir datos en formato JSON



//Obtener todos los productos
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({success: true, data: products});
    } catch (error) {
        console.log(`Error obteniendo los productos: ${error.message}`);	
        return res.status(500).json({success: false, message: error.message });
    }
})

//Crear un producto
app.post("/api/products", async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: "Todos los campos son obligatorios" });
    }

    const newProduct = await Product(product);
    
    try {
        await newProduct.save();
        return res.status(201).json({success: true, data: newProduct});
    } catch (error) {
        console.log(`Error creando el producto: ${error.message}`);	
        return res.status(500).json({success: false, message: error.message });
    }

})

//Actualizar un producto
app.put("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = req.body;

 
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Producto no encontrado"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        return res.status(200).json({success: true, data: updatedProduct});
    } catch (error) {
        console.log(`Error actualizando el producto: ${error.message}`);	
        return res.status(500).json({success: false, message: error.message });
    }
})

//Eliminar un producto
app.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        return res.status(200).json({success: true, message: "Producto eliminado"});
    } catch (error) {
        console.log(`Error eliminando el producto: ${error.message}`);	
        return res.status(500).json({success: false, message: error.message });
    }
})

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000 che")
});

