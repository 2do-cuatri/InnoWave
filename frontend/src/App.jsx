import {Box} from "@chakra-ui/react";
import Navbar  from "./components/Navbar";
import  HomePage  from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from "./components/authentication/ProtectedRoute";
import Products from "./pages/Products";
import Login from "./pages/Login";

function App() {

  return (
    <>
      <Box minH={"100vh"}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/HomePage" element={<HomePage/>} />
          <Route path="/Productos" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/Ingreso" element={<Login />} />
        </Routes>

      </Box>
    </>
  )
}

export default App
