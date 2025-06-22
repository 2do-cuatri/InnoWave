import { errorHandler } from "./errorHandler";
import { jest } from "@jest/globals";

test("errorHandler deberia devolver un HTTP500 para errores no reconocidos", () => {
    const err = new Error("Test error");
    const req = {};
    const res = 
    {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        jsonp: jest.fn()
    };
    const next = jest.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Internal Server Error");
});