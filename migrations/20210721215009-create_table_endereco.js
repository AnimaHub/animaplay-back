'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query("CREATE TABLE endereco( id_endereco VARCHAR(36) NOT NULL DEFAULT (uuid()), cep VARCHAR(9) NULL, rua VARCHAR(255) NULL, bairro VARCHAR(255) NULL, numero VARCHAR(10) NULL, cidade VARCHAR(255) NULL, estado VARCHAR(2) NULL, link VARCHAR(255) NULL, tipo ENUM('fisico', 'virtual', 'indefinido') NOT NULL, PRIMARY KEY(id_endereco));");
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query('DROP TABLE endereco');
  }
};