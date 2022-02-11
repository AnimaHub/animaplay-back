const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('parceiro_has_laboratorio', {
    parceiro_id_parceiro: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'parceiro',
        key: 'id_parceiro'
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
    tableName: 'parceiro_has_laboratorio',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY_parceiro_has_laboratorio",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "parceiro_id_parceiro" },
          { name: "laboratorio_id_laboratorio" },
        ]
      },
      {
        name: "parceiro_has_laboratorio_FKIndex1",
        using: "BTREE",
        fields: [
          { name: "parceiro_id_parceiro" },
        ]
      },
      {
        name: "parceiro_has_laboratorio_FKIndex2",
        using: "BTREE",
        fields: [
          { name: "laboratorio_id_laboratorio" },
        ]
      },
    ]
  });
};
