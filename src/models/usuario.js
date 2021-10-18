const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario', {
    id_usuario: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    arquivo_id_arquivo: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'arquivo',
        key: 'id_arquivo'
      }
    },
    endereco_id_endereco: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'endereco',
        key: 'id_endereco'
      }
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    telefone: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'usuario',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY_usuario",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_usuario" },
        ]
      },
      {
        name: "usuario_FKIndex1",
        using: "BTREE",
        fields: [
          { name: "arquivo_id_arquivo" },
        ]
      },
      {
        name: "usuario_FKIndex2",
        using: "BTREE",
        fields: [
          { name: "endereco_id_endereco" },
        ]
      },
    ]
  });
};
