'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query('CREATE TABLE parceiro_has_projetos ( parceiro_id_parceiro VARCHAR(36) NOT NULL, projeto_id_projeto VARCHAR(36) NOT NULL, PRIMARY KEY(parceiro_id_parceiro, projeto_id_projeto), INDEX parceiro_has_projetos_FKIndex1(parceiro_id_parceiro), INDEX parceiro_has_projetos_FKIndex2(projeto_id_projeto), FOREIGN KEY(parceiro_id_parceiro) REFERENCES parceiro(id_parceiro) ON DELETE NO ACTION ON UPDATE NO ACTION, FOREIGN KEY(projeto_id_projeto) REFERENCES projeto(id_projeto) ON DELETE NO ACTION ON UPDATE NO ACTION );');
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query('DROP TABLE parceiro_has_projetos');
  }
};
