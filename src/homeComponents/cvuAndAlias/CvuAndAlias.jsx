import { Link } from 'react-router-dom'
import Styles from './CvuAndAliasStyle.module.css'

export const CvuAndAlias = () => {

    return(
        <section className={Styles.cvuSection}>
            <article className={Styles.cvuArticle}>
                <h3>CVU y Alias</h3>
                    <div className={Styles.dataContainer}>
                        <p><span className={Styles.titleData}>CVU:</span> 1234123412341234123412</p>
                        <p><span className={Styles.titleData}>ALIAS:</span> RE.LOCO.EL.PIBE</p>
                    </div>
                <Link to="/update-alias" className={`${Styles.dataBtn} ${Styles.changeBtn}`}>Cambiar Alias</Link>
                <Link to="/home" className={Styles.dataBtn}>Home</Link>
            </article>
        </section>
    )
}