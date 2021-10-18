'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query('CREATE TABLE aluno_has_laboratorio ( aluno_id_aluno VARCHAR(36) NOT NULL, laboratorio_id_laboratorio VARCHAR(36) NOT NULL, PRIMARY KEY(aluno_id_aluno, laboratorio_id_laboratorio), INDEX aluno_has_laboratorio_FKIndex1(aluno_id_aluno), INDEX aluno_has_laboratorio_FKIndex2(laboratorio_id_laboratorio), FOREIGN KEY(aluno_id_aluno) REFERENCES aluno(id_aluno) ON DELETE NO ACTION ON UPDATE NO ACTION, FOREIGN KEY(laboratorio_id_laboratorio) REFERENCES laboratorio(id_laboratorio) ON DELETE NO ACTION ON UPDATE NO ACTION );');
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query('DROP TABLE aluno_has_laboratorio');
  }
};
