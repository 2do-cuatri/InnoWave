FROM node:20 AS build

WORKDIR /app

# Instalar librerias del backend
COPY package.json package-lock.json* ./
RUN npm install

# Copiar el código del backend
COPY backend/ .

# Instalar librerias del frontend y crear el build
COPY frontend/ /frontend
WORKDIR /frontend
RUN npm install && npm run build

# Copiar el build del frontend al directorio público del backend
WORKDIR /app
RUN mkdir -p public && cp -r /frontend/dist/* public/

# Exponer el puerto 5000 (utilizado por el backend)
EXPOSE 5000

CMD ["node", "server.js"]