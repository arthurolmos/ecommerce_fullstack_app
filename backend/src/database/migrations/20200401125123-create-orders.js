'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Orders', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },

        userId: {
          type: Sequelize.INTEGER,
          references: { model: 'Users', key: 'id'},
          onUpdate: 'CASCADE'
        },

        addressId: { 
          type: Sequelize.INTEGER,
          references: { model: 'Addresses', key: 'id'},
          onUpdate: 'CASCADE'
        },

        statusId: {
          type: Sequelize.INTEGER,
          references: { model: 'OrderStatus', key: 'id'},
          onUpdate: 'CASCADE',
        },

        orderNumber: { 
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true
        },

        paid: { 
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false
        },

        paymentId: { 
          type: Sequelize.STRING
        },

        totalItems: { 
          type: Sequelize.INTEGER,
          allowNull: false
        },

        totalPrice: { 
          type: Sequelize.REAL,
          allowNull: false
        },

        deleted: {
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
      
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Orders');
  }
};
