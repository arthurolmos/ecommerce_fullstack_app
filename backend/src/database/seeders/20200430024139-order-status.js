'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('OrderStatus', [
        {
          name: 'Cancelado',
          init: false,
          analysis: false,
          cancelled: true,
          paid: false,
          delivery: false,
          finished: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Em análise',
          init: false,
          analysis: true,
          cancelled: false,
          paid: false,
          delivery: false,
          finished: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Aguardando pagamento',
          init: true,
          analysis: false,
          cancelled: false,
          paid: false,
          delivery: false,
          finished: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Pagamento confirmado',
          init: false,
          analysis: false,
          cancelled: false,
          paid: true,
          delivery: false,
          finished: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Postado',
          init: false,
          analysis: false,
          cancelled: false,
          paid: false,
          delivery: true,
          finished: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Finalizado',
          init: false,
          analysis: false,
          cancelled: false,
          paid: false,
          delivery: true,
          finished: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('OrderStatus', null, {} );
  }
};
