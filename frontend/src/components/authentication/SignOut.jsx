import { useContext } from "react";
import AuthenticationContext from "./AuthenticationContext"

const SignOut = () => {
    const { user, logout, loading } = useContext(AuthenticationContext);
    if (!user) return null;
    return <button onClick={() => logout()}>{loading ? '...' : 'SignOut'}</button>
}

export default SignOut;