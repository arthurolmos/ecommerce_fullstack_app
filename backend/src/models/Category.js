const { Model, DataTypes } = require('sequelize')


class Category extends Model { 
    static init(sequelize) { 
        super.init({
            name: DataTypes.STRING,
            description: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate (models) { 
        this.hasMany(models.Product, { foreignKey: 'categoryId', as: 'products' }) 
    }
}

module.exports = Category