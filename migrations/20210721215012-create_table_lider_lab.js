'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query("CREATE TABLE lider_lab ( id_lider_lab VARCHAR(36) NOT NULL DEFAULT (uuid()), usuario_id_usuario VARCHAR(36) NOT NULL, PRIMARY KEY(id_lider_lab), INDEX lider_lab_FKIndex1(usuario_id_usuario), FOREIGN KEY(usuario_id_usuario) REFERENCES usuario(id_usuario) ON DELETE NO ACTION ON UPDATE NO ACTION );");
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query('DROP TABLE lider_lab');
  }
};
