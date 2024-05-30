import './App.css'
import { Body } from './body/Body'
import { useRoutes } from 'react-router-dom'
import { Login } from './login/Login'
import { Register } from './register/Register'
import { Footer } from './footer/Footer'
import { Home } from './home/Home'
import { Profile } from './profile/Profile'
import { Transferences } from './homeComponents/transferences/Tranferences'
import { Cards } from './homeComponents/cards/Cards'
import { TransferDetails } from './homeComponents/transferDetails/TransferDetails'
import { CvuAndAlias } from './homeComponents/cvuAndAlias/CvuAndAlias'
import { AddMoney } from './homeComponents/addMoney/AddMoney'
import { SendMoney } from './homeComponents/sendMoney/SendMoney'

function App() {

  const router = useRoutes([
    {path: '/', element: <Body/>},
    {path: '/login', element: <Login/>},
    {path:'/register', element: <Register/>},
    {path:'/home', element: <Home/>},
    {path:'/my-profile', element: <Profile/>},
    {path:'/all-transferences', element: <Transferences/>},
    {path:'/cards', element: <Cards/>},
    {path:'/details', element: <TransferDetails/>},
    {path:'/account-information', element: <CvuAndAlias/>},
    {path:'/add-money', element: <AddMoney/>},
    {path:'/send-money', element: <SendMoney/>},
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
