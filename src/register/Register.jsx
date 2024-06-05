import { Link } from 'react-router-dom';
import Styles from './RegisterStyle.module.css'
import { useEffect, useState } from 'react'
import { Oval } from 'react-loader-spinner'

export const Register = () => {

    const [user, setUser] = useState({name: "", lastName:"", username:"", email:"", phoneNumber:"", password:"", passwordRepeated:""});
    const [errors, setErrors] = useState([])
    const [responseError, setResponseError] = useState(false)
    const [disableBtn, setDisableBtn] = useState(false)
    const [existingUser, setExistingUser] = useState(false)
    const [status, setStatus] = useState(0)
    const [loading, setLoading] = useState(false)

    const handleNameChange = (e) => {
        setResponseError(false)
        setErrors([])
        setDisableBtn(false)
        setUser({...user, name: e.target.value})
    }

    const handleLastNameChange = (e) => {
        setResponseError(false)
        setErrors([])
        setDisableBtn(false)
        setUser({...user, lastName: e.target.value})
    }

    const handleUsernameChange = (e) => {
        setResponseError(false)
        setErrors([])
        setDisableBtn(false)
        setUser({...user, username: e.target.value})
    }
    
    const handleMailChange = (e) => {
        setResponseError(false)
        setErrors([])
        setDisableBtn(false)
        setUser({...user, email: e.target.value})
    }

    const handlePhoneChange = (e) => {
        setResponseError(false)
        setErrors([])
        setDisableBtn(false)
        setUser({...user, phoneNumber: e.target.value})
    }

    const handlePasswordChange = (e) => {
        setResponseError(false)
        setErrors([])
        setDisableBtn(false)
        setUser({...user, password: e.target.value})
    }

    const handlePasswordRepeatedChange = (e) => {
        setResponseError(false)
        setErrors([])
        setDisableBtn(false)
        setUser({...user, passwordRepeated: e.target.value})
    }

    const validateRegisterForm = () => {
        const errors = [];

        if (user.name.trim() === '') {
            errors.push('El nombre es obligatorio');
        } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(user.name)) {
            errors.push('El nombre es inválido');
        } else if(user.name.length<4) {
            errors.push('El nombre es inválido');
        }

        if (user.lastName.trim() === '') {
            errors.push('El apellido es obligatorio');
        } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(user.lastName)) {
            errors.push('El apellido es inválido');
        } else if(user.lastName.length<4) {
            errors.push('El apellido es inválido');
        }

        if (user.username.trim() === '') {
            errors.push('El username es obligatorio');
        } else if (!/^[a-zA-Z][a-zA-Z0-9._]{2,15}$/.test(user.username)) {
            errors.push('El username es inválido');
        } else if(user.username.length<4) {
            errors.push('El username es inválido');
        }

        if (user.email.trim() === '') {
            errors.push('El correo electrónico es obligatorio');
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            errors.push('El correo electrónico es inválido');
        }

        if (user.phoneNumber.trim() === '') {
            errors.push('El numero telefonico es obligatorio');
        }

        if (user.password.trim() === '') {
            errors.push('No olvides ingresar contraseña');
        } else if (user.password.length < 4 || user.password.length > 15) {
            errors.push('La contraseña debe contener entre 4 y 15 caracteres');
        }

        if (user.passwordRepeated.trim() === '') {
            errors.push('No olvides repetir la contraseña');
        } else if (user.passwordRepeated != user.password) {
            errors.push('Ingrese contraseñas iguales');
        }
        
        setErrors(errors);
        return errors.length;
    };

    const DynamicLetter = ({ status }) => {
        if (status === 201) {
          return (
            <div className={`${Styles.msgBox} ${Styles.success}`}>
              <p>Registro exitoso! verifique su correo electronico en su casilla de email para poder <Link to="/login">Loguearse</Link></p>
            </div>
          );
        } else {
            return (
                <button className={Styles.registerBtn} type="submit" onClick={(e) => handleRegister(e)}>Registrarse</button>
              );
        }

      };


    const url = "http://localhost:8084/user/register"

    const handleRegister = (e) => {
        e.preventDefault(); 
        
        if(validateRegisterForm() === 0) {
            setLoading(true)

            const userRegistration = {
                name: user.name,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                phoneNumber: user.phoneNumber,
                password: user.password
            }

            const settings = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userRegistration)
            }

            fetch(url, settings)
                .then(response => {
                    setStatus(response.status)
                    if(response.status===201) {
                        console.log("Registro exitoso");
                        setLoading(false)
                    } else if(response.status===400) {
                        console.log("error - usuario existente");
                        setExistingUser(true)
                        setLoading(false)
                    } 
                })
        }
    }


    return(
        <section className={Styles.registerSection}>
            <h1 className={Styles.title}>Register</h1>
            <form action="">
                <div className={Styles.inputFields}>
                    <div>
                        <div className={Styles.inputContainer}>
                            <label htmlFor="name">First Name</label>
                            <input type="text" id='name' required value={user.name} onChange={(e) => handleNameChange(e)} />
                        </div>
                        <div className={Styles.inputContainer}>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id='lastName' required value={user.lastName} onChange={(e) => handleLastNameChange(e)} />
                        </div>
                        <div className={Styles.inputContainer}>
                            <label htmlFor="username">Username</label>
                            <input type="text" id='username' requiredvalue={user.username} onChange={(e) => handleUsernameChange(e)} />
                        </div>
                        <div className={Styles.inputContainer}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id='email' required value={user.email} onChange={(e) => handleMailChange(e)} />
                        </div>
                    </div>
                    <div>
                        <div className={Styles.inputContainer}>
                            <label htmlFor="number">Phone Number</label>
                            <input type="tel" id='number' required value={user.phoneNumber} onChange={(e) => handlePhoneChange(e)} />
                        </div>
                        <div className={Styles.inputContainer}>
                            <label htmlFor="password">Password</label>
                            <input type="password" id='password' required value={user.password} onChange={(e) => handlePasswordChange(e)} />
                        </div>
                        <div className={Styles.inputContainer}>
                            <label htmlFor="passwordRepeated">Repeat Password</label>
                            <input type="password" id='passwordRepeated' required value={user.passwordRepeated} onChange={(e) => handlePasswordRepeatedChange(e)} />
                        </div>
                    </div>
                </div>
                {
                    !loading? <DynamicLetter status={status}/> : <div className={Styles.loader}><Oval
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
            </form>
            {
                existingUser?             <div className={`${Styles.msgBox} ${Styles.failBb}`}>
                <p>El username o email ya se encuentra ocupado</p>
              </div> : <div></div>
            }
        </section>
    )
}