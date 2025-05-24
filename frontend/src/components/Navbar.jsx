import React, { useContext } from 'react'
import AuthenticationContext from './authentication/AuthenticationContext'
import SignOut from './authentication/SignOut';
import { Link } from 'react-router-dom';

function Navbar() {
  const { user } = useContext(AuthenticationContext);
  return (
    <div>
      Navbar
      <div>
          {user ? 
          <div>
            {user.email}
            <SignOut />
          </div> : <Link to="/Ingreso">Ingresar</Link>}
      </div>
    </div>
  )
}

export default Navbar
