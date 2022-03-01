"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn("aluno", "ra", {
      type: Sequelize.DataTypes.STRING(255),
      defaultValue: "aluno",
      allowNull: true,
    });
    queryInterface.addColumn("aluno", "curso", {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false,
    });
    queryInterface.addColumn("aluno", "instituicao", {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false,
    });
    queryInterface.addColumn("aluno", "tipo_aluno", {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn("aluno", "ra");
    queryInterface.removeColumn("aluno", "curso");
    queryInterface.removeColumn("aluno", "instituicao");
    queryInterface.removeColumn("aluno", "tipo_aluno");
  },
};
