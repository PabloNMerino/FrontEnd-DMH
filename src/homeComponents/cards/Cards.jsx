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
            {
                cardList.map((card, index) => {
                    return(
                        <SingleCard {...card} key={index}/>
                    )
                })
            }
        </section>
    )
}