import { Link } from 'react-router-dom'
import Styles from './CurrentMoneyStyle.module.css'

export const CurrentMoney = () => {

    return(
        <article className={Styles.currentMoneyContainer}>
            <div className={Styles.availableMoney}>
                <p>Dinero disponible:</p>
                <p className={Styles.amount}>$32500</p>
            </div>
            <div className={Styles.buttons}>
                <Link className={Styles.linkInfo}>
                    <div className={Styles.btn}>
                        <p>Ver CVU y Alias</p>
                    </div>
                </Link>
                <Link className={Styles.linkInfo}>
                    <div className={Styles.btn}>
                        <p>Ingresar Dinero</p>
                    </div>
                </Link>
                <Link className={Styles.linkInfo}>
                    <div className={Styles.btn}>
                        <p>Enviar Dinero</p>
                    </div>
                </Link>
            </div>
        </article>
    )
}