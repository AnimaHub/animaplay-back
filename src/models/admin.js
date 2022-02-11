const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('admin', {
    id_admin: {
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
    tableName: 'admin',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY_admin",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_admin" },
        ]
      },
      {
        name: "admin_FKIndex1",
        using: "BTREE",
        fields: [
          { name: "usuario_id_usuario" },
        ]
      },
    ]
  });
};
