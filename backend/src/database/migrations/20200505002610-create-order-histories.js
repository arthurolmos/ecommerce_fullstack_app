'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('OrderHistories', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },

        orderId: { 
          type: Sequelize.INTEGER,
          references: { model: 'Orders', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },

        description: { 
          type: Sequelize.STRING
        },

        createdAt: { 
          type: Sequelize.DATE,
          allowNull: false
        },

        updatedAt: { 
          type: Sequelize.DATE,
          allowNull: false
        }
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('OrderHistories');
  }
};
