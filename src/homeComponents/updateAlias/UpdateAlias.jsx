import { Link } from 'react-router-dom'
import Styles from './UpdateAliasStyle.module.css'
import { useState } from 'react'

export const UpdateAlias = () => {

    const [aliasUpdate, setAliasUpdate] = useState("")
    const [error, setError] = useState("")

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


    const handleUpdate = (e) => {
        e.preventDefault(); 
        if(validateUpdateForm() === 0) {
            console.log("Actualizacion exitosa");
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
                    <button className={Styles.updateBtn} type='submit' onClick={(e) => handleUpdate(e)}>Actualizar</button>
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