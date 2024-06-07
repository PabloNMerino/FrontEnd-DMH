import { Link } from 'react-router-dom'
import Styles from './SendMoneyStyle.module.css'
import { useEffect, useState } from 'react'

export const SendMoney = () => {

    const [cvuAlias, setCvuAlias] = useState("")
    const [amount, setAmount] = useState()
    const [errors, setErrors] = useState([])
    const [userToken, setUserToken] = useState((sessionStorage.getItem('token') || ''))
    const [responseStatus, setResponseStatus] = useState(0)
    const [amountAvailable, setAmountAvailable] = useState()

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

    const setRestart = () => {
        setResponseStatus(0)
    }

    const DynamicLetter = ({ status }) => {
        if (status == 200) {
          return (
            <div className={`${Styles.msgBox} ${Styles.success}`}>
              <p>Dinero enviado exitosamente, <span onClick={()=>setRestart()} className={Styles.tryAgain}>hacer otra transferencia</span></p>
            </div>
          );
        } else if(status===400){
            return (
                <div className={`${Styles.msgBox} ${Styles.failBb}`}>
                  <p>El monto indicado excede el de la cuenta, <span onClick={()=>setRestart()} className={Styles.tryAgain}>intentar nuevamente</span></p>
                </div>
              );
        } else if(status===404){
            return (
                <div className={`${Styles.msgBox} ${Styles.failBb}`}>
                  <p>No existe el alias o CVU indicado, <span onClick={()=>setRestart()} className={Styles.tryAgain}>intentar nuevamente</span></p>
                </div>
              );
        }else {
            return (
                <button className={Styles.btnSend} type="submit" onClick={(e) => handleSend(e)}>Enviar Dinero</button>
              );
        }

      };


    const handleSend = (e) => {
        e.preventDefault(); 
        if(validateRegisterForm() === 0) {
            const url = "http://localhost:8084/account/send-money"

            const sendBody = {
                destinyAccount: cvuAlias,
                amount
            }

            const settings = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify(sendBody),
            }

            fetch(url, settings)
                .then(response => setResponseStatus(response.status))

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
                <DynamicLetter status={responseStatus} />
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