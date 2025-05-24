import { CustomError } from "../errors/customError.js";
import { verificarToken } from "../lib/jwt.js";

export async function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader.toLowerCase().startsWith('bearer ')) throw new CustomError("El formato del JWT es incorrecto", 400)
        const token = authHeader.split(' ')[1]
        if (!token) throw new CustomError("No autorizado: no se encontro ningun token", 401);
        const decoded = verificarToken(token)
        if (!decoded || !decoded._id) throw new CustomError("No autorizado: no se pudo validar el token", 401);
        // Enriquecer el objeto del request con los datos del usuario
        req.user = decoded;
        next();
    } catch(err) {
        next(err);
    }
}