'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Addresses', [
        {
          street: "Prudente de Moraes",
          number: "12",
          complement: "",
          neighborhood: "Sta Paula",
          city: "São Caetano do Sul",
          state: "SP",
          zipCode: "09541450",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
        street: "Lil Marco",
        number: "12",
        complement: "",
        neighborhood: "Sta Paula",
        city: "São Caetano do Sul",
        state: "SP",
        zipCode: "09541450",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Addresses', null, {});
  }
};
