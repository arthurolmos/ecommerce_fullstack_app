'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Categories', [
        {
          name: "Brincos",
          description: "Brincos, pulseiras...",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Colares",
          description: "Colares...",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Roupas",
          description: "Roupas...",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Categories', null, {});
  }
};
