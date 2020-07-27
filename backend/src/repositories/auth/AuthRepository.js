const CryptoJS = require('crypto-js')
const cryptoKey = require('../../config/crypto')

module.exports = { 

    validPassword({ user, password }) { 
        const bytes  = CryptoJS.AES.decrypt(user.password, cryptoKey)
        var decryptedPassword = bytes.toString(CryptoJS.enc.Utf8)

        return decryptedPassword === password ? true : false
    },

    encryptPassword(password) { 
        const encrypted = CryptoJS.AES.encrypt(password, cryptoKey).toString()

        return encrypted
    }
}