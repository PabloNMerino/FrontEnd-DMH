import Styles from './BodyStyle.module.css';
import { Link } from "react-router-dom";

export const Body = () => {

    return(
        <main>
            <p className={Styles.icondmh}>DMH</p> 

            <div className={Styles.buttons}>
                <ul>
                    <li><Link to="/login" className={Styles.button}>Login</Link></li>
                    <li><Link to="/register" className={Styles.button}>Register</Link></li>   
                </ul>
            </div>
            {/*
                isLogged ? <p>Hola</p> : <p>chau</p>
    */}
        </main>
    )
}