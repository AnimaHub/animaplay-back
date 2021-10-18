'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query('CREATE TABLE orientador_has_laboratorio ( orientador_id_orientador VARCHAR(36) NOT NULL, laboratorio_id_laboratorio VARCHAR(36) NOT NULL, PRIMARY KEY(orientador_id_orientador, laboratorio_id_laboratorio), INDEX orientador_has_laboratorio_FKIndex1(orientador_id_orientador), INDEX orientador_has_laboratorio_FKIndex2(laboratorio_id_laboratorio), FOREIGN KEY(orientador_id_orientador) REFERENCES orientador(id_orientador) ON DELETE NO ACTION ON UPDATE NO ACTION, FOREIGN KEY(laboratorio_id_laboratorio) REFERENCES laboratorio(id_laboratorio) ON DELETE NO ACTION ON UPDATE NO ACTION );');
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query('DROP TABLE orientador_has_laboratorio');
  }
};
