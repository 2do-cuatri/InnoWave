import React, { useContext } from 'react';
import AuthenticationContext from '../components/authentication/AuthenticationContext';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Heading, Input, VStack, FormControl, FormLabel, useColorModeValue, useToast, Text } from '@chakra-ui/react';
// TODO: Poner lindo con chakra + toasts
const Login = () => {

    const navigate = useNavigate();
    const toast = useToast();
    const { login, loading } = useContext(AuthenticationContext); 
    const { handleSubmit, register, setError, formState: { errors, isSubmitting }} = useForm()

    const onSubmit = async (data) => {
        try {
            const response = await login({ ...data })
            if (!response.success) {
                setError('root', { message: response.error.message })
                 toast({
                title: 'Error de autenticación',
                description: response.error.message,
                status: 'error',
                duration: 5000,
                isClosable: true
                });
                return;
            }
            navigate('/')
        } catch(err) {
            console.error('Cliente ', err);
            toast({
            title: 'Error del cliente',
            description: 'Ocurrió un error inesperado',
            status: 'error',
            duration: 5000,
            isClosable: true
      });
        }
    }

    return <div>
        <Container maxW="container.sm">
            <VStack spacing={8}>
                <Heading
                    as="h1"
                    size="xl"
                    textAlign="center"
                    color={useColorModeValue('blue.700', 'blue.300')}
                >
                 Iniciar Sesión
                </Heading>
                 <Box
                    w="full"
                    bg={useColorModeValue('white', 'gray.700')}
                    p={6}
                    rounded="lg"
                    shadow="md"
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <VStack spacing={4}>
                            <FormControl>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Input id="email" type="email" w="full" {...register('email', {
                                required: "Debes ingresar un email",
                                pattern: {
                                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: "Ingresa un email valido"
                                }
                            })} />
                                <ErrorMessage errors={errors} name="email" />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="password">Contraseña</FormLabel>
                                <Input id="password" type="password" w="full"{...register('password', {
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
                            </FormControl>
                            <ErrorMessage errors={errors} name="root" />
                            <Button
                            colorScheme="blue"
                            type="submit"
                            isLoading={isSubmitting || loading}
                            w="full"
                            >Ingresar</Button>
                        </VStack>
                    </form>
                </Box>

            </VStack>
        </Container>

      
    </div>
}

export default Login;