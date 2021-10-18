'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query('CREATE TABLE laboratorio ( id_laboratorio VARCHAR(36) NOT NULL DEFAULT (uuid()), arquivo_id_arquivo VARCHAR(36), endereco_id_endereco VARCHAR(36), lider_lab_id_lider_lab VARCHAR(36) NOT NULL, nome VARCHAR(255) NOT NULL, email VARCHAR(45) NOT NULL, telefone VARCHAR(11) NULL, PRIMARY KEY(id_laboratorio), INDEX laboratorio_FKIndex1(lider_lab_id_lider_lab), INDEX laboratorio_FKIndex2(arquivo_id_arquivo), INDEX laboratorio_FKIndex3(endereco_id_endereco), FOREIGN KEY(lider_lab_id_lider_lab) REFERENCES lider_lab(id_lider_lab) ON DELETE NO ACTION ON UPDATE NO ACTION, FOREIGN KEY(arquivo_id_arquivo) REFERENCES arquivo(id_arquivo) ON DELETE NO ACTION ON UPDATE NO ACTION, FOREIGN KEY(endereco_id_endereco) REFERENCES endereco(id_endereco) ON DELETE NO ACTION ON UPDATE NO ACTION );');
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query('DROP TABLE laboratorio');
  }
};
