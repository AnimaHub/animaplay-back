const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('aluno', {
    id_aluno: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      autoIncrement: true
    },
    usuario_id_usuario: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'id_usuario'
      }
    }
  }, {
    sequelize,
    tableName: 'aluno',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY_aluno",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_aluno" },
        ]
      },
      {
        name: "aluno_FKIndex1",
        using: "BTREE",
        fields: [
          { name: "usuario_id_usuario" },
        ]
      },
    ]
  });
};
