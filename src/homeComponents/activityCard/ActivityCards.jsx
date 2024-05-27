import { useEffect, useState } from 'react'
import Styles from './ActivityCardStyle.module.css'

export const ActivityCard = ({id, userId, senderId, receiverId, amountofMoney, date}) => {

    const [activityColor, setActivityColor] = useState("ingreso");
    const [title, setTitle] = useState(`De: ${senderId}`)

    useEffect(()=>{
        if(userId==senderId) {
            setActivityColor("egreso");
            setTitle(`Para: ${receiverId}`)
        }
    },[])

    return (
        <article className={Styles.cardArticle}>
            <div className={Styles.card}>
                <div className={Styles.transferInfo}>
                    <p>{title}</p>
                    <p className={Styles.date}>{date}</p>
                </div>
                <p className={`${Styles[activityColor]} ${Styles.moneyBox}`}>${amountofMoney}</p>
            </div>
            <div className={Styles.separation}></div>
        </article>
    )
}