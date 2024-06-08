import { Link } from 'react-router-dom'
import { ActivityCard } from '../activityCard/ActivityCards'
import Styles from './HomeActivityStyle.module.css'
import { useEffect, useState } from 'react'

export const HomeActivity = ({userId, userName}) => {

    const [transferences, setTransferences] = useState([])
    const [userToken, setUserToken] = useState((sessionStorage.getItem('token') || ''))
    const [noActivity, setNoActivity] = useState(false)

    useEffect(()=>{
        if(transferences.length==0) {
            getTransferences()
        }
    },[])

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
        if(response.status==404) {
            setNoActivity(true)
        } else {
                const data = await response.json()
                setTransferences(data)
        }
    }

    return(
        <section className={Styles.transferences}>
            {
                !noActivity?             <div>
                {
                    transferences.map((transference, index) => {
                        return(
                            <Link key={index} className={Styles.detailsLink} to='/details' state={transference}>
                                <ActivityCard user={userId} userFullName={userName} {...transference}/>
                            </Link>
                        )
                    })
                }
                <Link to="/all-transferences" className={Styles.linkToTransferences}><p className={Styles.seeMoreBtn}>Ver Mas</p></Link>
            </div> : <div className={Styles.noTransferences}>No hay ninguna transferencia realizada</div>
            }



        </section>
    )
}