import { useState } from 'react'
import Styles from './LoginStyle.module.css'

export const Login = () => {


    const [user, setUser] = useState({email: "", password:""});
    const [errors, setErrors] = useState([])
    const [responseError, setResponseError] = useState(false)
    const [disableBtn, setDisableBtn] = useState(false)

    const handleMailChange = (e) => {
        setResponseError(false)
        setErrors([])
        setDisableBtn(false)
        setUser({...user, email: e.target.value})
    }

    const handlePasswordChange = (e) => {
        setResponseError(false)
        setErrors([])
        setDisableBtn(false)
        setUser({...user, password: e.target.value})
    }

 
    const validateLoginForm = () => {
        const errors = [];

        if (user.email.trim() === '') {
            errors.push('El correo electrónico es obligatorio');
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            errors.push('El correo electrónico es inválido');
        }

        if (user.password.trim() === '') {
            errors.push('No olvides ingresar contraseña');
        } else if (user.password.length < 4 || user.password.length > 15) {
            errors.push('La contraseña debe contener entre 4 y 15 caracteres');
        }
        setErrors(errors);
        return errors.length;
    };

    const handleLogin = (e) => {
        e.preventDefault(); 
        if(validateLoginForm() === 0) {
            console.log("login exitoso");
        }
        setDisableBtn(true)
    }



    return(
        <section className={Styles.loginSection}>
            <h1 className={Styles.title}>Login</h1>
            <form action="">
                <div className={Styles.inputContainer}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' required value={user.email} onChange={(e) => handleMailChange(e)} />
                </div>
                <div className={Styles.inputContainer}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' required value={user.password} onChange={(e) => handlePasswordChange(e)} />
                </div>
                <button className={Styles.loginBtn} type="submit" disabled={disableBtn} onClick={(e) => handleLogin(e)} >Iniciar sesion</button>
                {
                    errors.length>0? <div>
                        {
                            errors.map((error, index) => {
                                return(
                                    <p className={Styles.errorMsg} key={index}>{error}</p>
                                )
                            })
                        }
                    </div> : <div></div>
                }
            </form>
        </section>
    )
}