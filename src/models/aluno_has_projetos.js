const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('aluno_has_projetos', {
    aluno_id_aluno: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'aluno',
        key: 'id_aluno'
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
    tableName: 'aluno_has_projetos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY_aluno_has_projetos",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "aluno_id_aluno" },
          { name: "projeto_id_projeto" },
        ]
      },
      {
        name: "aluno_has_projetos_FKIndex1",
        using: "BTREE",
        fields: [
          { name: "aluno_id_aluno" },
        ]
      },
      {
        name: "aluno_has_projetos_FKIndex2",
        using: "BTREE",
        fields: [
          { name: "projeto_id_projeto" },
        ]
      },
    ]
  });
};
