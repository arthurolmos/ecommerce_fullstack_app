'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      mainPictureId: {
        type: Sequelize.INTEGER,
        references: { model: 'Pictures', key: 'id'},
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      
      description: {
        type: Sequelize.STRING
      },

      categoryId: {
        type: Sequelize.INTEGER
      },

      stockQuantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      
      price: {
        type: Sequelize.REAL,
        allowNull: false
      },

      available: { 
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },

      visible: { 
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },

    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
};
