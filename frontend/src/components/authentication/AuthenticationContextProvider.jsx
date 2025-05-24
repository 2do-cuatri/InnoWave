import useAuthentication from '../../hooks/useAuthentication';
import AuthenticationContext from './AuthenticationContext';

const AuthenticationContextProvider = ({ children }) => {
    const auth = useAuthentication();

    return <AuthenticationContext.Provider value={auth}>{children}</AuthenticationContext.Provider>
}

export default AuthenticationContextProvider;