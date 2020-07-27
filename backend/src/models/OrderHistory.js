const { Model, DataTypes } = require('sequelize')

class OrderHistory extends Model { 
    static init(sequelize) { 
        super.init({
            description: DataTypes.STRING
        }, {
            sequelize
        })
    }

    static associate (models) {     
        this.belongsTo(models.Order, { foreignKey: 'orderId', as: 'orders'})
    }
}

module.exports = OrderHistory