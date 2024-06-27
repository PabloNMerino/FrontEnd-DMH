import { useContext, useEffect, useState } from 'react'
import Styles from './ActivityCardStyle.module.css'
import { UserContext } from '../../context/userContext';
import moment from 'moment';
import { Login } from '../../login/Login';

export const ActivityCard = ({transferenceId, transferDate}) => {

    const [activityColor, setActivityColor] = useState("ingreso");
    const [title, setTitle] = useState('')
    const [senderId, setSenderID] = useState()
    const [receiverId, setReceiverId] = useState('')
    const [amountOfMoney, setAmountOfMoney] = useState('')
    const [date, setDate] = useState(transferDate)
    const [userToken, setUserToken] = useState((sessionStorage.getItem('token') || ''))
    const [transference, setTransference] = useState({})
    let momentDate = moment.utc(date);
    let localDate = momentDate.local();
    let localDateString = localDate.format('DD/MM/YY, h:mm a');
    const [userId, setUserId] = useState()

    useEffect(()=>{    
        if(transferenceId!=undefined) {
            getTransference()
        }
    },[])

    useEffect(()=>{    
        if(senderId!=undefined) {
            getAccountInfo()
        }
    },[senderId])


    useEffect(()=>{     
        if(userId!=undefined && senderId!=undefined) {
            if(userId==senderId) {
                setActivityColor("egreso");
                getUserInformation(receiverId)
            } else {
                getUserInformation(senderId)
            }
        }
    },[userId])

    const getTransference= async() => {
        const url = `http://vps-4202860-x.dattaweb.com:8084/account/activity/${transferenceId}`
        const settings = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
        }

        const response = await fetch(url, settings)
        const data = await response.json()
        setSenderID(data.senderId)
        setReceiverId(data.receiverId)
        setAmountOfMoney(data.amountOfMoney)
        setDate(date)
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


    const getUserInformation = async(id) => {
        const url = `http://vps-4202860-x.dattaweb.com:8084/user/${id}`
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
                    <p className={Styles.date}>{localDateString}</p>
                </div>
                <p className={`${Styles[activityColor]} ${Styles.moneyBox}`}>{activityColor==="ingreso"? <span></span> : <span>- </span>}${amountOfMoney}</p>
            </div>
            <div className={Styles.separation}></div>
        </article>
    )
}