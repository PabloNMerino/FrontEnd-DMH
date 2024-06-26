import { Link, useNavigate } from 'react-router-dom'
import { ActivityCard } from '../activityCard/ActivityCards'
import Styles from './TransferencesStyle.module.css'
import { useEffect, useState } from 'react'

export const Transferences = () => {

    const [transferences, setTransferences] = useState([])
    const [userToken, setUserToken] = useState((sessionStorage.getItem('token') || ''))
    const [userId, setUserId] = useState()
    const [userFullName, setUserFullName] = useState(``)
    const navigate = useNavigate();

    
    useEffect(()=>{
                
        if(sessionStorage.getItem('token')===null) {
            navigate("/")
        }
        
        if(transferences.length==0) {
            getTransferences()
        }
        getAccountInfo()
    },[])

    useEffect(()=>{
        if(userId!=undefined) {
            getUserInfo()
        }
    },[userId])

    const getTransferences = async() => {
        const url = "http://vps-4202860-x.dattaweb.com:8084/account/activity"
        const settings = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
        }

        const response = await fetch(url, settings)
        const data = await response.json()
        setTransferences(data)
        console.log(data);
    }


    const getAccountInfo = async() => {
        const url = 'http://vps-4202860-x.dattaweb.com:8084/account/user-information'
        const settings = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
        }
        const response = await fetch(url, settings)
        const data = await response.json()
        setUserId(data.userId)
    }

    
    const getUserInfo = async() => {
        const url = `http://vps-4202860-x.dattaweb.com:8084/user/${userId}`
        const settings = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        }
        const response = await fetch(url, settings)
        const data = await response.json()
        setUserFullName(`${data.name} ${data.lastName}`)
    }





    return(
        <section className={Styles.transferencesSection}>
            <article className={Styles.transferencesArticle}>
                <div>
                    <Link className={Styles.returnHomeTop}to='/home'>Volver a home</Link>
                    <div className={Styles.transferencesContainer}>
                        {
                            transferences.map((transference, index) => {
                                return(
                                    <Link key={index} className={Styles.detailsLink} to='/details'  state={transference}>
                                        <ActivityCard user={userId} userFullName={userFullName} transferenceId={transference.id}  transferDate={transference.date}/>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
                <Link className={Styles.returnHomeBottom}to='/home'>Volver a home</Link>
            </article>
        </section>
    )
}

