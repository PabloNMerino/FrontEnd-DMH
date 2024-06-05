import { Link, useLocation } from 'react-router-dom'
import Styles from './UpdateAliasStyle.module.css'
import { useState, useEffect } from 'react'
import { Oval } from 'react-loader-spinner'

export const UpdateAlias = () => {


    const [aliasUpdate, setAliasUpdate] = useState('')
    const [error, setError] = useState("")
    const [userToken, setUserToken] = useState((sessionStorage.getItem('token') || ''))
    const [status, setStatus] = useState(0)
    const [loading, setLoading] = useState(false)

    const handleAliasChange = (e) => {
        setError("")
        setAliasUpdate(e.target.value)
    }

    const validateUpdateForm = () => {
        let error = "";

        if (aliasUpdate.trim() === '') {
            error = 'Ingrese Alias';
        } else if (!/^[a-zA-Z]+(\.[a-zA-Z]+)*$/.test(aliasUpdate)) {
            error = 'El Alias es inválido';
        } else if(aliasUpdate.length<4) {
            error = 'El Alias debe tener al menos 4 caracteres';
        }
    
        setError(error);
        return error.length;
    };

    useEffect(() => {
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
                setAliasUpdate(data.alias)
                console.log(data);
            })    
    }

    const DynamicLetter = ({ status }) => {
        if (status === 200) {
          return (
            <div className={Styles.msgBox}>
              <p>Alias Actualizado exitosamente</p>
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
        const aliasData = {
            alias: aliasUpdate
        }

        if(validateUpdateForm() === 0) {
            setLoading(true)
            const url = "http://localhost:8084/user/update-alias"

            const settings = {
                method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${userToken}`
                    },
                    body: JSON.stringify(aliasData),
            }

            fetch(url, settings)
                .then(response => {
                        setStatus(response.status)
                        setLoading(false)
                })
        }
    }


    return(
        <section className={Styles.updateAliasSection}>
            <article className={Styles.updateAliasArticle}>
                <h3>Cambiar Alias</h3>
                <img src="src/assets/alias.png" alt="alias" />
                <form action="">
                    <div className={Styles.inputBox}>
                        <label htmlFor="alias">Nuevo Alias</label>
                        <input type="text" id='alias' value={aliasUpdate} onChange={(e) => handleAliasChange(e)}/>
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
                </form>
                {
                    error.length>0? <div className={Styles.errorsContainer}>
                                    <p className={Styles.errorMsg}>{error}</p>

                    </div> : <div></div>
                }
                <Link to="/account-information" className={Styles.atrasBtn}>Atras</Link>
            </article>
        </section>
    )
}