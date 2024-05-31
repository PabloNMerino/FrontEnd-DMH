import { useState } from 'react'
import Styles from './RegisterCardStyle.module.css'
import { Link } from 'react-router-dom'

export const RegisterCard = () => {

    const [expDate, setExpDate] = useState('')

    const handleDateChange = (e) => {
        let value = e.target.value;
        if(expDate.length==1 && !value.endsWith('/')) {
            value+="/";
        }

        setExpDate(value)
    }

    return(
        <section className={Styles.registerSection}>
            <article className={Styles.registerArticle}>
                <h3 className={Styles.registerTitle}>Registrar Tarjeta Nueva</h3>
                <div>
                    <img src="src/assets/atm-card.png" alt="new card" className={Styles.newImg} />
                    <form action="">
                        <div className={Styles.formInput}>
                            <label htmlFor="holder">Nombre y Apellido</label>
                            <input type="text" />
                        </div>
                        <div className={Styles.formInput}>
                            <label htmlFor="holder">Number</label>
                            <input type="number" />
                        </div>
                        <div className={Styles.formInput}>
                            <label htmlFor="holder">Fecha de expiracion</label>
                            <input type="text" value={expDate} onChange={handleDateChange} maxLength="5"/>
                        </div>
                        <div className={`${Styles.formInput} ${Styles.cvv}`}>
                            <label htmlFor="holder">CVV</label>
                            <input type="number" />
                        </div>
                    </form>
                </div>
                <button className={Styles.registerBtn}>Registrar Tarjeta</button>
                <Link to="/cards" className={Styles.atrasBtn}>Atras</Link>
            </article>
        </section>
    )
}