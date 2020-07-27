const { connection: sequelize } = require('../database')
const { Op } = require('sequelize')

const User = require('../models/User')
const Address = require('../models/Address')
const repository = require('../repositories/auth/AuthRepository')
const { validateEmail } = require('../validations/user')


module.exports = { 
    async index(req, res) {

        const query = req.query
        const users = await User.findAll({ where: query, order: [ ['id', 'ASC'] ] })

        return res.json(users)
    },

    async query(req, res) {

        const { userId } = req.params
        
        const user = await User.findByPk(userId, { 
            include: [ 'address' ]
        })

        return res.status(200).json(user)
    },

    
    async store(req, res) {
        try { 
            const { firstName, lastName, email, cpf, phone, password, admin=false } = req.body
            const { street='', number='', complement='', neighborhood='', city='', state='', zipCode='' } = req.body

            const valid = await validateEmail(email)
            if(!valid) return res.status(400).json({ error: 'Email already registered!' })

            const result = await sequelize.transaction( async t => {
                    
                const ciphertext = repository.encryptPassword(password)

                const address = { 
                    street, 
                    number, 
                    complement,
                    neighborhood, 
                    city, 
                    state, 
                    zipCode
                }

                const user = await User.create({ 
                                    email,
                                    password: ciphertext,
                                    firstName,
                                    lastName,
                                    cpf,
                                    phone,
                                    admin,
                                    address
                                }, {
                                    include: [ 'address' ],
                                    transaction: t 
                                })
                        
                
                return user
            })

            return res.status(201).json(result)
    
        } catch(err) { 
            return res.status(400).json({ error: err }) 
        }
    },

    async update(req, res) {
        try { 
            const { userId } = req.params

            const { 
                firstName, 
                lastName, 
                email, 
                cpf, 
                phone, 
                // password, 
                admin=false 
            } = req.body
            const { street, number, complement, neighborhood, city, state, zipCode } = req.body

            const valid = await validateEmail(email, userId)
            if(!valid) return res.status(400).json({ error: 'Email already registered!' })

            const result = await sequelize.transaction( async t => {

                const user = await User.findByPk(userId, { include: [ 'address' ], transaction: t})

                // const ciphertext = repository.encryptPassword(password)

                user.email = email
                user.cpf = cpf
                // user.password = ciphertext
                user.firstName = firstName
                user.lastName = lastName
                user.phone = phone
                
                const addressId = user.address ? user.address.id : null
                if(addressId){ 
                    const address = await Address.findByPk(addressId, { transaction: t })
                    if(!address) throw 'Address not found!'

                    address.street = street
                    address.number = number
                    address.complement =complement
                    address.neighborhood =neighborhood
                    address.city = city
                    address.state = state
                    address.zipCode = zipCode

                    await address.save({ transaction: t })

                } else {
                    const address = await Address.create({ 
                        street, 
                        number, 
                        complement,
                        neighborhood,
                        city, 
                        state, 
                        zipCode
                    })

                    await user.setAddress(address, { transaction: t })
                }
                
                return await user.save({ transaction: t })
            })

            return res.status(200).json(result)
    
        } catch(err) { 
            console.log('ERR', err)
            return res.status(400).json({ error: err }) 
        }
    },


    async destroy(req, res) {

        const { userId } = req.params
        
        await User.destroy({ where: { id: userId } })
        
        return res.status(200).json({ message: 'User deleted'})
    }
} 