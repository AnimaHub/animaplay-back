'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('usuario', 'nome', { 
      type: Sequelize.DataTypes.STRING(255),
      defaultValue: 'usuario',
      allowNull: false 
    });
    queryInterface.addColumn('usuario', 'foto', { 
      type: Sequelize.DataTypes.TEXT("long"),
      allowNull: true
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('usuario', 'nome');
    queryInterface.removeColumn('usuario', 'foto');
  }
};
