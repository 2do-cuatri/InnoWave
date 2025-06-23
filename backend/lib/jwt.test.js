import { tokenizar, verificarToken } from './jwt.js';

test("tokenizar deberia devolver un token valido", () => {
    const user = {
        id: 1,
        email: "test@test.com",
        pass: "hashedpassword"
    };
    const token = tokenizar(user);
    expect(token).toBeDefined();
    expect(typeof token).toBe("string");
    const decoded = verificarToken(token);
    expect(decoded).toBeDefined();
    expect(decoded.id).toBe(user.id);
    expect(decoded.email).toBe(user.email);
});