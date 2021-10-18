const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orientador', {
    id_orientador: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
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
    tableName: 'orientador',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY_orientador",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_orientador" },
        ]
      },
      {
        name: "orientador_FKIndex1",
        using: "BTREE",
        fields: [
          { name: "usuario_id_usuario" },
        ]
      },
    ]
  });
};
