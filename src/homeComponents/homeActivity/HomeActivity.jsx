import { Link } from 'react-router-dom'
import { ActivityCard } from '../activityCard/ActivityCards'
import Styles from './HomeActivityStyle.module.css'
import { useEffect, useState } from 'react'

export const HomeActivity = ({userId, userName}) => {

    const [transferences, setTransferences] = useState([])
    const [userToken, setUserToken] = useState((sessionStorage.getItem('token') || ''))

    useEffect(()=>{
        if(transferences.length==0) {
            getTransferences()
        }
    },[])

    useEffect(()=>{
        console.log(transferences);
    },[transferences])

    const getTransferences = async() => {
        const url = "http://localhost:8084/account/transactions"
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
    }

    return(
        <section className={Styles.transferences}>
            
            {
                transferences.map((transference, index) => {
                    return(
                        <Link key={index} className={Styles.detailsLink} to='/details'>
                            <ActivityCard user={userId} userFullName={userName} {...transference}/>
                        </Link>
                    )
                })
            }
            <Link to="/all-transferences" className={Styles.linkToTransferences}><p className={Styles.seeMoreBtn}>Ver Mas</p></Link>
        </section>
    )
}