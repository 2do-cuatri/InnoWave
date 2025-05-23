import {Box} from "@chakra-ui/react";
import Navbar  from "./components/Navbar";
import  HomePage  from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Box minH={"100vh"}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/HomePage" element={<HomePage/>} />
          <Route path="/HomePage" element={<HomePage/>} />

        </Routes>

      </Box>
    </>
  )
}

export default App
