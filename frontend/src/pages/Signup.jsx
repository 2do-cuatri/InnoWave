import React   from 'react'
import { ErrorMessage } from '@hookform/error-message';
import { useNavigate } from "react-router-dom";
import {
    Container,
    VStack
} from '@chakra-ui/react'

import { useForm } from 'react-hook-form'
import { signup } from '../queries/auth';

const SignUp = () => {
    const navigate = useNavigate();
    const { handleSubmit, register, setError, formState: { errors, isSubmitting }} = useForm()

    const onSubmit = async (data) => {
        try {
            const response = await signup({ ...data })
            if (!response.success) {
                return setError('root', { message: response.error.message })
            }
            navigate('/ingreso')
        } catch(err) {
            console.error('Cliente ', err)
        }
    }

    return <Container maxW='container.xl' py={12} minH="100vh"display="flex" flexDirection="column" justifyContent="center">
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={8}>
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
                <button type="submit" disabled={isSubmitting} >
                    {isSubmitting ? '...' : 'Registrarse'}
                </button>
            </VStack>
        </form>
    </Container>
}


export default SignUp;