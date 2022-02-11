const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('parceiro', {
    id_parceiro: {
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
    tableName: 'parceiro',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY_parceiro",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_parceiro" },
        ]
      },
      {
        name: "parceiro_FKIndex1",
        using: "BTREE",
        fields: [
          { name: "usuario_id_usuario" },
        ]
      },
    ]
  });
};
