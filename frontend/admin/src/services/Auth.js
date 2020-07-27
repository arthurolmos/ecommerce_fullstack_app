import moment from 'moment'


export default class AuthService {
    setLocalStorage(responseObj) { 
        const expires = moment().add(responseObj.expiresIn, 's')
    
        localStorage.setItem('token', responseObj.token)
        localStorage.setItem('expires', JSON.stringify(expires.valueOf()))
    }
    
    logout() { 
        localStorage.removeItem('token')
        localStorage.removeItem('expires')
    }
    
    getExpiration() {
        const expiration = localStorage.getItem('expires')
        const expiresAt = JSON.parse(expiration)

        return moment(expiresAt)
    }
    
    isLoggedIn() { 
        return moment().isBefore(this.getExpiration())
    }
    
    isLoggedOut() { 
        return !this.isLoggedIn()
    } 
    
}
