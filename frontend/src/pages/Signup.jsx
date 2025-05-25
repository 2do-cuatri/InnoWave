import React   from 'react'
import { ErrorMessage } from '@hookform/error-message';
import { useNavigate } from "react-router-dom";
import { Container, VStack, FormControl,FormLabel, Input, Button, FormErrorMessage, useToast, Text, useColorModeValue, Heading,Box } from '@chakra-ui/react';

import { useForm } from 'react-hook-form'
import { signup } from '../queries/auth';

const SignUp = () => {
    const navigate = useNavigate();
    const { handleSubmit, register, setError, formState: { errors, isSubmitting }} = useForm()

    const toast = useToast();

    const onSubmit = async (data) => {
        try {
            const response = await signup({ ...data })
            if (!response.success) {
                toast({
                    title: 'Error de registro',
                    description: response.error.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true  
                })
                return setError('root', { message: response.error.message })
            }
            toast({
                title: "Registro exitoso",
                description: "Cuenta creada con éxito",
                status: 'success',
                duration: 1000,
                isClosable: true
            });
            navigate('/ingreso')
        } catch(err) {
            toast({
                title: "Error inesperado",
                description: err instanceof Error ? err.message : 'Error inesperado',
                status: 'error',
                duration: 5000,
                isClosable: true
            })
            console.error('Cliente ', err)
        }
    }

    return <Container maxW='container.sm' >
        <VStack spacing={8}>
            <Heading
                as="h1"
                size="xl"
                textAlign="center"
                color={useColorModeValue('blue.700', 'blue.300')}
            >
            Registrarse
            </Heading>
            <Box
                w="full"
                bg={useColorModeValue('white', 'gray.700')}
                p={6}
                rounded="lg"
                shadow="md">

            
            <form onSubmit={handleSubmit(onSubmit)}>
            
                <FormControl isInvalid={!!errors.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input id="email" type="email" {...register('email', {
                        required: "Debes ingresar un email",
                        pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: "Ingresa un email valido"
                        }
                    })} />
                    <FormErrorMessage>
                        <ErrorMessage errors={errors} name="email" />
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password}>
                    <FormLabel htmlFor="password">Contraseña</FormLabel>
                    <Input id="password" type="password" {...register('password', {
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
                    <FormErrorMessage>
                        <ErrorMessage errors={errors} name="password" />
                    </FormErrorMessage>
                </FormControl>
                <Text>
                    <ErrorMessage errors={errors} name="root" />
                </Text>
                <Button
                    colorScheme="blue"
                    type="submit"
                    isLoading={isSubmitting}
                    w="full"
                    mt={4} 
                >
                 Registrarse
                </Button>
            </form>
            </Box>
        </VStack>
        
    </Container>
}
          
               


export default SignUp;