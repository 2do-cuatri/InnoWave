import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import {BrowserRouter} from "react-router-dom";
import AuthenticationContextProvider from './components/authentication/AuthenticationContextProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
        <BrowserRouter>
          <AuthenticationContextProvider>
            <App />
          </AuthenticationContextProvider>
        </BrowserRouter>
    </ChakraProvider>
  </StrictMode>,
)
