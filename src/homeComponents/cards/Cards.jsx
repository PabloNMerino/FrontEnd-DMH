import { Link, useNavigate } from 'react-router-dom'
import { SingleCard } from '../singleCard/SingleCard'
import Styles from './CardsStyle.module.css'
import { useEffect, useState } from 'react'

export const Cards = () => {

    const [cardList, setCardList] = useState([])
    const [userToken, setUserToken] = useState((sessionStorage.getItem('token') || ''))
    const navigate = useNavigate();

    useEffect(()=>{

        if(sessionStorage.getItem('token')===null) {
            navigate("/")
        }
        
        if(cardList.length==0) {
            getCards()
        }
    },[])


    const getCards = async() => {

        const url = "http://vps-4202860-x.dattaweb.com:8084/account/cards"

        const settings = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
        }

        fetch(url, settings)
            .then(response => response.json())
            .then(data => setCardList(data))
    }

    const removeCard = (number) => {
        const url = `http://vps-4202860-x.dattaweb.com:8084/account/delete-card/${number}`
        const settings = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
        }

        fetch(url, settings)
            .then(response => {
                setCardList(cardList.filter(card => card.number !== number))
            })
    }



    return(
        <section className={Styles.cardsSection}>
            <article className={Styles.cardsArticle}>
                <div>
                    <Link className={Styles.returnHomeTop}to='/home'>Volver a home</Link>
                    <div className={Styles.cardsContainer}>
                        {
                            cardList.map((card, index) => {
                                return(
                                    <SingleCard {...card} key={index} remove={removeCard}/>
                                )
                            })
                        }
                    </div>
                </div>
                {
                    cardList.length==0? <div className={Styles.noCardMsg}>No tiene tarjetas asociadas</div> : <div></div>
                }
                <Link to="/register-card">
                    <div className={Styles.plusBtn}>
                            <img src="src/assets/boton-mas.png" alt="mas" />
                    </div>
                </Link>
                <Link className={Styles.returnHomeBottom}to='/home'>Volver a home</Link>
            </article>
        </section>
    )
}