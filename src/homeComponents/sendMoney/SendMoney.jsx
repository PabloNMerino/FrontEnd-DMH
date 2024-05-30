import { Link } from 'react-router-dom'
import Styles from './SendMoneyStyle.module.css'

export const SendMoney = () => {

    return(
        <section className={Styles.sendMoneySection}>
            <article className={Styles.sendMoneyArticle}>
                <h3 className={Styles.title}>Enviar Dinero</h3>
                <form action="">
                    <div className={Styles.inputContainer}>
                        <label htmlFor="cvu">CVU o Alias</label>
                        <input type="text" id='cvu' />
                    </div>
                    <div className={Styles.inputContainer}>
                        <label htmlFor="amount">Monto</label>
                        <input type="number" id='amount'/>
                    </div>
                    <button className={Styles.btnSend}>Enviar Dinero</button>
                </form>
                <Link to="/home" className={Styles.atrasBtn}>Atras</Link>
            </article>
        </section>
    )
}