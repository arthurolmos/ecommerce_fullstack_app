const { connection:sequelize } = require('../database')
const { Op } = require('sequelize')

const User = require('../models/User')
const Address = require('../models/Address')

module.exports = { 
    async index(req, res) {

        const addresses = await Address.findAll()

        return res.json(addresses)
    },

    async query(req, res) {

        const { userId } = req.params

        console.log(userId)

        const user = await User.findByPk(userId, { 
            include: { association: 'addresses' }
        })

        return res.json(user)
    },

    async store(req, res) {

        const { userId } = req.params
        const { street, number, complement, neighborhood, state, city, zipCode } = req.body

        try {
            const result = await sequelize.transaction(async t => {
                const user = await User.findByPk(userId, { transaction: t })
                if(!user) throw 'User not found!'
        
                const address = await Address.create({ 
                                            street, 
                                            number, 
                                            complement, 
                                            neighborhood, 
                                            state, 
                                            city, 
                                            zipCode
                                        }, { transaction: t })
        
                await user.addAddress(address, { transaction: t })

                return address
            })

            return res.status(200).json(result)

        } catch(err) {
            return res.status(400).json({ error: err })
        }

        
        
    }
}