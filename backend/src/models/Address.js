const { Model, DataTypes } = require('sequelize')

class Address extends Model { 
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
        this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
        // this.hasMany(models.Order, { foreignKey: 'addressId', as: 'orders' })
    }
}

module.exports = Address