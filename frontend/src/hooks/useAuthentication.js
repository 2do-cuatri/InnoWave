import { useCallback, useState } from 'react'
import { 
    login as loginQuery,
    check as checkQuery,
    logout as logoutQuery,
} from '../queries/auth';
import { useNavigate } from 'react-router-dom';

/**
 * Maneja las funciones y estado basico de la autenticacion
 * @returns user si existe, loading si esta haciendo fetch, funciones de login, check y logout
 */
export default function useAuthentication() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const login = useCallback(async ({ email, password }) => {
        setLoading(true);
        const response = await loginQuery({ email, password })
        if (response.success) {
            localStorage.setItem('user', response.data);
        }
        
        setLoading(false);
        return response;
    }, [setLoading])

    const check = useCallback(() => {
        setLoading(true);
        checkQuery()
            .then(res => {
                if (!res) navigate('/ingreso')
            })
            .catch(() => navigate('/ingreso')) // ante la duda bloquear
            .finally(() => setLoading(false))
    }, [setLoading, navigate])

    const logout = useCallback(() => {
        setLoading(true);
        localStorage.removeItem('user')
        navigate("/ingreso")
        logoutQuery().finally(() => setLoading(false))
    }, [navigate])

    return { loading, login, check, logout }
}