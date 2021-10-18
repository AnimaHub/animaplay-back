const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('parceiro_has_projetos', {
    parceiro_id_parceiro: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'parceiro',
        key: 'id_parceiro'
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
    tableName: 'parceiro_has_projetos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY_parceiro_has_projetos",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "parceiro_id_parceiro" },
          { name: "projeto_id_projeto" },
        ]
      },
      {
        name: "parceiro_has_projetos_FKIndex1",
        using: "BTREE",
        fields: [
          { name: "parceiro_id_parceiro" },
        ]
      },
      {
        name: "parceiro_has_projetos_FKIndex2",
        using: "BTREE",
        fields: [
          { name: "projeto_id_projeto" },
        ]
      },
    ]
  });
};
