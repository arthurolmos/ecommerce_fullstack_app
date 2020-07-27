const { Model, DataTypes } = require('sequelize')

class OrderNote extends Model { 
    static init(sequelize) { 
        super.init({
            note: DataTypes.TEXT
        }, {
            sequelize
        })
    }

    static associate (models) {     
        this.belongsTo(models.Order, { foreignKey: 'orderId', as: 'orders'})
    }
}

module.exports = OrderNote