import bcrypt from 'bcrypt';

/**
 * Encripta una cadena para guardar como contrasena seguramente en la BBDD.
 * @param {String} contrasena el valor plano ingresado por el usuario
 * @returns Contrasena encriptada.
 */
export async function encriptarContrasena(contrasena) {
    const saltRounds = 10;
    const passHash = await bcrypt.hash(contrasena, saltRounds);
    return passHash;
};

/**
 * Compara un valor plano contra uno encriptado.
 * @param {String} input valor plano ingresado por el usuario.
 * @param {String} hash valor encriptado guardado en la BBDD
 * @returns {Boolean} True si los valores coinciden. De otro modo false.
 */
export function compararHash(input, hash) {
    return bcrypt.compare(input, hash)
}