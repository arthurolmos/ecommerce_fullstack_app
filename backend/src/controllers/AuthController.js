const { connection: sequelize } = require('../database')
const User = require('../models/User')
const repository = require('../repositories/auth/AuthRepository')
const authentication = require('../services/AuthService')


module.exports = { 
    async login(req, res) {
        try { 
            const result = await sequelize.transaction( async t => {
                const { email, password } = req.body
    
                const user = await User.findOne({ where: { email } }, { transaction: t })
                if(!user) throw 'User not found!'
        
                if(!repository.validPassword({ user, password })) throw 'Password incorrect!'
        
                const jwt = authentication.generateJWT(user)

                return { user, jwt }
            })
                
            return res.status(200).json(result)
    
        } catch(err) { 
            console.log('err', err)
            return res.status(401).json({ error: err }) 
        }
    },

    async register(req, res) {
        try { 
            const result = await sequelize.transaction( async t => {

                const { firstName, lastName, email, cpf, phone, password } = req.body

                let user = await User.findOne({ where: { email } }, { transaction: t })
                if(user) return res.status(400).json({ error: 'Email already registered!' })
                    
                const ciphertext = repository.encryptPassword(password)
    
                user = await User.create({ 
                                    email,
                                    password: ciphertext,
                                    firstName,
                                    lastName,
                                    cpf,
                                    phone
                                }, { transaction: t })

                const jwt = authentication.generateJWT(user)
                return { user, jwt }
            })

            return res.status(200).json(result)
    
        } catch(err) { 
            return res.status(400).json({ error: err }) 
        }
    },

    logout(req, res) {
        const { userId } = req.body

        try { 

            return res.status(200).json({ message: 'User logged out successfully'})

        } catch(err) { 
            return res.status(401).json({ error: err })
        }
    },
   
}