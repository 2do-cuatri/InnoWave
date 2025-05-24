import axios from 'axios'

/**
 * Existe para no tener que meter todas las requests de axios en try catch.
 * Devuelve success: true si salio todo ok + la respues
 * Devuelve success: false si algo fallo + el error
 */
export async function axiosPostWrapper(url, data, config) {
    try {
        const res = await axios.post(url, data, config)
        return {
            success: true,
            data: res.data
        }
    } catch(err) {
        return {
            success: false,
            error: err.response?.data || err
        }
    }
}