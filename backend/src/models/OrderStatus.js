const { Model, DataTypes } = require('sequelize')

class OrderStatus extends Model { 
    static init(sequelize) { 
        super.init({
            name: DataTypes.STRING,
            init: DataTypes.BOOLEAN,
            analysis: DataTypes.BOOLEAN,
            cancelled: DataTypes.BOOLEAN,
            finished: DataTypes.BOOLEAN,
            delivery: DataTypes.BOOLEAN,
            paid: DataTypes.BOOLEAN
        }, {
            sequelize,
            freezeTableName: true
        })
    }

    static associate (models) {     
        this.hasMany(models.Order, { foreignKey: 'statusId' })
    }
}

module.exports = OrderStatus