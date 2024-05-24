import { useState } from 'react'
import './App.css'
import { Body } from './body/Body'
import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom'
import { Login } from './login/Login'
import { Register } from './register/Register'
import { Footer } from './footer/Footer'

function App() {
  const [count, setCount] = useState(0)

  const router = useRoutes([
    {path: '/', element: <Body/>},
    {path: '/login', element: <Login />},
    {path:'/register', element: <Register />},
    {path:'*', element: <div>Not Found</div>}
  ])

  return (
    <div className='mainClass'>
      {router}
      <Footer />
    </div>
  )
}
export default App
