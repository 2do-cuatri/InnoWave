import { Container, VStack, Heading, Text, Button } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <Container maxW={"container.md"} minH="80vh" display="flex" alignItems="center" justifyContent="center">
            <VStack spacing={8}>
                <WarningTwoIcon boxSize={20} color="orange.400" />
                <Heading as="h1" size="2xl" color="blue.600" textAlign="center">
                    404 - Página no encontrada
                </Heading>
                <Text fontSize="xl" color="gray.500" textAlign="center">
                    Oops, la página que buscas no existe o fue movida.
                </Text>
                <Button as={Link} to="/" colorScheme="blue" size="lg">
                    Volver al inicio
                </Button>
            </VStack>
        </Container>
    );
};

export default NotFoundPage;