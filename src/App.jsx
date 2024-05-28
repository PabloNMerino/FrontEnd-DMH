import './App.css'
import { Body } from './body/Body'
import { useRoutes } from 'react-router-dom'
import { Login } from './login/Login'
import { Register } from './register/Register'
import { Footer } from './footer/Footer'
import { Home } from './home/Home'
import { Profile } from './profile/Profile'
import { Transferences } from './homeComponents/cards/Tranferences'

function App() {

  const router = useRoutes([
    {path: '/', element: <Body/>},
    {path: '/login', element: <Login/>},
    {path:'/register', element: <Register/>},
    {path:'/home', element: <Home/>},
    {path:'/my-profile', element: <Profile/>},
    {path:'/all-transferences', element: <Transferences/>},
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
