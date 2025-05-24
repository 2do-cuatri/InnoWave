import { CustomError } from "./customError.js";

export async function errorHandler(err, req, res, next) {
    console.error(err)
    if (err instanceof CustomError) {
        res.status(err.code).jsonp(err);
    } else {
        res.status(500).send("Internal Server Error")
    }
}