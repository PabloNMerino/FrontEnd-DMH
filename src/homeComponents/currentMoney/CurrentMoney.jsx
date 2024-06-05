import { Link } from 'react-router-dom'
import Styles from './CurrentMoneyStyle.module.css'

export const CurrentMoney = ({ amount }) => {



    return(
        <article className={Styles.currentMoneyContainer}>
            <div className={Styles.availableMoney}>
                <p>Dinero disponible:</p>
                <p className={Styles.amount}>${amount}</p>
            </div>
            <div className={Styles.buttons}>
                <Link className={Styles.linkInfo} to='/account-information'>
                    <div className={Styles.btn}>
                        <p>Ver CVU y Alias</p>
                    </div>
                </Link>
                <Link className={Styles.linkInfo} to='/add-money'>
                    <div className={Styles.btn}>
                        <p>Ingresar Dinero</p>
                    </div>
                </Link>
                <Link className={Styles.linkInfo} to='/send-money'>
                    <div className={Styles.btn}>
                        <p>Enviar Dinero</p>
                    </div>
                </Link>
            </div>
        </article>
    )
}