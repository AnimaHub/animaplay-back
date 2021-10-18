'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query("CREATE TABLE arquivo ( id_arquivo VARCHAR(36) NOT NULL DEFAULT (uuid()), nome VARCHAR(255) NOT NULL, extencao VARCHAR(10) NULL, caminho VARCHAR(255) NOT NULL, data_modificacao DATE NULL, PRIMARY KEY(id_arquivo) );");
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query('DROP TABLE arquivo');
  }
};
