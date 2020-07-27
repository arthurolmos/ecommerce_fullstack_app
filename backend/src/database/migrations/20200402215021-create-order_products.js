'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('OrderProducts', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },

        orderId: {
          type: Sequelize.INTEGER,
          references: { model: 'Orders', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },

        productId: {
          type: Sequelize.INTEGER,
          references: { model: 'Products', key: 'id'},
          onUpdate: 'CASCADE'
        },

        orderNumber: {
          type: Sequelize.STRING,
          allowNull: false
        },

        productSku: {
          type: Sequelize.STRING,
          allowNull: false
        },

        productSize: {
          type: Sequelize.STRING,
        },

        productColor: {
          type: Sequelize.STRING,
        },

        productQuantity: {
          type: Sequelize.INTEGER,
          allowNull: false
        },

        productDiscount: {
          type: Sequelize.REAL
        },

        productTotalPrice: {
          type: Sequelize.REAL,
          allowNull: false
        },

        note: {
          type: Sequelize.TEXT,
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
      return queryInterface.dropTable('OrderProducts');
  }
};
