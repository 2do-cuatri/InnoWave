import { CustomError } from "../errors/customError.js";
import { verificarToken } from "../lib/jwt.js";

export async function authenticate(req, res, next) {
    try {
        const token = req.cookies[process.env.JWT_COOKIE_NAME];
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