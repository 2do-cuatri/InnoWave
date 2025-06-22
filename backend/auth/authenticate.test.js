import { authenticate } from "./authenticate";
import { tokenizar } from "../lib/jwt";
import { expect, jest } from "@jest/globals";
import { CustomError } from "../errors/customError";

describe("middleware authenticate", () => {
    let res = {};
    

    test("deberia llamar a next sin errores si el token es valido", async () => {
        token = tokenizar({
            _id: "12345",
            email: "prueba@prueba.com"
        });

        req = {
            cookies: {
                [process.env.JWT_COOKIE_NAME]: token,
            },
        };
        next = jest.fn();
        await authenticate(req, res, next);
        expect(next).toHaveBeenCalledWith();
        expect(req.user).toBeDefined();
        expect(req.user._id).toEqual("12345");
        expect(req.user.email).toEqual("prueba@prueba.com");
    })

    test("deberia llamar a next con un error si no hay token", async () => {
        req = {
            cookies: {},
        };
        next = jest.fn();
        await authenticate(req, res, next);
        expect(next).toHaveBeenCalledWith(new CustomError("No autorizado: no se encontro ningun token", 401));
    });
});
