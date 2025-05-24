import {Box, useColorModeValue} from "@chakra-ui/react";
import Navbar  from "./components/Navbar";
import  HomePage  from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from "./components/authentication/ProtectedRoute";
import Login from "./pages/Login";

function App() {
  
  return (
    <>
      <Box minH={"100vh"}bg={useColorModeValue("gray.100","gray.900")}>
        <Navbar/>
        <Routes>
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
        </Routes>

      </Box>
    </>
  )
}

export default App
