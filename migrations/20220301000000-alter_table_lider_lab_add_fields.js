"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn("lider_lab", "curso", {
      type: Sequelize.DataTypes.STRING(255),
      defaultValue: "lider_lab",
      allowNull: true,
    });
    queryInterface.addColumn("lider_lab", "instituicao", {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn("lider_lab", "curso");
    queryInterface.removeColumn("lider_lab", "instituicao");
  },
};
