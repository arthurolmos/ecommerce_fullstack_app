'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      
      firstName: { 
        type: Sequelize.STRING,
        allowNull: false,
      },

      lastName: { 
        type: Sequelize.STRING,
        allowNull: false,
      },

      email: { 
        type: Sequelize.STRING,
        allowNull: false,
      },

      password: { 
        type: Sequelize.STRING,
        allowNull: false
      },

      phone: { 
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      cpf: { 
        type: Sequelize.STRING,
        allowNull: false,
      },

      admin: { 
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    return queryInterface.dropTable('Users');
  }
};
