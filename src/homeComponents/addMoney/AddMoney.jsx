import { useState } from 'react';
import Styles from './AddMoneyStyle.module.css'
import { Link } from 'react-router-dom';

export const AddMoney = () => {

    const [cardId, setCardId] = useState();
    const [amount, setAmount] = useState();
    const [error, setError] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

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

    const applyCard = (cardId, index) => {
        setActiveIndex(index)
        setCardId(cardId)
    }

    const handleAmountChange = (e) => {
        setError(false)
        setAmount(e.target.value)
    }

    const validateForm = () => {
        let error = false;

        if (amount==0 || amount==null) {
            error = true;
        }

        setError(error);
        return error;
    };

    const handleForm = (e) => {
        e.preventDefault(); 
        if(!validateForm()) {
            console.log("Actualizacion exitosa");
        } else {
            console.log('hola');
        }
    }

    return(
        <section className={Styles.addMoneySection}>
            <article className={Styles.addMoneyArticle}>
                <h3 className={Styles.title}>Ingresar Dinero</h3>
                <div className={Styles.cards}>
                    <p className={Styles.chooseCardText}>Elija la tarjeta: </p>
                    {
                        cardList.map((card, index) => {
                            return(
                                <div key={index} className={`${Styles.cardContainer} ${activeIndex==index? `${Styles.selected}`:`${Styles.notSelected}`}`} onClick={()=>applyCard(card.id, index)} >
                                    <img src="src/assets/credit-card.png" alt="card" className={Styles.card} />
                                    <p>{card.number}</p>
                                    <p>{card.expirationDate}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <form action="">
                    <div className={Styles.inputBox}>
                        <label htmlFor="amount">Ingrese Monto</label>
                        <input type="number" id='amount' value={amount} onChange={(e) => handleAmountChange(e)}/>
                    </div>
                </form>
                <button className={Styles.addMoneyBtn} type='submit' onClick={(e) => handleForm(e)}>Ingresar Dinero</button>
                {
                    error? <div className={Styles.errorsContainer}>
                                <p className={Styles.errorMsg}>Ingrese Monto</p>
                            </div> : <div></div>
                }
                <Link to="/home" className={Styles.atrasBtn}>Atras</Link>
            </article>
        </section>
    )
}