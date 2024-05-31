import { Link } from 'react-router-dom'
import Styles from './UpdateProfileStyle.module.css'

export const UpdateProfile = () => {

    return(
        <section className={Styles.updateInfoSection}>
            <article className={Styles.updateInfoArticle}>
                <h3>Actualizar Información</h3>
                <img src="src/assets/actualizar.png" alt="update user" />
                <form action="">
                    <div className={Styles.inputContainer}>
                        <label htmlFor="name">Nombre</label>
                        <input type="text" />
                    </div>
                    <div className={Styles.inputContainer}>
                        <label htmlFor="lastname">Apellido</label>
                        <input type="text" />
                    </div>
                    <div className={Styles.inputContainer}>
                        <label htmlFor="email">Email</label>
                        <input type="email" />
                    </div>
                    <div className={Styles.inputContainer}>
                        <label htmlFor="">Telefono</label>
                        <input type="tel" />
                    </div>
                    <button className={Styles.updateBtn}>Actualizar</button>
                </form>
                <Link to="/profile" className={Styles.atrasBtn}>Atras</Link>
            </article>
        </section>
    )
}