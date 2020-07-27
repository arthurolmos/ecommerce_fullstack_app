const { Model, DataTypes } = require('sequelize')

class Order extends Model { 
    static init(sequelize) { 
        super.init({
            orderNumber: DataTypes.STRING,
            paid: DataTypes.BOOLEAN,
            paymentId: DataTypes.STRING,
            totalItems: DataTypes.INTEGER,
            totalPrice: DataTypes.REAL,
            deleted: DataTypes.BOOLEAN
        }, {
            sequelize
        })
    }

    static associate (models) {     
        this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' }),
        this.belongsTo(models.OrderStatus, { foreignKey: 'statusId', as: 'orderStatus' }),
        this.belongsToMany(models.Product, { through: models.OrderProduct, as: 'orderProducts', foreignKey: 'orderId' }),
        this.hasOne(models.OrderAddress, { foreignKey: 'orderId', as: 'orderAddress' }),
        this.hasMany(models.OrderProduct, { foreignKey: 'orderId' }),
        this.hasMany(models.OrderNote, { foreignKey: 'orderId', as: 'orderNotes' }),
        this.hasMany(models.OrderHistory, { foreignKey: 'orderId', as: 'orderHistories' })
    }
}

module.exports = Order