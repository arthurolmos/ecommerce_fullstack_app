const { Model, DataTypes } = require('sequelize')

class Picture extends Model {
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            category: DataTypes.STRING,
            filePath: DataTypes.STRING,
            url: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate (models) { 
        this.hasMany(models.Product, { foreignKey: 'mainPictureId', as: 'mainPicture' }),
        this.belongsToMany(models.Product, { through: 'ProductPictures', foreignKey: 'pictureId', as: 'pictures' })
    }
}

module.exports = Picture