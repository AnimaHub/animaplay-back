'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query('CREATE TABLE aluno ( id_aluno VARCHAR(36) NOT NULL DEFAULT (uuid()), usuario_id_usuario VARCHAR(36) NOT NULL, PRIMARY KEY(id_aluno), INDEX aluno_FKIndex1(usuario_id_usuario), FOREIGN KEY(usuario_id_usuario) REFERENCES usuario(id_usuario) ON DELETE NO ACTION ON UPDATE NO ACTION );');
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query('DROP TABLE aluno');
  }
};
