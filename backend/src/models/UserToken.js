const { Model, DataTypes } = require('sequelize')


class UserToken extends Model { 
    static init(sequelize) { 
        super.init({
            refreshToken: DataTypes.STRING
        }, {
            sequelize
        })
    }
    
    static associate(models) { 
        this.belongsTo(models.User, { foreignKey: 'userId', as: 'token' })
    }

}

module.exports = UserToken