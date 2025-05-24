import React, { useContext, useEffect } from 'react';
import AuthenticationContext from './AuthenticationContext';

const ProtectedRoute = ({ children }) => {
   const { loading, check } = useContext(AuthenticationContext);
   useEffect(() => {
    check();
   }, [check])

   if (loading) return 'autenticando...'
   return <>{children}</>
}

export default ProtectedRoute;