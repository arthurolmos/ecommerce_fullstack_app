import api from '../services/api'

export async function validateEmail(value, productId=null){ 
    const resp = await api.get('/users', { params: { email: value }})
    return  resp.data.length > 0 ? 
                productId ? resp.data.some(item => item.id === parseInt(productId)) : false
            : true
}


export async function validatePassword(password) { 
    let valid = true

    const lowerCaseLetters = /[a-z]/g
    const upperCaseLetters = /[A-Z]/g
    const numbers = /[0-9]/g

    if(password.length < 8)
        valid = false
    
    if(!password.match(lowerCaseLetters))
        valid = false

    if(!password.match(upperCaseLetters))
        valid = false

    if(!password.match(numbers))
        valid = false

    return valid
}