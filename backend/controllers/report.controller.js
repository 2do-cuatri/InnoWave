import mongoose from "mongoose";
import Product from "../models/product.model.js";
import Report from "../models/report.model.js";

// 1. Función de lógica de negocio pura para crear el reporte
// Esta función NO recibe req ni res. Simplemente crea y guarda el reporte.
const _createAndSaveNewReport = async () => {
    try {
        const aggregationResult = await Product.aggregate([
            {
                $group: {
                    _id: null, // Group all documents into a single group
                    minPrice: { $min: "$price" },
                    maxPrice: { $max: "$price" },
                    avgPrice: { $avg: "$price" },
                    prodQuantity: { $sum: 1 } // Sum 1 for each document to get total count
                }
            },
            {
                $project: {
                    _id: 0, // Exclude the _id field from the final output
                    prodQuantity: 1,
                    minPrice: 1,
                    maxPrice: 1,
                    avgPrice: 1
                }
            }
        ]);

        let reportData = {
            prodQuantity: 0,
            minPrice: 0,
            maxPrice: 0,
            avgPrice: 0
        };

        // Check if any results were returned from the aggregation
        if (aggregationResult.length > 0) {
            reportData = aggregationResult[0];
        }

        const newReport = new Report(reportData);
        await newReport.save();
        console.log("Reporte inicial creado con éxito.");
        return newReport;
    } catch (error) {
        console.error(`Error interno creando el reporte: ${error.message}`);
        throw new Error(`Failed to create report: ${error.message}`);
    }
};


// 2. Controlador para CREAR un reporte (tu createReport original, modificado)
export const createReport = async (req, res) => {
    try {
        const newReport = await _createAndSaveNewReport(); // Llama a la función de lógica
        return res.status(201).json({ success: true, data: newReport });
    } catch (error) {
        console.error(`Error creando el reporte desde el endpoint: ${error.message}`);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 3. Controlador para OBTENER el reporte (tu getReport original, modificado)
export const getReport = async (req, res) => {
    try {
        const reportCount = await Report.countDocuments({});
        if (reportCount === 0) { // Verifica si no hay ningún reporte
            await _createAndSaveNewReport(); // Llama a la función de lógica para crear el primero
        }

        const report = await Report.findOne().sort({ createdAt: -1 }).exec();

        // Si por alguna razón después de intentar crear, sigue sin haber reporte (ej. error en creación)
        if (!report) {
             return res.status(404).json({ success: false, message: 'No reports found even after attempting creation.' });
        }


        return res.status(200).json({ success: true, data: report });
    } catch (error) {
        console.error(`Error obteniendo los reportes: ${error.message}`);
        return res.status(500).json({ success: false, message: error.message });
    }
};