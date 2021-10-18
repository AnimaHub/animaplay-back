'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query('CREATE TABLE aluno_has_projetos ( aluno_id_aluno VARCHAR(36) NOT NULL, projeto_id_projeto VARCHAR(36) NOT NULL, PRIMARY KEY(aluno_id_aluno, projeto_id_projeto), INDEX aluno_has_projetos_FKIndex1(aluno_id_aluno), INDEX aluno_has_projetos_FKIndex2(projeto_id_projeto), FOREIGN KEY(aluno_id_aluno) REFERENCES aluno(id_aluno) ON DELETE NO ACTION ON UPDATE NO ACTION, FOREIGN KEY(projeto_id_projeto) REFERENCES projeto(id_projeto) ON DELETE NO ACTION ON UPDATE NO ACTION );');
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query('DROP TABLE aluno_has_projetos');
  }
};
