import { API_URL } from '../constants/api';
import { axiosPostWrapper } from './axiosWrapper';

/**
 * Manda el post a la ruta de login y devuelve el usuario si se logueo correctamente.
 * @param  {Object} { email: string, password: string } 
 * @returns User
 */
export async function login({ email, password }) {
        const response = await axiosPostWrapper(`${API_URL}/auth/signin`, {
            email,
            password
        }, {
            withCredentials: true
        })
        return response;
    }

/**
 *  Postea el registro al BE
 * @param email y contrasena
 * @returns 
 */
export async function signup({ email, password }) {
    const response = await axiosPostWrapper(`${API_URL}/auth/signup`, {
        email,
        password
    }, {
        withCredentials: true
    })
    return response;
}

/**
 * Manda el post a validate
 * @returns Devuelve true si esta autenticado, si no false.
 */
export async function check() {
    const response = await axiosPostWrapper(`${API_URL}/auth/validate`, undefined, {
        withCredentials: true // Importante para que se pase el JWT
    })
    console.log(response)
    return response.success === true;
}

/**
 * Manda el post a logout
 * @returns true si fue successful
 */
export async function logout() {
    const response = await axiosPostWrapper(`${API_URL}/auth/signout`, undefined, { withCredentials: true })
    return response.success === true;
}