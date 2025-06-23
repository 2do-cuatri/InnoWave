import { create } from "zustand";
import { API_URL } from "../constants/api";
    
export const useReportStore = create((set, get) => ({
    report: {
        prodQuantity: 0,
        minPrice: 0,
        maxPrice: 0,
        avgPrice: 0,
        totalStock:0,
        avgStock:0
    },
    getReport: async () => {
        const res = await fetch(`${API_URL}/reports`, {
            credentials: 'include',
        });
        const data = await res.json();
        set({ report: data.data });
    },
    createReport: async () => {
        const res = await fetch(`${API_URL}/reports`, {
            method: 'POST',
            credentials: 'include',
        });
        if (res.status !== 201) {
            const errorData = await res.json();
            return { success: false, message: errorData.message };
        } else {
            get().getReport();
            return { success: true, message: "Reporte creado con éxito" };
        }
    },
}));