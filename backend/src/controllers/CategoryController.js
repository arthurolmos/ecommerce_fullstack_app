const Category = require('../models/Category')
const validateName = require('../validations/category')

module.exports = { 
    async index(req, res) {
        const categories = await Category.findAll({
            include: { association: 'products' }
        })

        return res.json(categories)
    },

    async query(req, res) {

        const { categoryId } = req.params

        const category = await Category.findByPk(categoryId, {
            include: { association: 'products' }
        })

        return res.json(category)
    },

    async store(req, res) {
        try { 
            const { name, description } = req.body
    
            const valid = await validateName(name)
            if(!valid) throw 'Category already exists!'
    
            const category = await Category.create({ 
                                                name,
                                                description
                                            })
    
            return res.status(200).json(category)
        } catch(err) { 
            return res.status(400).json(err)
        }
    },

    async update(req, res) {
        try { 
            const { categoryId } = req.params
            const { name, description } = req.body
    
            const valid = await validateName(name, categoryId)
            if(!valid) throw 'Category not found!'
            
            category.name = name
            category.description = description
    
            await category.save()
    
            return res.status(200).json(category)

        } catch(err) { 
            return res.status(400).json({  error: err })
        }

    },

    async destroy(req, res) {
        try { 
            const { categoryId } = req.params

            const category = await Category.findByPk(categoryId)
            if(!category) throw 'Category not found!'
            
            await category.destroy()
    
            return res.status(200).json({ message: 'Successfully deleted!' })
        } catch(err) { 
            return res.status(400).json({ error: err })
        }
    },
}