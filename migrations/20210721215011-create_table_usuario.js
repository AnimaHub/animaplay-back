'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query("CREATE TABLE usuario ( id_usuario VARCHAR(36) NOT NULL DEFAULT (uuid()), arquivo_id_arquivo VARCHAR(36), endereco_id_endereco VARCHAR(36), email VARCHAR(45) NOT NULL, senha VARCHAR(255) NOT NULL, telefone VARCHAR(11) NULL, cpf VARCHAR(11) NOT NULL, rg VARCHAR(13) NOT NULL, PRIMARY KEY(id_usuario), INDEX usuario_FKIndex1(arquivo_id_arquivo), INDEX usuario_FKIndex2(endereco_id_endereco), FOREIGN KEY(arquivo_id_arquivo) REFERENCES arquivo(id_arquivo) ON DELETE NO ACTION ON UPDATE NO ACTION, FOREIGN KEY(endereco_id_endereco) REFERENCES endereco(id_endereco) ON DELETE NO ACTION ON UPDATE NO ACTION );");
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query('DROP TABLE usuario');
  }
};