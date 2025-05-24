import { useContext } from "react";
import AuthenticationContext from "./AuthenticationContext"
import { Button } from '@chakra-ui/react'
import useUser from "../../hooks/useUser";

const SignOut = () => {
    const { logout, loading } = useContext(AuthenticationContext);
    const { getUser } = useUser();
    if (!getUser()) return null;
    return <Button colorScheme='orange' onClick={() => logout()}>{loading ? '...' : 'SignOut'}</Button>
}

export default SignOut;