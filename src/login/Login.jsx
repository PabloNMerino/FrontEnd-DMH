import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Styles from './LoginStyle.module.css'
import { Oval } from 'react-loader-spinner'

export const Login = () => {


    const [user, setUser] = useState({email: "", password:""});
    const [errors, setErrors] = useState([])
    const [responseError, setResponseError] = useState(false)
    const [disableBtn, setDisableBtn] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const[logError, setLogError] = useState(false)

    useEffect(()=>{
        if(sessionStorage.getItem('token')!==null) {
            sessionStorage.removeItem('token')
        }
    },[])


    const handleMailChange = (e) => {
        setResponseError(false)
        setErrors([])
        setDisableBtn(false)
        setLogError(false)
        setUser({...user, email: e.target.value})
    }

    const handlePasswordChange = (e) => {
        setResponseError(false)
        setErrors([])
        setDisableBtn(false)
        setLogError(false)
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

        const userLogin = {
            email: user.email,
            password: user.password
        }

        const settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userLogin)
        }

        const url = "http://localhost:8084/user/login"

        if(validateLoginForm() === 0) {
            setLoading(true)

            fetch(url, settings)
                .then(response => {
                    if(response.status==200) {
                        setLoading(false)
                        return response.json()
                    } else if (response.status==500) {
                        setLoading(false)
                        setLogError(true)
                    }
                })
                .then(data => {
                    if(data.access_token!=null) {
                        sessionStorage.setItem('token', data.access_token)
                        navigate("/home")
                    }   
                })

            
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
                {
                    !loading? <button className={Styles.loginBtn} type="submit" disabled={disableBtn} onClick={(e) => handleLogin(e)} >Iniciar sesion</button> : <div className={Styles.loader}><Oval
                    visible={true}
                    height="50"
                    width="50"
                    color="#4fa94d"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    /></div>
                }
                
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
                {
                    logError?  <div className={`${Styles.msgBox} ${Styles.success}`}>
                    <p>Revise que la informacion sea correcta y que su email se encuentre verificado</p>
                  </div> : <div></div>
                }
            </form>
        </section>
    )
}