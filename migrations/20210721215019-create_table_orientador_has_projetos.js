'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query('CREATE TABLE orientador_has_projetos ( orientador_id_orientador VARCHAR(36) NOT NULL, projeto_id_projeto VARCHAR(36) NOT NULL, PRIMARY KEY(orientador_id_orientador, projeto_id_projeto), INDEX orientador_has_projetos_FKIndex1(orientador_id_orientador), INDEX orientador_has_projetos_FKIndex2(projeto_id_projeto), FOREIGN KEY(orientador_id_orientador) REFERENCES orientador(id_orientador) ON DELETE NO ACTION ON UPDATE NO ACTION, FOREIGN KEY(projeto_id_projeto) REFERENCES projeto(id_projeto) ON DELETE NO ACTION ON UPDATE NO ACTION );');
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query('DROP TABLE orientador_has_projetos');
  }
};
