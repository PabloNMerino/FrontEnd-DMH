import { Link } from 'react-router-dom'
import Styles from './TransferDetailsStyle.module.css'

export const TransferDetails = () => {

    return(
        <section className={Styles.detailsSection}>
            <article className={Styles.detailsArticle}>
                <div className={Styles.detailsContainer}>
                    <p><span className={Styles.titleDetail}>Tipo de Transferencia:</span> Inmediata</p>
                    <p><span className={Styles.titleDetail}>Fecha:</span> 20/09/2024</p>
                    <p><span className={Styles.titleDetail}>Hora:</span> 13:41:40</p>
                    <p><span className={Styles.titleDetail}>Importe:</span> $1350.50</p>
                    <p><span className={Styles.titleDetail}>Nombre Originante:</span> Pablo Merino</p>
                    <p><span className={Styles.titleDetail}>Nombre Destinatario:</span> Dafni Vamvakianos</p>
                    <p><span className={Styles.titleDetail}>Tipo de Cuenta Destino:</span> Cuenta Corriente en Pesos</p>
                    <p><span className={Styles.titleDetail}>Cuenta Destino:</span> 1234123412341234123412</p>
                    <p><span className={Styles.titleDetail}>Motivo:</span> VARIOS</p>
                    <p><span className={Styles.titleDetail}>Numero de Transacción:</span> 12345433</p>
                    <p><span className={Styles.titleDetail}>Canal:</span> Digital Money House Banking</p>
                </div>
                <div className={Styles.buttons}>
                    <Link className={Styles.detailsBtn} to="/all-transferences">Ver todas las transferencias</Link>
                    <Link className={Styles.detailsBtn} to="/home">Home</Link>
                </div>
            </article>
        </section>
    )
}