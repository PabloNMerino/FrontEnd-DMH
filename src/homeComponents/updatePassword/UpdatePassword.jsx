import { Link } from 'react-router-dom'
import Styles from './UpdatePasswordStyle.module.css'

export const UpdatePassword = () => {

    return(
        <section className={Styles.updatePasswordSection}>
            <article className={Styles.updatePasswordArticle}>
                <h3>Actualizar Contraseña</h3>
                <img src="src/assets/sistema-de-seguridad.png" alt="update password" />
                <form action="">
                    <div className={Styles.inputContainer}>
                        <label htmlFor="pass">Nueva Contraseña</label>
                        <input type="password" id='pass'/>
                    </div>
                    <div className={Styles.inputContainer}>
                        <label htmlFor="reppass">Repita Contraseña</label>
                        <input type="password" id='reppass'/>
                    </div>
                    <button className={Styles.updateBtn}>Actualizar</button>
                </form>
                <Link to="/profile" className={Styles.atrasBtn}>Atras</Link>
            </article>
        </section>
    )
}