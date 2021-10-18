'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query("CREATE TABLE projeto ( id_projeto VARCHAR(36) NOT NULL DEFAULT (uuid()), endereco_id_endereco VARCHAR(36), lider_lab_id_lider_lab VARCHAR(36), nome VARCHAR(255) NOT NULL, data_inicial DATE NULL, data_final DATE NULL, descricao VARCHAR(255) NOT NULL, categoria ENUM('extensao', 'iniciacao_cientifica') NOT NULL, carga_horaria INT(5) NOT NULL, status_projeto ENUM('aguardando_publicacao', 'aberto', 'encerrado', 'cancelado') NOT NULL, PRIMARY KEY(id_projeto), INDEX projetos_FKIndex1(lider_lab_id_lider_lab), INDEX projetos_FKIndex2(endereco_id_endereco), FOREIGN KEY(lider_lab_id_lider_lab) REFERENCES lider_lab(id_lider_lab) ON DELETE NO ACTION ON UPDATE NO ACTION, FOREIGN KEY(endereco_id_endereco) REFERENCES endereco(id_endereco) ON DELETE NO ACTION ON UPDATE NO ACTION );");
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query('DROP TABLE projeto');
  }
};
