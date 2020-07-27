'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('OrderNotes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },

      orderId: {
        type: Sequelize.INTEGER,
        references: { model: 'Orders', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      note: {
        type: Sequelize.TEXT
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('OrderNotes');
  }
}