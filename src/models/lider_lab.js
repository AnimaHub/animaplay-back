const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lider_lab', {
    id_lider_lab: {
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
    tableName: 'lider_lab',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY_lider_lab",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_lider_lab" },
        ]
      },
      {
        name: "lider_lab_FKIndex1",
        using: "BTREE",
        fields: [
          { name: "usuario_id_usuario" },
        ]
      },
    ]
  });
};
