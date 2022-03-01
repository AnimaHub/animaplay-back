"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn("orientador", "curso", {
      type: Sequelize.DataTypes.STRING(255),
      defaultValue: "orientador",
      allowNull: true,
    });
    queryInterface.addColumn("orientador", "instituicao", {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn("orientador", "curso");
    queryInterface.removeColumn("orientador", "instituicao");
  },
};
