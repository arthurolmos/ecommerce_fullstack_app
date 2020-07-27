const { Model, DataTypes} = require('sequelize');

class Product extends Model {
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            stockQuantity: DataTypes.INTEGER,
            price: DataTypes.REAL,
            available: DataTypes.BOOLEAN,
            visible: DataTypes.BOOLEAN,
        }, {
            sequelize
        })
    }

    static associate (models) { 
        this.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' }),
        this.belongsToMany(models.Order, { through: models.OrderProduct, foreignKey: 'productId' })
        this.hasMany(models.OrderProduct, { foreignKey: 'productId',  as: 'orderProducts' }),
        this.belongsTo(models.Picture, { foreignKey: 'mainPictureId', as: 'mainPicture' }),
        this.belongsToMany(models.Picture, { through: 'ProductPictures', as: 'pictures', foreignKey: 'productId' })
    }
}

module.exports = Product