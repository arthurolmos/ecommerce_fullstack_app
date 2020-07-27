const { Model, DataTypes } = require('sequelize')

class User extends Model { 
    static init(sequelize) { 
        super.init({
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            cpf: DataTypes.STRING,
            phone: DataTypes.STRING,
            admin: DataTypes.BOOLEAN
        }, {
            sequelize
        })
    }
    
    static associate(models) { 
        this.hasOne(models.Address, { onDelete:'cascade' ,foreignKey: 'userId', as: 'address' }),
        this.hasMany(models.Order, { foreignKey: 'userId', as: 'orders' })
    }
}

module.exports = User