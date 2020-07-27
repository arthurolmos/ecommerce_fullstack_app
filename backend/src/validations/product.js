const Product = require('../models/Product')
const { Op } = require('sequelize')

async function validateName(name, productId=null){ 
    if(productId) { 
        const product = await Product.findOne({ where: { name, id: { [Op.ne]: productId } }})
        return product ? false : true
    } else { 
        const product = await Product.findOne({ where: { name }})
        return product ? false : true
    }
}

module.exports.validateName = validateName