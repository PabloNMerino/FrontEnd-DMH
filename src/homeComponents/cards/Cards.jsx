import { Link } from 'react-router-dom'
import { SingleCard } from '../singleCard/SingleCard'
import Styles from './CardsStyle.module.css'

export const Cards = () => {

    const cardList = [
        {
            id: 1,
            holder: "Pablo Merino",
            number: "1234 1234 1234 1234",
            expirationDate: "17-11-2024",
            cvv: "123"
        },
        {
            id: 2,
            holder: "Pablo Nicolás Merino",
            number: "5678 5678 5678 5678",
            expirationDate: "03-05-2028",
            cvv: "456"
        },
        {
            id: 3,
            holder: "Pablo Nicolás Merino",
            number: "9012 9012 9012 9012",
            expirationDate: "10-10-2029",
            cvv: "789"
        }
    ]

    return(
        <section className={Styles.cardsSection}>
            <article className={Styles.cardsArticle}>
                <div>
                    <Link className={Styles.returnHomeTop}to='/home'>Volver a home</Link>
                    <div className={Styles.cardsContainer}>
                        {
                            cardList.map((card, index) => {
                                return(
                                    <SingleCard {...card} key={index}/>
                                )
                            })
                        }
                    </div>
                </div>
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