const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orientador_has_laboratorio', {
    orientador_id_orientador: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'orientador',
        key: 'id_orientador'
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
    tableName: 'orientador_has_laboratorio',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY_orientador_has_laboratorio",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "orientador_id_orientador" },
          { name: "laboratorio_id_laboratorio" },
        ]
      },
      {
        name: "orientador_has_laboratorio_FKIndex1",
        using: "BTREE",
        fields: [
          { name: "orientador_id_orientador" },
        ]
      },
      {
        name: "orientador_has_laboratorio_FKIndex2",
        using: "BTREE",
        fields: [
          { name: "laboratorio_id_laboratorio" },
        ]
      },
    ]
  });
};
