const { connection: sequelize } = require('../database')
const { Op } = require('sequelize')
const Product = require('../models/Product')
const { validateName } = require('../validations/product')


module.exports = {
    async index(req, res) {

        const query = req.query

        const products = await Product.findAll({
            where: query,
            attributes: { 
                exclude: [ 
                    'mainPicture', 'pictures', 'categoryId', 'mainPictureId', 'createdAt', 'updatedAt'
                ]
            },
            order: [ ['id', 'ASC' ] ]
        })

        return res.json(products)
    },

    async query(req, res) {

        const { productId } = req.params

        const product = await Product.findByPk(productId, { 
            include: [
                'category',
                'pictures',
                'mainPicture'
            ]
        })

        return res.json(product)
    },

    async store(req, res, next) {
        try {
            const { 
                name, 
                categoryId,
                description, 
                stockQuantity=0, 
                price=0,
                available=true,
                visible=true,

                // tags,
                mainPictureId=null,
                picturesId=[]
            } = req.body

            const valid = await validateName(name)
            if(!valid) throw 'Product with same name already registered!'

            const result = await sequelize.transaction( async t => {

                const product = await Product.create({
                        name, 
                        description, 
                        stockQuantity, 
                        price,
                        available,
                        visible
                }, { 
                    transaction: t 
                })

                await product.setCategory(categoryId, { transaction: t })
                await product.setMainPicture(mainPictureId, {  transaction: t })
                await product.setPictures(picturesId, {  transaction: t })

                return product
            })

            return res.status(201).json(result)

        } catch (err) {
            return res.status(400).json({ error: err })
        }
    },

    async update(req, res, next) {
        try {
            const { productId } = req.params

            const { 
                name, 
                description, 
                stockQuantity, 
                price,
                available,
                visible,
                categoryId,

                mainPictureId=null,
                picturesId=[]
            } = req.body

            const valid = await validateName(name, productId)
            if(!valid) throw 'Product with same name already registered!'

            const result = await sequelize.transaction( async t => {

                const product = await Product.findByPk(productId, { transaction: t})

                product.name = name
                product.description = description
                product.stockQuantity = stockQuantity
                product.price = price
                product.available = available
                product.visible = visible

                await product.setCategory(categoryId, { transaction: t })
                await product.setMainPicture(mainPictureId, {  transaction: t })
                await product.setPictures(picturesId, {  transaction: t })

                return await product.save({ transaction: t })
            })

            return res.status(200).json(result)

        } catch(err) {
            return res.status(400).json({ error: err })
        }
    },

    async destroy(req, res) {
        try { 
            const { productId } = req.params

            const product = await Product.findByPk(productId)
            await product.destroy()
    
            return res.status(200).json({ message: 'Product deleted!' })

        } catch(err) {
            return res.status(400).json({ error: err })
        }
    },

    async destroyAll(req, res) {
        await Product.destroy({ where: {} })

        return res.status(200).send('Deleted all!')
    },
}