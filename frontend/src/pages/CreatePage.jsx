import { Box, Container, Heading, useColorModeValue,Input,Button, useToast,VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

// TODO: poner lindo con chakra + toast

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name:"",
    price:"",
    stock:"",
    minStock:"",
    image:"",
  }); 

  const toast = useToast()
  const {createProduct} = useProductStore()

  const handleAddProduct = async() =>{
    const {success, message} = await createProduct(newProduct);
    if(!success) {
        toast({
            title:"Error",
            description:message,
            status:"error",
            duration:5000,
            isClosable: true
        });
       }   else {
            toast({
            title:"Success",
            description:message,
            status:"success",
            isClosable: true
        });
        }
    setNewProduct({ name:"", price:"", stock:"", minStock:"", image:""});
};


  return <Container maxW={"container.sm"}>  
            <VStack
                spacing={8}>
                    <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8} color={useColorModeValue("blue.700", "blue.300")}>
                        CREAR PRODUCTO
                    </Heading>
                    <Box 
                        w={"full"} 
                        bg={useColorModeValue("white","gray.700")}
                        p={6} rounded={"lg"} shadow={"md"}
                    >
                        <VStack spacing={4}>
                            <Input
                            placeholder="Nombre"
                            name="name"
                            value={newProduct.name}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, name: e.target.value })
                            }
                            _placeholder={{ color: useColorModeValue("gray.600", "gray.100") }}
                            />
                            <Input
                            placeholder="Precio"
                            name="price"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, price: e.target.value })
                            }
                            _placeholder={{ color: useColorModeValue("gray.600", "gray.100") }}
                            />
                            <Input
                            placeholder="Cantidad"
                            name="stock"
                            type="number"
                            value={newProduct.stock}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, stock: e.target.value })
                            }
                            _placeholder={{ color: useColorModeValue("gray.600", "gray.100") }}
                            />
                            <Input
                            placeholder="Cantidad Mínima"
                            name="minStock"
                            type="number"
                            value={newProduct.minStock}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, minStock: e.target.value })
                            }
                            _placeholder={{ color: useColorModeValue("gray.600", "gray.100") }}
                            />
                            <Input
                            placeholder="Image URL"
                            name="image"
                            value={newProduct.image}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, image: e.target.value })
                            }
                            _placeholder={{ color: useColorModeValue("gray.600", "gray.100") }}
                            />
                            <Button colorScheme='blue' onClick={handleAddProduct} w='ful'> Agregar producto</Button>
                        </VStack>
                    </Box>
                </VStack>

        </Container>
    
  
}

export default CreatePage