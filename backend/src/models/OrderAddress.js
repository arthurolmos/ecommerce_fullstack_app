const { Model, DataTypes } = require('sequelize')

class OrderAddress extends Model { 
    static init(sequelize) { 
        super.init({
            street: DataTypes.STRING,
            number: DataTypes.STRING,
            complement: DataTypes.STRING,
            neighborhood: DataTypes.STRING,
            city: DataTypes.STRING,
            state: DataTypes.STRING,
            zipCode: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate (models) { 
        this.belongsTo(models.Order, { foreignKey: 'orderId', as: 'orderAddress' })
    }
}

module.exports = OrderAddress