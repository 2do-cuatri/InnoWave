# 🛠️ Proyecto InnoWave


> ⚠️ **IMPORTANTE:**  
> Antes de correr el proyecto, ejecutá:
> 
> ```bash
> npm install
> ```
> 
> para instalar las dependencias necesarias (los `node_modules` están en `.gitignore` y no vienen incluidos).
> 
> Luego, para levantar el servidor:
> 
> ```bash
> npm run dev
> ```

---

## 🚀 Endpoints disponibles

Esta API permite administrar productos mediante operaciones CRUD.

---

### 📥 `GET /api/products`
- **Descripción:** Devuelve todos los productos almacenados.
- **Respuesta:** JSON con una lista de productos.

---

### ➕ `POST /api/products`
- **Descripción:** Crea un nuevo producto.
- **Body esperado (JSON):**
  ```json
  {
    "name": "Nombre del producto",
    "price": 100,
    "image": "url-de-la-imagen"
  }
  ```
- **Validación:** Todos los campos son obligatorios.
- **Respuesta:** El producto creado.

---

### 🔁 `PUT /api/products/:id`
- **Descripción:** Actualiza un producto existente.
- **Parámetro:** `id` del producto.
- **Body esperado:** JSON con los campos a actualizar.
- **Validación:** El `id` debe ser válido.
- **Respuesta:** El producto actualizado.

---

### ❌ `DELETE /api/products/:id`
- **Descripción:** Elimina un producto por su `id`.
- **Respuesta:** Confirmación de eliminación.

---

## 📡 Puerto por defecto

El servidor corre en:

```
http://localhost:5000
```

---

## 🔌 Conexión a la base de datos

Asegurate de tener configurada correctamente tu base de datos MongoDB en el archivo donde se define la función `connectDB()`.

---

## 🧪 Probar la API

Podés usar herramientas como **Postman** o **Insomnia** para probar los endpoints.

Ejemplo de `POST`:

```
POST http://localhost:5000/api/products
Body (JSON):
{
  "name": "Zapatillas",
  "price": 12000,
  "image": "https://ejemplo.com/img.jpg"
}
```

---
