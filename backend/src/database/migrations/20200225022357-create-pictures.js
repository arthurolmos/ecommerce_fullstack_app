'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pictures', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      
      description: {
        type: Sequelize.STRING
      },

      category: {
        type: Sequelize.STRING
      },

      filePath: {
        type: Sequelize.STRING,
        allowNull: false
      },

      url: { 
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('Pictures');
  }
};
