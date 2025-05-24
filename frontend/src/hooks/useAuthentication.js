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
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = useCallback(async ({ email, password }) => {
        setLoading(true);
        const response = await loginQuery({ email, password })
        if (response.success) {
            setUser(response.data);
        } else {
            setUser(null)
        };
        setLoading(false);
        return response;
    }, [setLoading, setUser])

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
        setUser(null);
        navigate("/ingreso")
        logoutQuery().finally(() => setLoading(false))
    }, [navigate])

    return { user, loading, login, check, logout }
}