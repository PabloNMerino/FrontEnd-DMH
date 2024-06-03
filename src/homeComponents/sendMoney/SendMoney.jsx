import { Link } from 'react-router-dom'
import Styles from './SendMoneyStyle.module.css'
import { useState } from 'react'

export const SendMoney = () => {

    const [cvuAlias, setCvuAlias] = useState("")
    const [amount, setAmount] = useState()
    const [errors, setErrors] = useState([])

    const handleCvuAliasChange = (e) => {
        setErrors([])
        setCvuAlias(e.target.value)
    }

    const handleAmountChange = (e) => {
        setErrors([])
        setAmount(e.target.value)
    }

    const validateRegisterForm = () => {
        const errors = [];

        if (cvuAlias.trim() === '') {
            errors.push('El CVU o Alias es obligatorio');
        } 
        if (amount==0 || amount==null) {
            errors.push('Ingrese un monto mayor a 0');
        }
        setErrors(errors);
        return errors.length;
    };

    const handleSend = (e) => {
        e.preventDefault(); 
        if(validateRegisterForm() === 0) {
            console.log("Envio exitoso");
        } else {
            console.log("hola");
        }
    }

    return(
        <section className={Styles.sendMoneySection}>
            <article className={Styles.sendMoneyArticle}>
                <h3 className={Styles.title}>Enviar Dinero</h3>
                <form action="">
                    <div className={Styles.inputContainer}>
                        <label htmlFor="cvu">CVU o Alias</label>
                        <input type="text" id='cvu' value={cvuAlias} onChange={(e) => handleCvuAliasChange(e)}/>
                    </div>
                    <div className={Styles.inputContainer}>
                        <label htmlFor="amount">Monto</label>
                        <input type="number" id='amount' value={amount} onChange={(e) => handleAmountChange(e)}/>
                    </div>
                    <button className={Styles.btnSend} type="submit" onClick={(e) => handleSend(e)}>Enviar Dinero</button>
                </form>
                {
                    errors.length>0? <div className={Styles.errorsContainer}>
                        {
                            errors.map((error, index) => {
                                return(
                                    <p className={Styles.errorMsg} key={index}>{error}</p>
                                )
                            })
                        }
                    </div> : <div></div>
                }
                <Link to="/home" className={Styles.atrasBtn}>Atras</Link>
            </article>
        </section>
    )
}