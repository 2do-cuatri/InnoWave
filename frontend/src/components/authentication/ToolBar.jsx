import { useContext } from "react";
import AuthenticationContext from "./AuthenticationContext"
import { Button, Container, HStack, Tooltip } from '@chakra-ui/react'
import useUser from "../../hooks/useUser";
import { CalendarIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const ToolBar = () => {
    const { logout, loading } = useContext(AuthenticationContext);
    const { getUser } = useUser();
    if (!getUser()) return null;
    return (
        <HStack spacing={2} alignItems={"center"} >
            

            <Tooltip label="Crear Producto">
                <Link to={"/create"}>
                    <Button>
                        <PlusSquareIcon fontSize={20}/>
                    </Button>
                </Link>
            </Tooltip>

            <Tooltip label="Reporte">
                <Button>
                    <CalendarIcon fontSize={20}/>
                </Button>
            </Tooltip>

            
            <Button colorScheme='orange' onClick={() => logout()}>{loading ? '...' : 'Cerrar Seción'}</Button>
                   
        </HStack>
    )
}

export default ToolBar;