import { Link, useNavigate } from 'react-router-dom'
import Styles from './ProfileStyle.module.css'
import { useEffect, useState } from 'react'

export const Profile = () => {

    const [accountInfo, setAccountInfo] = useState({})
    const [user, setUser] = useState({})
    const [userToken, setUserToken] = useState((sessionStorage.getItem('token') || ''))
    const navigate = useNavigate();
    
    useEffect(() => {
        if(sessionStorage.getItem('token')===null) {
            navigate("/")
        }

        if(userToken!='') {
            accountFetch()
        }
    }, [])


    useEffect(()=> {
        if(Object.keys(accountInfo).length != 0) {
            userFetch()
        }
    }, [accountInfo])

    const accountFetch = async () => {

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
                setAccountInfo(data)
            })    
    }

    const userFetch = async () => {

        const url = `http://localhost:8084/user/${accountInfo.userId}`
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
                setUser(data)
            })    
    }

    return(
        <section className={Styles.profileSection}>
            <article className={Styles.profileArticle}>
                <h3>Informacion de Usuario</h3>
                <div className={Styles.infoBtnContainer}>
                    <div className={Styles.infoBox}>
                        <img src="src\assets\usuario.png" alt="user" />
                        <p><span>Nombre y Apellido: </span>{`${user.name} ${user.lastName}`}</p>
                        <p><span>Username: </span>{user.username}</p>
                        <p><span>Email: </span>{user.email}</p>
                        <p><span>Telefono: </span>{user.phoneNumber}</p>
                    </div>
                    <div className={Styles.btns}>
                        <Link className={Styles.updateLink} to="/update-profile">Actualizar Informacion</Link>
                        <Link className={Styles.updateLink} to="/update-password">Cambiar Contraseña</Link>
                    </div>
                </div>
                <Link to="/home" className={Styles.dataBtn}>Atras</Link>
            </article>
        </section>
    )
}