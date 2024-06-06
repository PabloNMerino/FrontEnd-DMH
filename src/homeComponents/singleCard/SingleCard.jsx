import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Styles from './SingleCardStyle.module.css'

export const SingleCard = (/*{id, holder, number, expirationDate, cvv}*/ props) => {

    const [userToken, setUserToken] = useState((sessionStorage.getItem('token') || ''))
    const navigate = useNavigate();
    const [isDeleted, setIsDeleted] = useState(false)


    const handleClick = () => {
        props.remove(props.number)
    }


    return(
        <article className={Styles.singleCardArticle}>
            <img src="src/assets/credit-card.png" alt="card" className={Styles.cardImg}/>
            <p>{props.holder}</p>
            <p>{props.number}</p>
            <p>Expiration: {props.expirationDate}</p>
            <p>CVV: {props.cvv}</p>
            <button className={Styles.deleteCard} onClick={(e) => handleClick(e)}>Borrar tarjeta</button>
        </article>
    )
}