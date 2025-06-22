import { encriptarContrasena, compararHash } from "./encriptacion";

test("encriptar contrasena deberia devolver un hash", async () => {
    const contrasena = "miContrasenaSegura123";
    const hash = await encriptarContrasena(contrasena);
    expect(hash).toBeDefined();
    expect(hash).not.toBe(contrasena);
})

test("compararHash deberia devolver true para contrasena correcta", async () => {
    const contrasena = "miContrasenaSegura123";
    const hash = await encriptarContrasena(contrasena);
    const resultado = await compararHash(contrasena, hash);
    expect(resultado).toBe(true);
})