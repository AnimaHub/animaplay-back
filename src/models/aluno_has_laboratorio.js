const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('aluno_has_laboratorio', {
    aluno_id_aluno: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'aluno',
        key: 'id_aluno'
      }
    },
    laboratorio_id_laboratorio: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'laboratorio',
        key: 'id_laboratorio'
      }
    }
  }, {
    sequelize,
    tableName: 'aluno_has_laboratorio',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY_aluno_has_laboratorio",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "aluno_id_aluno" },
          { name: "laboratorio_id_laboratorio" },
        ]
      },
      {
        name: "aluno_has_laboratorio_FKIndex1",
        using: "BTREE",
        fields: [
          { name: "aluno_id_aluno" },
        ]
      },
      {
        name: "aluno_has_laboratorio_FKIndex2",
        using: "BTREE",
        fields: [
          { name: "laboratorio_id_laboratorio" },
        ]
      },
    ]
  });
};
