import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HeroUIProvider } from '@heroui/react'
import {ToastProvider} from "@heroui/toast";
import App from './App.tsx'
import './styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
        <ToastProvider/>
        <App />
    </HeroUIProvider>
  </StrictMode>,
)
