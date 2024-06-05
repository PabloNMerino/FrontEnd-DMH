import { Link } from 'react-router-dom'
import { CurrentMoney } from '../homeComponents/currentMoney/CurrentMoney'
import { HomeActivity } from '../homeComponents/homeActivity/HomeActivity'
import Styles from './HomeStyle.module.css'
import { useEffect, useState } from 'react'

export const Home = () => {

    const [accountInfo, setAccountInfo] = useState({})
    const [user, setUser] = useState({})
    const [userToken, setUserToken] = useState((sessionStorage.getItem('token') || ''))


    useEffect(() => {
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
                console.log(data);
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
                console.log(data);
            })    
    }

    return(
        <section className={Styles.homeSection}>
            <div>
                <article className={Styles.homeHeader}>
                    <p className={Styles.logo}>DMH</p>
                    <div className={Styles.iconAndNameContainer}>
                        <div className={Styles.iconName}><p>PM</p></div>
                        <span>Hola!, </span><span className={Styles.userName}>{user.name} {user.lastName}</span>
                    </div>
                    <Link to="/profile" className={Styles.linkProfile}>
                        <div className={Styles.verPerfilBtn}>
                            <p>Ver Perfil</p>
                        </div>
                    </Link>
                </article>
                <CurrentMoney amount={accountInfo.balance}/>
                <Link className={Styles.linkToCards} to="/cards">
                    <article className={Styles.cardsContainer}>
                        <p>Ver tarjetas asociadas</p>
                    </article>
                </Link>
            </div>
            <div>
                <HomeActivity/>
            </div>
        </section>
    )
}