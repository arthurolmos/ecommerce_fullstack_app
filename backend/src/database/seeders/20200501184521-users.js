'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [
        {
          firstName: "Arthur",
          lastName: "Wosniaki",
          email: "arthur.olmos@gmail.com",
          cpf: "37896159864",
          phone: "11988991261",
          password: '1',
          admin: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        // {
        //   firstName: "Josias",
        //   lastName: "Silva",
        //   email: "josias.silva@gmail.com",
        //   cpf: "132123123",
        //   phone: "321321132",
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // },
    
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
