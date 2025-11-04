import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './todo/Navbar'
import './App.css'
import Homepage from './todo/Homepage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


function App() {
  const router=createBrowserRouter([
    { path:'/',
      element:(<><Navbar/><Homepage/></>),
    },]
  )
  

  return (
    <>
    <RouterProvider router={router}/>
    
    </>
  )
}

export default App
