const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('arquivos_has_projetos', {
    arquivo_id_arquivo: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'arquivo',
        key: 'id_arquivo'
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
    tableName: 'arquivos_has_projetos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY_arquivos_has_projetos",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "arquivo_id_arquivo" },
          { name: "projeto_id_projeto" },
        ]
      },
      {
        name: "arquivos_has_projetos_FKIndex1",
        using: "BTREE",
        fields: [
          { name: "arquivo_id_arquivo" },
        ]
      },
      {
        name: "arquivos_has_projetos_FKIndex2",
        using: "BTREE",
        fields: [
          { name: "projeto_id_projeto" },
        ]
      },
    ]
  });
};
