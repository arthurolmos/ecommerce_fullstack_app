'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Products', [
        {
          sku: '123-ABC',
          name: "Produto 1",
          stockQuantity: 50,
          price: 100.45,
          size: "P",
          color: "Azul",
          available: true,
          visible: true,
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        {
          sku: "234-BCD",
          name: 'Produto 2',
          stockQuantity: 100,
          price: 200.45,
          size: "G",
          color: "Vermelho",
          available: true,
          visible: true,
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
        { 
          sku: "345-CDE",
          name: "Produto 3",
          stockQuantity: 150,
          price: 300.99,
          size: "P",
          color: "Azul",
          available: true,
          visible: true,
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        }, 
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Products', null, {});
  }
};
