import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import router from './Routes/Router.jsx'
import { RouterProvider } from 'react-router'
import Authprovider from './Authprovider/Authprovider.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
 
    <Authprovider>
      <Toaster></Toaster>
      <RouterProvider router={router} />
    </Authprovider>
   
 
)
