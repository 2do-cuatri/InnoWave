import {Box, useColorModeValue} from "@chakra-ui/react";
import Navbar  from "./components/Navbar";
import  HomePage  from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from "./components/authentication/ProtectedRoute";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";

function App() {
  
  return (
    <>
      <Box minH={"100vh"}bg={useColorModeValue("gray.100","gray.900")}>
        <Navbar/>
        <Routes>
          <Route path="*" element={
            // TODO: hacer una pagina not found
            <div>
              Oops, parece que la pagina que estas buscando no existe
            </div>
          } />
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage/>
            </ProtectedRoute>
          } />
          <Route path="/create" element={
            <ProtectedRoute>
              <CreatePage/>
              </ProtectedRoute>
            } />
          <Route path="/ingreso" element={<Login />} />
          <Route path="/registro" element={<SignUp />} />
        </Routes>

      </Box>
    </>
  )
}

export default App
