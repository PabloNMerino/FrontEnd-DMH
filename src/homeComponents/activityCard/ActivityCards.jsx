import { useContext, useEffect, useState } from 'react'
import Styles from './ActivityCardStyle.module.css'
import { UserContext } from '../../context/userContext';
import moment from 'moment';

export const ActivityCard = ({user, userFullName, id, senderId, receiverId, amountOfMoney, date}) => {

    const [activityColor, setActivityColor] = useState("ingreso");
    const [title, setTitle] = useState('')
    const [userToken, setUserToken] = useState((sessionStorage.getItem('token') || ''))
    let currentDate = moment(date).format('DD/MM/YY, h:mm a');
    
    const userValues = useContext(UserContext)
    const userId = userValues.accountInfo.userId;

    useEffect(()=>{

        console.log("userId: " + userId);
        console.log("senderId: " + senderId);        
        if(userId!=undefined) {
            if(userId==senderId) {
                setActivityColor("egreso");
                getUserInformation(receiverId)
            } else {
                getUserInformation(senderId)
            }
        }
    },[userId, title])


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
                    <p className={Styles.date}>{currentDate}</p>
                </div>
                <p className={`${Styles[activityColor]} ${Styles.moneyBox}`}>{activityColor==="ingreso"? <span></span> : <span>- </span>}${amountOfMoney}</p>
            </div>
            <div className={Styles.separation}></div>
        </article>
    )
}