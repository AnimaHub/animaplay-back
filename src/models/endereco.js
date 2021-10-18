const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('endereco', {
    id_endereco: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      autoIncrement: true
    },
    cep: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    rua: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    bairro: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    numero: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    cidade: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    estado: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    link: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tipo: {
      type: DataTypes.ENUM('fisico','virtual','indefinido'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'endereco',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY_endereco",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_endereco" },
        ]
      },
    ]
  });
};
