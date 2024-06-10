import { Link, useNavigate } from 'react-router-dom'
import Styles from './UpdateProfileStyle.module.css'
import { useEffect, useState } from 'react'
import { Oval } from 'react-loader-spinner'

export const UpdateProfile = () => {

    const [userUpdate, setUserUpdate] = useState({
        name:"",
        lastName:"",
        email:"",
        phoneNumber:""
    })
    const [username, setUsername] = useState('')
    const [userId, setUserId] = useState()
    const [errors, setErrors] = useState([])
    const [userToken, setUserToken] = useState((sessionStorage.getItem('token') || ''))
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(0)
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setErrors([])
        setUserUpdate({...userUpdate, name: e.target.value})
    }

    const handleLastNameChange = (e) => {
        setErrors([])
        setUserUpdate({...userUpdate, lastName: e.target.value})
    }

    const handleMailChange = (e) => {
        setErrors([])
        setUserUpdate({...userUpdate, email: e.target.value})
    }

    const handlePhoneChange = (e) => {
        setErrors([])
        setUserUpdate({...userUpdate, phoneNumber: e.target.value})
    }

    useEffect(() => {

        if(sessionStorage.getItem('token')===null) {
            navigate("/")
        }

        if(userToken!='') {
            accountInfoFetch()
        }
    }, [])
    , useNavigate
    
    useEffect(() => {
        if(userId!=null) {
            userInfoFetch()
        }
    }, [userId])


    const accountInfoFetch = async() => {
        const url = 'http://localhost:8084/account/user-information'
        const settings = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
        }

        fetch(url, settings)
            .then(response => response.json())
            .then(data => {
                setUserId(data.userId)
            })    
    }

    const userInfoFetch = async() => {
        const url = `http://localhost:8084/user/${userId}`
        const settings = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
        }

        fetch(url, settings)
            .then(response => response.json())
            .then(data => {
                setUserUpdate({
                    name: data.name,
                    lastName:data.lastName,
                    email:data.email,
                    phoneNumber:data.phoneNumber
                })
                setUsername(data.username)
            })    
    }

    const validateUpdateForm = () => {
        const errors = [];

        if (userUpdate.name.trim() === '') {
            errors.push('El nombre es obligatorio');
        } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(userUpdate.name)) {
            errors.push('El nombre es inválido');
        } else if(userUpdate.name.length<4) {
            errors.push('El nombre es inválido');
        }

        if (userUpdate.lastName.trim() === '') {
            errors.push('El apellido es obligatorio');
        } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(userUpdate.lastName)) {
            errors.push('El apellido es inválido');
        } else if(userUpdate.lastName.length<4) {
            errors.push('El apellido es inválido');
        }

        if (userUpdate.email.trim() === '') {
            errors.push('El correo electrónico es obligatorio');
        } else if (!/\S+@\S+\.\S+/.test(userUpdate.email)) {
            errors.push('El correo electrónico es inválido');
        }

        if (userUpdate.phoneNumber.trim() === '') {
            errors.push('El numero telefonico es obligatorio');
        } else if (!/^\d+$/.test(userUpdate.phoneNumber)) {
            errors.push('El numero telefonico es inválido');
        }
        
        setErrors(errors);
        return errors.length;
    };

    const DynamicLetter = ({ status }) => {
        if (status === 200) {
          return (
            <div className={Styles.msgBox}>
              <p>Usuario Actualizado exitosamente</p>
            </div>
          );
        } else {
            return (
                <button className={Styles.updateBtn} type='submit' onClick={(e) => handleUpdate(e)}>Actualizar</button>
              );
        }
      };

    const handleUpdate = (e) => {
        e.preventDefault(); 
        if(validateUpdateForm() === 0) {
            setLoading(true)

            const url = "http://localhost:8084/user/update-user"

            const userBody = {
                name: userUpdate.name,
                lastName: userUpdate.lastName,
                username,
                email: userUpdate.email,
                phoneNumber: userUpdate.phoneNumber
            }

            const settings = {
                method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${userToken}`
                    },
                    body: JSON.stringify(userBody),
            }

            fetch(url, settings)
                .then(response => {
                        setStatus(response.status)
                        setLoading(false)
                })

        }
    }

    return(
        <section className={Styles.updateInfoSection}>
            <article className={Styles.updateInfoArticle}>
                <h3>Actualizar Información</h3>
                <img src="src/assets/actualizar.png" alt="update user" />
                <form action="">
                    <div className={Styles.inputContainer}>
                        <label htmlFor="name">Nombre</label>
                        <input type="text" id='name' value={userUpdate.name} onChange={(e) => handleNameChange(e)} />
                    </div>
                    <div className={Styles.inputContainer}>
                        <label htmlFor="lastname">Apellido</label>
                        <input type="text" id='lastname' value={userUpdate.lastName} onChange={(e) => handleLastNameChange(e)}/>
                    </div>
                    <div className={Styles.inputContainer}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' value={userUpdate.email} onChange={(e) => handleMailChange(e)}/>
                    </div>
                    <div className={Styles.inputContainer}>
                        <label htmlFor="">Telefono</label>
                        <input type="tel" id='number' value={userUpdate.phoneNumber} onChange={(e) => handlePhoneChange(e)}/>
                    </div>
                    <DynamicLetter status={status} />
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