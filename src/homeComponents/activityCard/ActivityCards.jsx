import { useEffect, useState } from 'react'
import Styles from './ActivityCardStyle.module.css'

export const ActivityCard = ({user, userFullName, id, senderId, receiverId, amountOfMoney, date}) => {

    const [activityColor, setActivityColor] = useState("ingreso");
    const [title, setTitle] = useState()
    const [userToken, setUserToken] = useState((sessionStorage.getItem('token') || ''))

    useEffect(()=>{
        
        if(user==senderId) {
            setActivityColor("egreso");
            setTitle(title)
            getUserInformation(receiverId)
        } else {
            getUserInformation(senderId)
        }
    },[])

    const getUserInformation = async(id) => {
        const url = `http://localhost:8084/user/${id}`
        const settings = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
        }

        const response = await fetch(url, settings)
        const data = await response.json()
        setTitle(`${data.name} ${data.lastName}`)

    }



    return (
        <article className={Styles.cardArticle}>
            <div className={Styles.card}>
                <div className={Styles.transferInfo}>
                    <p>{title}</p>
                    <p className={Styles.date}>{date}</p>
                </div>
                <p className={`${Styles[activityColor]} ${Styles.moneyBox}`}>{activityColor==="ingreso"? <span></span> : <span>- </span>}${amountOfMoney}</p>
            </div>
            <div className={Styles.separation}></div>
        </article>
    )
}