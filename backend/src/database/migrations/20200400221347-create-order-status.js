'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('OrderStatus', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },

        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },

        init: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false
        },
        
        analysis: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false
        },

        cancelled: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false
        },

        paid: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false
        },

        delivery: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false
        },

        finished: { 
          type: Sequelize.BOOLEAN,
          defaultValue: false,
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
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('OrderStatus');
  }
};
