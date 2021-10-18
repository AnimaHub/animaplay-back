'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query('CREATE TABLE parceiro_has_laboratorio ( parceiro_id_parceiro VARCHAR(36) NOT NULL, laboratorio_id_laboratorio VARCHAR(36) NOT NULL, PRIMARY KEY(parceiro_id_parceiro, laboratorio_id_laboratorio), INDEX parceiro_has_laboratorio_FKIndex1(parceiro_id_parceiro), INDEX parceiro_has_laboratorio_FKIndex2(laboratorio_id_laboratorio), FOREIGN KEY(parceiro_id_parceiro) REFERENCES parceiro(id_parceiro) ON DELETE NO ACTION ON UPDATE NO ACTION, FOREIGN KEY(laboratorio_id_laboratorio) REFERENCES laboratorio(id_laboratorio) ON DELETE NO ACTION ON UPDATE NO ACTION );');
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query('DROP TABLE parceiro_has_laboratorio');
  }
};
