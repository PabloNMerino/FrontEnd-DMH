import Styles from './SingleCardStyle.module.css'

export const SingleCard = ({id, holder, number, expirationDate, cvv}) => {


    return(
        <article className={Styles.singleCardArticle}>
            <img src="src/assets/credit-card.png" alt="card" className={Styles.cardImg}/>
            <p>{holder}</p>
            <p>{number}</p>
            <p>Expiration: {expirationDate}</p>
            <p>CVV: {cvv}</p>
        </article>
    )
}