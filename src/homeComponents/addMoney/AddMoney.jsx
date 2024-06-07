import { useEffect, useState } from 'react';
import Styles from './AddMoneyStyle.module.css'
import { Link } from 'react-router-dom';

export const AddMoney = () => {

    const [cardNumber, setCardNumber] = useState('');
    const [amount, setAmount] = useState();
    const [error, setError] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [cardList, setCardList] = useState([])
    const [userToken, setUserToken] = useState((sessionStorage.getItem('token') || ''))
    const [successMsg, setSuccessMsg] = useState(false)


    const getCards = async() => {
        const url="http://localhost:8084/account/cards"
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

    useEffect(()=>{
        if(cardList.length==0){
            getCards();
        }
    },[])

    const applyCard = (cardNumber, index) => {
        setActiveIndex(index)
        setCardNumber(cardNumber)
    }

    const handleAmountChange = (e) => {
        setError(false)
        setSuccessMsg(false)
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
            const depositBody = {
                cardNumber,
                amount
            }
            const url = "http://localhost:8084/account/deposit"
            const settings = {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify(depositBody),
            }

            fetch(url, settings)
            setSuccessMsg(true)
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
                        cardList.length==0? <div className={Styles.noCardMsg}>Registre una tarjeta para poder ingresar dinero</div> : 
                        <div>
                    {
                        cardList.map((card, index) => {
                            return(
                                <div key={index} className={`${Styles.cardContainer} ${activeIndex==index? `${Styles.selected}`:`${Styles.notSelected}`}`} onClick={()=>applyCard(card.number, index)} >
                                    <img src="src/assets/credit-card.png" alt="card" className={Styles.card} />
                                    <p>{card.number}</p>
                                    <p>{card.expirationDate}</p>
                                </div>
                            )
                        })
                    }
                    </div>
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
                 {
                    successMsg? <div className={Styles.errorsContainer}>
                                <p className={Styles.successMsg}>Operacion exitosa</p>
                            </div> : <div></div>
                }
                <Link to="/home" className={Styles.atrasBtn}>Atras</Link>
            </article>
        </section>
    )
}