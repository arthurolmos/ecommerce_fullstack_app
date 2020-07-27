

const jwt = require('jsonwebtoken')
const jwtConfig= require('../config/jwt')

module.exports = {

    generateJWT(user) {
        const id = user.id

        const payload = { 
            sub: id,
            iat: Date.now()
        }

        const signedToken = jwt.sign(payload, jwtConfig.privateKey, 
            {   
                expiresIn: jwtConfig.jwtExpiration, 
                algorithm: 'RS256'
            })

        return { 
            token: 'Bearer ' + signedToken,
            expiresIn: jwtConfig.jwtExpiration
        }
    }
}
