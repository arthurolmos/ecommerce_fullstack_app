import React, { createContext, useCallback, useEffect } from 'react'

import moment from 'moment'
import api from '../services/api'

const AuthContext = createContext()

function AuthProvider(props) {

    function setLocalStorage(responseObj) { 
        const expires = moment().add(responseObj.expires)
    
        localStorage.setItem('token', responseObj.token)
        localStorage.setItem('expires', JSON.stringify(expires.valueOf()))
    }
    
    function logout() { 
        localStorage.removeItem('token')
        localStorage.removeItem('expires')
    }
    
    function getExpiration() {
        const expiration = localStorage.getItem('expires')
        const expiresAt = JSON.parse(expiration)
    
        return moment(expiresAt)
    }
    
    function isLoggedIn() { 
        console.log('hellooo')
        const moment = this.getExpiration()
        console.log('mome', moment)

        return moment().isBefore(this.getExpiration())
    }
    
    function isLoggedOut() { 
        return !this.isLoggedIn()
    }


    return (
        <AuthContext.Provider 
            value={{
                isLoggedIn,
                isLoggedOut,
                
                getExpiration,
                setLocalStorage,
                logout

            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}


export { AuthContext, AuthProvider }