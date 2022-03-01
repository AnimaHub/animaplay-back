"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn("parceiro", "empresa", {
      type: Sequelize.DataTypes.STRING(255),
      defaultValue: "parceiro",
      allowNull: true,
    });
    queryInterface.addColumn("parceiro", "cargo", {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn("parceiro", "empresa");
    queryInterface.removeColumn("parceiro", "cargo");
  },
};
