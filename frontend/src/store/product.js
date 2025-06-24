import {create} from "zustand";
import { API_URL } from "../constants/api";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({products}),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.image || !newProduct.stock || !newProduct.price || !newProduct.minStock) {
            return {success:false, message:"Por favor complete todos los campos"};
        }
        const res = await fetch(`${API_URL}/products`, {
            credentials: 'include',
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newProduct)
        });
        const data = await res.json();
        set((state) => ({products:[...state.products,data.data]}));
        return {success:true, message: "Producto creado con éxito"}
},
    fetchProducts: async () => {
        const res = await fetch(`${API_URL}/products`, {
            credentials: 'include'
        });
        const data = await res.json();
        set({ products: data.data})
    },
    deleteProduct: async (pid) => {
        const res = await fetch(`${API_URL}/products/${pid}`, {
            credentials: 'include',
            method: "DELETE",
        });
        const data = await res.json();
        if(!data.success) return { success: false, message: data.message};
        set(state =>({products: state.products.filter(product => product._id !== pid)}));
        return {success: true, message: data.message};
    },
    updateProduct: async (pid,updatedProduct) => {
        const res = await fetch(`${API_URL}/products/${pid}`,{
            credentials: 'include',
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if (!data.success) return {
            success: false, message: data.message
        };
        set ((state) => ({
            products: state.products.map((product) => (product._id === pid ? data.data : product)),
        }));
        return { success: true, message: data.message}
    },
}));

