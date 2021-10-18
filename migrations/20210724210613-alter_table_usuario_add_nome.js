'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('usuario', 'nome', { 
      type: Sequelize.DataTypes.STRING(255),
      defaultValue: 'usuario',
      allowNull: false 
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('usuario', 'nome');
  }
};
