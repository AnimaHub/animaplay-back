const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('arquivo', {
    id_arquivo: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    extencao: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    caminho: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    data_modificacao: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'arquivo',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY_arquivo",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_arquivo" },
        ]
      },
    ]
  });
};
