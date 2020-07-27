const Sequelize = require('sequelize')
const configuration = require('../config/database')

const User = require('../models/User')
const UserToken = require('../models/UserToken')
const Address = require('../models/Address')
const Product = require('../models/Product')
const Picture = require('../models/Picture')
const Category = require('../models/Category')
const Order = require('../models/Order')
const OrderProduct = require('../models/OrderProduct')
const OrderStatus = require('../models/OrderStatus')
const OrderNote = require('../models/OrderNote')
const OrderAddress = require('../models/OrderAddress')
const OrderHistory = require('../models/OrderHistory')


const connection = new Sequelize(configuration)

connection.authenticate()
    .then(async () => {
        console.log('Conectado')
        // connection.sync({ force: true })
        // connection.sync()
    })
    .catch(error => {
        console.log('ERRO: ', error)
    })
    
async function syncAndSeed() {
    await connection.sync({ 
        force: true, 
        //logging: false
    })
}


User.init(connection)
UserToken.init(connection)
Address.init(connection)
Product.init(connection)
Picture.init(connection)
Category.init(connection)
Order.init(connection)
OrderProduct.init(connection)
OrderStatus.init(connection)
OrderNote.init(connection)
OrderAddress.init(connection)
OrderHistory.init(connection)

User.associate(connection.models)
UserToken.associate(connection.models)
Address.associate(connection.models)
Product.associate(connection.models)
Picture.associate(connection.models)
Category.associate(connection.models)
Order.associate(connection.models)
OrderProduct.associate(connection.models)
OrderStatus.associate(connection.models)
OrderNote.associate(connection.models)
OrderAddress.associate(connection.models)
OrderHistory.associate(connection.models)

module.exports = { connection, syncAndSeed }