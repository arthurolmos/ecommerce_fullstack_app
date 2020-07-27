const { Model, DataTypes } = require('sequelize')

class OrderProduct extends Model { 
    static init(sequelize) { 
        super.init({
            orderNumber: DataTypes.STRING,
            productSku: DataTypes.STRING,
            productSize: DataTypes.STRING,
            productColor: DataTypes.STRING,
            productQuantity: DataTypes.INTEGER,
            productDiscount: DataTypes.REAL,
            productTotalPrice: DataTypes.REAL,
            note: DataTypes.STRING,
        }, {
            sequelize,
            tableName: 'OrderProducts'
        })
    }
    
    static associate(models) { 
        this.belongsTo(models.Order, { foreignKey: 'orderId' } ),
        this.belongsTo(models.Product, { foreignKey: 'productId'} )
    }
}

module.exports = OrderProduct