import { CustomError } from "../errors/customError.js";
import { encriptarContrasena, compararHash } from "../lib/encriptacion.js";
import User from "../models/user.model.js";
import { tokenizar } from "../lib/jwt.js";

export const signUp = async (req, res, next) => {
    try {

        const { email, password, name } = req.body;
        if (!email) throw new CustomError("Debes incluir un email", 406);
        if (!password) throw new CustomError("Debes incluir una contraseña", 406);
        
        const encriptada = await encriptarContrasena(password)
        if (!encriptada) throw new CustomError("Error al encriptar contrasena");
        
        const user = new User({
            email,
            password: encriptada,
            name: name || undefined
        })
        const created = await user.save()
        
        res.status(201).jsonp({ inserted: created._id })
    } catch(err) {
        next(err)
    }
}

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email) throw new CustomError("Debes incluir un email", 406);
        if (!password) throw new CustomError("Debes incluir una contraseña", 406);
        
        const user = await User.findOne({ email: req.body.email }).lean()
        if (!user) throw new CustomError("Usuario inexistente", 404);
        
        const valid = await compararHash(password, user.password)
        if (!valid) throw new CustomError("Contrasena incorrecta", 401)
            
        const token = tokenizar(user)
        if (!token) throw new CustomError("Error al crear JWT");
        
        res.cookie(process.env.JWT_COOKIE_NAME, token, {
            httpOnly: true,
            sameSite: true
        })
        res.status(200).jsonp(user);
    }catch(err) {
        next(err)
    }
}

export const signOut = async (req, res, next) => {
    try {
        res.clearCookie(process.env.JWT_COOKIE_NAME, {
            httpOnly: true,
            sameSite: true
        })
        res.sendStatus(200)
    } catch(err) {
        next(err)
    }
}