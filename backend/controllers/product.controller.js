import mongoose from "mongoose";
import Product from "../models/product.model.js";


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({success: true, data: products});
    } catch (error) {
        console.log(`Error obteniendo los productos: ${error.message}`);	
        return res.status(500).json({success: false, message: error.message });
    }
}

export const createProduct = async (req, res) => {
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

}

export const updateProduct = async (req, res) => {
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
}

export const updateProductStock = async (req, res) => {
    const { id } = req.params;
    let { stock } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Producto no encontrado" });
    }

    // Intentar castear stock a número
    stock = Number(stock);

    if (isNaN(stock) || stock < 0) {
        return res.status(400).json({ success: false, message: "El stock debe ser un número mayor o igual a 0" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, { stock }, { new: true });
        return res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.log(`Error actualizando el stock: ${error.message}`);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        return res.status(200).json({success: true, message: "Producto eliminado"});
    } catch (error) {
        console.log(`Error eliminando el producto: ${error.message}`);	
        return res.status(500).json({success: false, message: error.message });
    }
}