import React, { useContext } from 'react';
import AuthenticationContext from '../components/authentication/AuthenticationContext';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useNavigate } from 'react-router-dom';
// TODO: Poner lindo con chakra + toasts
const Login = () => {

    const navigate = useNavigate();
    const { login, loading } = useContext(AuthenticationContext); 
    const { handleSubmit, register, setError, formState: { errors, isSubmitting }} = useForm()

    const onSubmit = async (data) => {
        try {
            const response = await login({ ...data })
            if (!response.success) {
                return setError('root', { message: response.error.message })
            }
            navigate('/')
        } catch(err) {
            console.error('Cliente ', err)
        }
    }

    return <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor='email'>Email</label>
                <input id="email" type="email" {...register('email', {
                    required: "Debes ingresar un email",
                    pattern: {
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Ingresa un email valido"
                    }
                })} />
                <ErrorMessage errors={errors} name="email" />
            </div>
            <div>
                <label htmlFor='password'>Contraseña</label>
                <input id="password" type="password" {...register('password', {
                    required: "Debes ingresar una contraseña",
                    minLength: {
                        value: 6,
                        message: "La contraseña debe tener al menos 6 caracteres"
                    },
                    maxLength: {
                        value: 42,
                        message: "La contraseña es muy larga"
                    }
                })} />
                <ErrorMessage errors={errors} name="password" />
            </div>
            <div>
                <ErrorMessage errors={errors} name="root" />
            </div>
            <button type="submit" disabled={isSubmitting || loading}>
                {isSubmitting || loading ? '...' : 'Ingresar'}
            </button>
        </form>
    </div>
}

export default Login;