const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('laboratorio', {
    id_laboratorio: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
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
    lider_lab_id_lider_lab: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'lider_lab',
        key: 'id_lider_lab'
      }
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    telefone: {
      type: DataTypes.STRING(11),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'laboratorio',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY_laboratorio",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_laboratorio" },
        ]
      },
      {
        name: "laboratorio_FKIndex1",
        using: "BTREE",
        fields: [
          { name: "lider_lab_id_lider_lab" },
        ]
      },
      {
        name: "laboratorio_FKIndex2",
        using: "BTREE",
        fields: [
          { name: "arquivo_id_arquivo" },
        ]
      },
      {
        name: "laboratorio_FKIndex3",
        using: "BTREE",
        fields: [
          { name: "endereco_id_endereco" },
        ]
      },
    ]
  });
};
