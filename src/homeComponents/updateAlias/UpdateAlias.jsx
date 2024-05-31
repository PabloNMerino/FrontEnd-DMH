import { Link } from 'react-router-dom'
import Styles from './UpdateAliasStyle.module.css'

export const UpdateAlias = () => {

    return(
        <section className={Styles.updateAliasSection}>
            <article className={Styles.updateAliasArticle}>
                <h3>Cambiar Alias</h3>
                <img src="src/assets/alias.png" alt="alias" />
                <form action="">
                    <div className={Styles.inputBox}>
                        <label htmlFor="alias">Nuevo Alias</label>
                        <input type="text" />
                    </div>
                    <button className={Styles.updateBtn}>Actualizar</button>
                </form>
                <Link to="/account-information" className={Styles.atrasBtn}>Atras</Link>
            </article>
        </section>
    )
}