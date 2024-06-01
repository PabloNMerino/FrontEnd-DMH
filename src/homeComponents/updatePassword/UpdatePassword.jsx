import { Link } from 'react-router-dom'
import Styles from './UpdatePasswordStyle.module.css'
import { useState } from 'react'

export const UpdatePassword = () => {

    const [updPassword, setUpdPassword] = useState({
        password:"",
        passwordRepeated:"",
    })

    const [errors, setErrors] = useState([])

    const handlePasswordChange = (e) => {
        setErrors([])
        setUpdPassword({...updPassword, password: e.target.value})
    }

    const handlePasswordRepeatedChange = (e) => {
        setErrors([])
        setUpdPassword({...updPassword, passwordRepeated: e.target.value})
    }

    const validateUpdateForm = () => {
        const errors = [];

        if (updPassword.password.trim() === '') {
            errors.push('No olvides ingresar contraseña');
        } else if (updPassword.password.length < 4 || updPassword.password.length > 15) {
            errors.push('La contraseña debe contener entre 4 y 15 caracteres');
        }

        if (updPassword.passwordRepeated.trim() === '') {
            errors.push('No olvides repetir contraseña');
        } else if(updPassword.password != updPassword.passwordRepeated) {
            errors.push('Ingrese contraseñas iguales')
        }
        
        setErrors(errors);
        return errors.length;
    };

    const handleUpdate = (e) => {
        e.preventDefault(); 
        if(validateUpdateForm() === 0) {
            console.log("Actualizacion exitosa");
        } else {
            console.log('hola');
        }
    }

    return(
        <section className={Styles.updatePasswordSection}>
            <article className={Styles.updatePasswordArticle}>
                <h3>Actualizar Contraseña</h3>
                <img src="src/assets/sistema-de-seguridad.png" alt="update password" />
                <form action="">
                    <div className={Styles.inputContainer}>
                        <label htmlFor="pass">Nueva Contraseña</label>
                        <input type="password" id='pass' value={updPassword.password} onChange={(e) => handlePasswordChange(e)}/>
                    </div>
                    <div className={Styles.inputContainer}>
                        <label htmlFor="reppass">Repita Contraseña</label>
                        <input type="password" id='reppass'value={updPassword.passwordRepeated} onChange={(e) => handlePasswordRepeatedChange(e)}/>
                    </div>
                    <button className={Styles.updateBtn} type='submit' onClick={(e) => handleUpdate(e)}>Actualizar</button>
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
                <Link to="/profile" className={Styles.atrasBtn}>Atras</Link>
            </article>
        </section>
    )
}