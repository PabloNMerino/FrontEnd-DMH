import { Link, useLocation, useNavigate } from 'react-router-dom'
import Styles from './TransferDetailsStyle.module.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/userContext';
import moment from 'moment';

export const TransferDetails = () => {

    const location = useLocation()
    const transfer = location.state
    let momentDate = moment.utc(transfer.date);
    let dateToLocal = momentDate.local();
    let localDate = dateToLocal.format('DD/MM/YY');
    let localTime = dateToLocal.format('hh:mm:ss')
    const[senderName, setSenderName] = useState('')
    const[receiverName, setReceiverName] = useState('')
    const userValues = useContext(UserContext)
    const userId = userValues.accountInfo.userId;
    const userFullName = userValues.userFullName
    const [userToken, setUserToken] = useState((sessionStorage.getItem('token') || ''))
    const [dataSecondUser, setDataSecondUser] = useState({})
    const [cvu,setCvu] = useState('')
    const navigate = useNavigate();
    
    useEffect(()=>{
        
        if(sessionStorage.getItem('token')===null) {
            navigate("/")
        }
        /*
        if(transfer.senderId == userId) {
            setSenderName(userFullName)
            getReceiverUser(transfer.receiverId)
        } else {
            setReceiverName(userFullName)
            getSenderUser(transfer.senderId)
        }*/

            getSenderUser(transfer.senderId)
            getReceiverUser(transfer.receiverId)
    },[])


    const getReceiverUser = async(id) => {
        const url = `http://vps-4202860-x.dattaweb.com:8084/user/${id}`
        const settings = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        }

        const response = await fetch(url, settings)
        const data = await response.json()
        setDataSecondUser(data)
        setReceiverName(`${data.name} ${data.lastName}`)
        setCvu(data.cvu)
    }

    const getSenderUser = async(id) => {
        const url = `http://vps-4202860-x.dattaweb.com:8084/user/${id}`
        const settings = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        }

        const response = await fetch(url, settings)
        const data = await response.json()
        setDataSecondUser(data)
        setSenderName(`${data.name} ${data.lastName}`)
    }

    return(
        <section className={Styles.detailsSection}>
            <article className={Styles.detailsArticle}>
                <div className={Styles.detailsContainer}>
                    <p><span className={Styles.titleDetail}>Tipo de Transferencia:</span> Inmediata</p>
                    <p><span className={Styles.titleDetail}>Fecha:</span>{localDate}</p>
                    <p><span className={Styles.titleDetail}>Hora:</span> {localTime}</p>
                    <p><span className={Styles.titleDetail}>Importe:</span> ${transfer.amountOfMoney}</p>
                    <p><span className={Styles.titleDetail}>Nombre Originante:</span>{senderName}</p>
                    <p><span className={Styles.titleDetail}>Nombre Destinatario:</span>{receiverName}</p>
                    <p><span className={Styles.titleDetail}>Tipo de Cuenta Destino:</span> Cuenta Corriente en Pesos</p>
                    <p><span className={Styles.titleDetail}>Cuenta Destino:</span>{cvu}</p>
                    <p><span className={Styles.titleDetail}>Motivo:</span> VARIOS</p>
                    <p><span className={Styles.titleDetail}>Numero de Transacción:</span> 12345433</p>
                    <p><span className={Styles.titleDetail}>Canal:</span> Digital Money House Banking</p>
                </div>
                <div className={Styles.buttons}>
                    <Link className={Styles.detailsBtn} to="/all-transferences">Ver todas las transferencias</Link>
                    <Link className={Styles.detailsBtn} to="/home">Home</Link>
                </div>
            </article>
        </section>
    )
}