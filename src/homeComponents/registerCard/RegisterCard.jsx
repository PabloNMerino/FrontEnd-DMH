import { useEffect, useState } from 'react'
import Styles from './RegisterCardStyle.module.css'
import { Link } from 'react-router-dom'

export const RegisterCard = () => {


    const [holder, setHolder] = useState('')
    const [number, setNumber] = useState("")
    const [expDate, setExpDate] = useState()
    const [cvv, setCvv] = useState('')
    const [errors, setErrors] = useState([])
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')

    const handleHolderChange = (e) => {
        setErrors([])
        setHolder(e.target.value)
    }

    const handleNumberChange = (e) => {
        setErrors([])
        setNumber(e.target.value)
    }

    const handleDateChange = (e) => {
        setErrors([])
        setExpDate(e.target.value)
        let value = e.target.value;
        if(value) {
            const [selectedYear, selectedMonth] = value.split('-');
            setMonth(selectedMonth);
            setYear(selectedYear);
        }
    }

    const handleCvvChange = (e) => {
        setErrors([])
        setCvv(e.target.value)
    }

    const validateRegisterForm = () => {
        const errors = [];
        let actualDate = new Date();
        let actualMonth = actualDate.getMonth()+1;
        let actualYear = actualDate.getFullYear();

        if (holder.trim() === '') {
            errors.push('El nombre es obligatorio');
        } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(holder)) {
            errors.push('El nombre es inválido');
        } else if(holder.length<4) {
            errors.push('El nombre es inválido');
        }

        if(!/^[0-9]+$/.test(number)) {
            errors.push('El numero nu puede contener letras');
        } else if(number.length<16) {
            errors.push('El numero debe ser de 16 digitos');
        } else if(number.trim()==='') {
            errors.push('Ingrese Numero');
        }

        if(expDate==undefined) {
            errors.push('Ingrese fecha de expiracion');
        } else if(year<actualYear || (year==actualYear && month<actualMonth) ) {
            errors.push('Ingrese una fecha en el futuro');
        }

        if(cvv.length<3) {
            errors.push('El CVV debe ser de 3 digitos');
        } else if(number.trim()==='') {
            errors.push('Ingrese CVV');
        }

        setErrors(errors);
        return errors.length;
    };

    const handleRegister = (e) => {
        e.preventDefault(); 
        if(validateRegisterForm() === 0) {
            console.log("registro exitoso");
        } else {
            console.log("hola");
        }
    }

    return(
        <section className={Styles.registerSection}>
            <article className={Styles.registerArticle}>
                <h3 className={Styles.registerTitle}>Registrar Tarjeta Nueva</h3>
                <div>
                    <img src="src/assets/atm-card.png" alt="new card" className={Styles.newImg} />
                    <form action="">
                        <div className={Styles.formInput}>
                            <label htmlFor="holder">Nombre y Apellido</label>
                            <input type="text" id='holder' value={holder} onChange={(e) => handleHolderChange(e)}/>
                        </div>
                        <div className={Styles.formInput}>
                            <label htmlFor="number">Number</label>
                            <input type="text" id='number' value={number} onChange={(e) => handleNumberChange(e)} minlength="16" maxlength="16"/>
                        </div>
                        <div className={Styles.formInput}>
                            <label htmlFor="expDate">Fecha de expiracion</label>
                            <input type="month" id="expDate" value={expDate} onChange={(e) => handleDateChange(e)}/>
                        </div>
                        <div className={`${Styles.formInput} ${Styles.cvv}`}>
                            <label htmlFor="cvv">CVV</label>
                            <input type="text" id='cvv' value={cvv} onChange={(e) => handleCvvChange(e)} minlength="3" maxlength="3"/>
                        </div>
                    </form>
                </div>
                <button className={Styles.registerBtn} type="submit" onClick={(e) => handleRegister(e)}>Registrar Tarjeta</button>
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
                <Link to="/cards" className={Styles.atrasBtn}>Atras</Link>
            </article>
        </section>
    )
}