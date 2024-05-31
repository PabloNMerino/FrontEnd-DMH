import { Link } from 'react-router-dom'
import Styles from './ProfileStyle.module.css'

export const Profile = () => {

    return(
        <section className={Styles.profileSection}>
            <article className={Styles.profileArticle}>
                <h3>Informacion de Usuario</h3>
                <div className={Styles.infoBtnContainer}>
                    <div className={Styles.infoBox}>
                        <img src="src\assets\usuario.png" alt="user" />
                        <p><span>Nombre y Apellido: </span> Pablo Nicolas Merino</p>
                        <p><span>Username: </span> PabloNM07</p>
                        <p><span>Email: </span> pablonicolasm@hotmail.com</p>
                        <p><span>Telefono: </span> 3794845796</p>
                    </div>
                    <div className={Styles.btns}>
                        <Link className={Styles.updateLink} to="/update-profile">Actualizar Informacion</Link>
                        <Link className={Styles.updateLink} to="/update-password">Cambiar Contraseña</Link>
                    </div>
                </div>
                <Link to="/home" className={Styles.dataBtn}>Atras</Link>
            </article>
        </section>
    )
}