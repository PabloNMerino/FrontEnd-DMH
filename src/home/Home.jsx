import { CurrentMoney } from '../homeComponents/currentMoney/CurrentMoney'
import { HomeActivity } from '../homeComponents/homeActivity/HomeActivity'
import Styles from './HomeStyle.module.css'

export const Home = () => {

    return(
        <section className={Styles.homeSection}>
            <div>
                <article className={Styles.homeHeader}>
                    <p className={Styles.logo}>DMH</p>
                    <div className={Styles.iconAndNameContainer}>
                        <div className={Styles.iconName}><p>PM</p></div>
                        <span>Hola!, </span><span className={Styles.userName}>Pablo Nicolás Merino</span>
                    </div>
                    <div className={Styles.verPerfilBtn}>
                        <p>Ver Perfil</p>
                    </div>
                </article>
                <CurrentMoney/>
                <article className={Styles.cardsContainer}>
                    <p>Ver tarjetas asociadas</p>
                </article>
            </div>
            <div>
                <HomeActivity/>
            </div>
        </section>
    )
}