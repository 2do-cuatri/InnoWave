import { Button, Container, Flex, HStack, Text, Tooltip, useColorMode } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
//import {IoMoon} from 'react-icons/io5';

import { SunIcon, MoonIcon, CalendarIcon, ViewIcon } from '@chakra-ui/icons';
import ToolBar from './authentication/ToolBar';

function Navbar() {
  const {colorMode, toggleColorMode} = useColorMode();

  return (
    <Container maxW={"1140px"} px={4}  >
        <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{
                base:"column",
                sm:"row"
            }}>
                
                <Text
                    fontSize={{base:"22", sm:"28"}}
                    fontWeight={'bold'}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={'text'}
                
                >
                    <Link to={"/"}>Gestion de Productos</Link>
                </Text>
                <HStack spacing={2} alignItems={"center"} >

                                                          

                    <Tooltip label={colorMode==="light"? "Modo Oscuro" : "Modo Claro"}>
                        <Button onClick={toggleColorMode}>
                            {colorMode==="light"?<MoonIcon /> : <SunIcon size="20"/>}
                        </Button>
                    </Tooltip>

                  <ToolBar />
                </HStack>
        </Flex>

    </Container> 
  );
};

export default Navbar;
