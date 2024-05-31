import './App.css'
import { Body } from './body/Body'
import { useRoutes } from 'react-router-dom'
import { Login } from './login/Login'
import { Register } from './register/Register'
import { Footer } from './footer/Footer'
import { Home } from './home/Home'
import { Transferences } from './homeComponents/transferences/Tranferences'
import { Cards } from './homeComponents/cards/Cards'
import { TransferDetails } from './homeComponents/transferDetails/TransferDetails'
import { CvuAndAlias } from './homeComponents/cvuAndAlias/CvuAndAlias'
import { AddMoney } from './homeComponents/addMoney/AddMoney'
import { SendMoney } from './homeComponents/sendMoney/SendMoney'
import { RegisterCard } from './homeComponents/registerCard/RegisterCard'
import { Profile } from './homeComponents/profile/Profile'
import { UpdateProfile } from './homeComponents/updateProfile/UpdateProfile'
import { UpdatePassword } from './homeComponents/updatePassword/UpdatePassword'
import { UpdateAlias } from './homeComponents/updateAlias/UpdateAlias'

function App() {

  const router = useRoutes([
    {path: '/', element: <Body/>},
    {path: '/login', element: <Login/>},
    {path:'/register', element: <Register/>},
    {path:'/home', element: <Home/>},
    {path:'/all-transferences', element: <Transferences/>},
    {path:'/cards', element: <Cards/>},
    {path:'/details', element: <TransferDetails/>},
    {path:'/account-information', element: <CvuAndAlias/>},
    {path:'/add-money', element: <AddMoney/>},
    {path:'/send-money', element: <SendMoney/>},
    {path:'/register-card', element: <RegisterCard/>},
    {path:'/profile', element: <Profile/>},
    {path:'/update-profile', element: <UpdateProfile/>},
    {path:'/update-password', element: <UpdatePassword/>},
    {path:'/update-alias', element: <UpdateAlias/>},
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
