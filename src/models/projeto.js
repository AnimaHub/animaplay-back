const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('projeto', {
    id_projeto: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      autoIncrement: true
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
      allowNull: true,
      references: {
        model: 'lider_lab',
        key: 'id_lider_lab'
      }
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    data_inicial: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    data_final: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    descricao: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    categoria: {
      type: DataTypes.ENUM('extensao','iniciacao_cientifica'),
      allowNull: false
    },
    carga_horaria: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status_projeto: {
      type: DataTypes.ENUM('aguardando_publicacao','aberto','encerrado','cancelado'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'projeto',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY_projeto",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_projeto" },
        ]
      },
      {
        name: "projetos_FKIndex1",
        using: "BTREE",
        fields: [
          { name: "lider_lab_id_lider_lab" },
        ]
      },
      {
        name: "projetos_FKIndex2",
        using: "BTREE",
        fields: [
          { name: "endereco_id_endereco" },
        ]
      },
    ]
  });
};
