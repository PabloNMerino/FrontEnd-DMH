import { Link, useNavigate } from 'react-router-dom'
import { CurrentMoney } from '../homeComponents/currentMoney/CurrentMoney'
import { HomeActivity } from '../homeComponents/homeActivity/HomeActivity'
import Styles from './HomeStyle.module.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'

export const Home = () => {

    const [accountInfo, setAccountInfo] = useState({})
    const [user, setUser] = useState({})
    const [userToken, setUserToken] = useState((sessionStorage.getItem('token') || ''))
    const [userFullName, setUserFullName] = useState('')
    const navigate = useNavigate();


    useEffect(() => {
        if(sessionStorage.getItem('token')===null) {
            navigate("/")
        }

        if(userToken!='') {
            accountFetch()
        }

    }, [])

    useEffect(()=> {
        if(Object.keys(accountInfo).length != 0) {
            userFetch()
        }
    }, [accountInfo])



    const accountFetch = async () => {

        const url = 'http://localhost:8084/account/user-information'
        const settings = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
        }

        fetch(url, settings)
            .then(response => response.json())
            .then(data => {
                setAccountInfo(data)
            })    
    }

    const userFetch = async () => {

        const url = `http://localhost:8084/user/${accountInfo.userId}`
        const settings = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
        }

        fetch(url, settings)
            .then(response => response.json())
            .then(data => {
                setUser(data)
                setUserFullName(`${data.name} ${data.lastName}`)
            })    
    }

    const logout = () => {
        sessionStorage.removeItem('token');
        navigate("/")
    }


    return(
        <section className={Styles.homeSection}>
            <div>
                <article className={Styles.homeHeader}>
                    <p className={Styles.logo}>DMH</p>
                    <div className={Styles.iconAndNameContainer}>
                        {
                            Object.keys(user).length != 0?  <div className={Styles.iconName}><p>{user.name.split('')[0]}{user.lastName.split('')[0]}</p></div> :  <div className={Styles.iconName}><p></p></div>
                        }
                       
                        <span>Hola!, </span><span className={Styles.userName}>{userFullName}</span>
                    </div>
                    <Link to="/profile" className={Styles.linkProfile}>
                        <div className={Styles.verPerfilBtn}>
                            <p>Ver Perfil</p>
                        </div>
                    </Link>
                    <button onClick={()=>logout()} className={Styles.logoutBtn}><p>Logout</p></button>
                </article>
                <CurrentMoney amount={accountInfo.balance}/>
                <Link className={Styles.linkToCards} to="/cards">
                    <article className={Styles.cardsContainer}>
                        <p>Ver tarjetas asociadas</p>
                    </article>
                </Link>
            </div>
            <div>
                <HomeActivity userId={accountInfo.userId} userName={userFullName}/>
            </div>
        </section>
    )
}