'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query('CREATE TABLE arquivos_has_projetos ( arquivo_id_arquivo VARCHAR(36) NOT NULL, projeto_id_projeto VARCHAR(36) NOT NULL, PRIMARY KEY(arquivo_id_arquivo, projeto_id_projeto), INDEX arquivos_has_projetos_FKIndex1(arquivo_id_arquivo), INDEX arquivos_has_projetos_FKIndex2(projeto_id_projeto), FOREIGN KEY(arquivo_id_arquivo) REFERENCES arquivo(id_arquivo) ON DELETE NO ACTION ON UPDATE NO ACTION, FOREIGN KEY(projeto_id_projeto) REFERENCES projeto(id_projeto) ON DELETE NO ACTION ON UPDATE NO ACTION );');
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query('DROP TABLE arquivos_has_projetos');
  }
};
