import { Link, useNavigate } from 'react-router-dom'
import Styles from './CvuAndAliasStyle.module.css'
import { useEffect, useState } from 'react'

export const CvuAndAlias = () => {

    const [alias, setAlias] = useState('')
    const [cvu, setCvu] = useState('')
    const [userToken, setUserToken] = useState((sessionStorage.getItem('token') || ''))
    const navigate = useNavigate();

    useEffect(() => {

        if(sessionStorage.getItem('token')===null) {
            navigate("/")
        }
        
        if(userToken!='') {
            accountInfoFetch()
        }
    }, [])

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
                setAlias(data.alias)
                setCvu(data.cvu)
            })    
    }


    return(
        <section className={Styles.cvuSection}>
            <article className={Styles.cvuArticle}>
                <h3>CVU y Alias</h3>
                    <div className={Styles.dataContainer}>
                        <p><span className={Styles.titleData}>CVU:</span>{cvu}</p>
                        <p><span className={Styles.titleData}>ALIAS:</span>{alias}</p>
                    </div>
                <Link to="/update-alias" className={`${Styles.dataBtn} ${Styles.changeBtn}`}>Cambiar Alias</Link>
                <Link to="/home" className={Styles.dataBtn}>Home</Link>
            </article>
        </section>
    )
}