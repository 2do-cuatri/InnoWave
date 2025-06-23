import {Box, useColorModeValue} from "@chakra-ui/react";
import Navbar  from "./components/Navbar";
import  HomePage  from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from "./components/authentication/ProtectedRoute";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import ReportPage from "./pages/ReportPage";
import NotFoundPage from "./pages/NotFoundPage";


function App() {
  return (
    <>
      <Box minH={"100vh"}bg={useColorModeValue("gray.100","gray.900")}>
        <Navbar/>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
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
          <Route path="/report" element={<ReportPage />} />
        </Routes>

      </Box>
    </>
  )
}

export default App
