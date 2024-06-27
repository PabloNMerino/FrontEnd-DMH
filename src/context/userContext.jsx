import { createContext, useEffect, useState } from "react";

export const UserContext = createContext()

export const DataProvider = (props) => {
    const[accountInfo, setAccountInfo] = useState({})
    const [userInfo, setUserInfo] = useState({})
    const [userFullName, setUserFullName] = useState('')
    const [userToken, setUserToken] = useState((sessionStorage.getItem('token') || ''))

    useEffect(() => {
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

        const url = 'http://vps-4202860-x.dattaweb.com:8084/account/user-information'
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

        const url = `http://vps-4202860-x.dattaweb.com:8084/user/${accountInfo.userId}`
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
                setUserInfo(data)
                setUserFullName(`${data.name} ${data.lastName}`)
            })    
    }

    return(
        <UserContext.Provider value={{accountInfo, userInfo, userFullName}}>
            {props.children}
        </UserContext.Provider>
    )
    

}