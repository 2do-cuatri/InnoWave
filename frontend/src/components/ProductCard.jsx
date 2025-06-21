import { DeleteIcon, EditIcon,VStack } from '@chakra-ui/icons';
import { 
  Box,
  Text, 
  IconButton, 
  Heading, 
  Image, 
  useDisclosure, 
  useColorModeValue, 
  useToast, 
  HStack, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  ModalFooter, 
  Button,
  Input 
} from '@chakra-ui/react';
import { useProductStore } from '../store/product';

import { useForm } from 'react-hook-form';

const ProductCard = ({ product }) => {

  const textColor = useColorModeValue("gray.600","gray.200");
  const bg = useColorModeValue("white","gray.800");

  const STOCK_THRESHOLD = product.minStock;
  const isLowStock = product.stock <= STOCK_THRESHOLD;

  const {deleteProduct, updateProduct} = useProductStore()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      name: product.name,
      stock: product.stock,
      minStock: product.minStock,
      price: product.price,
      image: product.image
    }
  });
  

  const handleDeleteProduct = async (pid) => {
    const {success,message} = await deleteProduct(pid)
    if(!success){
      toast({
        title:'Error',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } else {
      toast({
        title:'Success',
        description: message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
  }

 
  const handleUpdateProduct = async (updatedProduct) =>{

    const {success,message }=await updateProduct(product._id, updatedProduct);
    onClose();
    if(!success){
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration:3000,
        isClosable: true,
      })
    } else {
      toast({
        title: "Success",
        description: "Producto modificado con éxito",
        status: "success",
        duration:3000,
        isClosable: true,
      })
    }
  }

  return (
    <Box 
    shadow='lg'
    rounded='lg'
    overflow='hidden'
    transition='all 0.3s'
    _hover={{transform:"translateY(-5px)", shadow:"xl"}}
    bg={bg}
    >
      <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover'/>
      <Box p={4}>
        <Heading as='h3' size='md' mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={2} justifyContent='space-between'>
          <HStack spacing={2}>
            <IconButton icon={<EditIcon/>} onClick={onOpen} colorScheme='blue'/>
            <IconButton icon={<DeleteIcon/>} onClick={() => handleDeleteProduct (product._id)}
            colorScheme='red'/>
          </HStack>
          {isLowStock && (
            <Text fontSize='xl' color='orange.500' fontWeight='bold' mb={4}>
              ⚠ Alerta de stock
            </Text>
          )}

        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
          <ModalContent>
            <form onSubmit={handleSubmit(handleUpdateProduct)}>
              <ModalHeader>Modificar producto</ModalHeader>
              <ModalCloseButton/>
              <ModalBody>
                  <VStack spacing={4}>
                    <Input placeholder="Nombre" name="name" {...register('name')} />
                    <Input placeholder="Precio" name="price" type="number" {...register('price')} />
                    <Input placeholder="Cantidad" name="stock" type="number" {...register('stock')} />
                    <Input placeholder="Cantidad minima" name="minStock" type="number" {...register('minStock')} />
                    <Input placeholder="Image URL" name="image" {...register('image')} />
                  </VStack>            
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='blue' mr={3} type='submit'>
                  Modificar
                </Button>
                <Button variant='ghost' onClick={onClose} type="reset">
                  Cancelar
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>

      </Modal>
    </Box>
      
    
  );
};

export default ProductCard;