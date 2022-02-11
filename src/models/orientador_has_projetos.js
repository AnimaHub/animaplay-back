const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('orientador_has_projetos', {
    orientador_id_orientador: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'orientador',
        key: 'id_orientador'
      }
    },
    projeto_id_projeto: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'projeto',
        key: 'id_projeto'
      }
    }
  }, {
    sequelize,
    tableName: 'orientador_has_projetos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY_orientador_has_projetos",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "orientador_id_orientador" },
          { name: "projeto_id_projeto" },
        ]
      },
      {
        name: "orientador_has_projetos_FKIndex1",
        using: "BTREE",
        fields: [
          { name: "orientador_id_orientador" },
        ]
      },
      {
        name: "orientador_has_projetos_FKIndex2",
        using: "BTREE",
        fields: [
          { name: "projeto_id_projeto" },
        ]
      },
    ]
  });
};
