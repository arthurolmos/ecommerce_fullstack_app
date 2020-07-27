const Category = require('../models/Category')
const { Op } = require('sequelize')

async function validateName(name, categoryId=null){ 
    if(categoryId) { 
        const category = await Category.findOne({ where: { name, id: { [Op.ne]: categoryId } }})
        return category ? false : true
    } else { 
        const category = await Category.findOne({ where: { name }})
        return category ? false : true
    }
}


module.exports.validateName = validateName
