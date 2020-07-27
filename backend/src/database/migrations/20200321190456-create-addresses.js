'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Addresses', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      street: { 
        type: Sequelize.STRING,
        allowNull: false,
      },

      number: { 
        type: Sequelize.STRING,
        allowNull: false,
      },

      complement: {
        type: Sequelize.STRING,
      },

      neighborhood: { 
        type: Sequelize.STRING,
        allowNull: false,
      },

      city: { 
        type: Sequelize.STRING,
        allowNull: false,
      },

      state: { 
        type: Sequelize.STRING,
        allowNull: false,
      },

      zipCode: { 
        type: Sequelize.STRING,
        allowNull: false,
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
    return queryInterface.dropTable('Addresses');
  }
};
