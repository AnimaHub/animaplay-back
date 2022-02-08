// SEQUELIZE
var DataTypes = require("sequelize").DataTypes;
var config = require("../../config/database");
var Sequelize = require('sequelize');

//MODELS
var _admin = require("./admin");
var _aluno = require("./aluno");
var _aluno_has_laboratorio = require("./aluno_has_laboratorio");
var _aluno_has_projetos = require("./aluno_has_projetos");
var _arquivo = require("./arquivo");
var _arquivos_has_projetos = require("./arquivos_has_projetos");
var _endereco = require("./endereco");
var _laboratorio = require("./laboratorio");
var _lider_lab = require("./lider_lab");
var _orientador = require("./orientador");
var _orientador_has_laboratorio = require("./orientador_has_laboratorio");
var _orientador_has_projetos = require("./orientador_has_projetos");
var _parceiro = require("./parceiro");
var _parceiro_has_laboratorio = require("./parceiro_has_laboratorio");
var _parceiro_has_projetos = require("./parceiro_has_projetos");
var _projeto = require("./projeto");
var _usuario = require("./usuario");

const initModels = () => {
  const sequelize = new Sequelize(config[process.env.NODE_ENV]);

  var admin = _admin(sequelize, DataTypes);
  var aluno = _aluno(sequelize, DataTypes);
  var aluno_has_laboratorio = _aluno_has_laboratorio(sequelize, DataTypes);
  var aluno_has_projetos = _aluno_has_projetos(sequelize, DataTypes);
  var arquivo = _arquivo(sequelize, DataTypes);
  var arquivos_has_projetos = _arquivos_has_projetos(sequelize, DataTypes);
  var endereco = _endereco(sequelize, DataTypes);
  var laboratorio = _laboratorio(sequelize, DataTypes);
  var lider_lab = _lider_lab(sequelize, DataTypes);
  var orientador = _orientador(sequelize, DataTypes);
  var orientador_has_laboratorio = _orientador_has_laboratorio(sequelize, DataTypes);
  var orientador_has_projetos = _orientador_has_projetos(sequelize, DataTypes);
  var parceiro = _parceiro(sequelize, DataTypes);
  var parceiro_has_laboratorio = _parceiro_has_laboratorio(sequelize, DataTypes);
  var parceiro_has_projetos = _parceiro_has_projetos(sequelize, DataTypes);
  var projeto = _projeto(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);

  aluno.belongsToMany(laboratorio, { as: 'laboratorio_id_laboratorio_laboratorios', through: aluno_has_laboratorio, foreignKey: "aluno_id_aluno", otherKey: "laboratorio_id_laboratorio" });
  aluno.belongsToMany(projeto, { as: 'projeto_id_projeto_projetos', through: aluno_has_projetos, foreignKey: "aluno_id_aluno", otherKey: "projeto_id_projeto" });
  arquivo.belongsToMany(projeto, { as: 'projeto_id_projeto_projeto_arquivos_has_projetos', through: arquivos_has_projetos, foreignKey: "arquivo_id_arquivo", otherKey: "projeto_id_projeto" });
  laboratorio.belongsToMany(aluno, { as: 'aluno_id_aluno_alunos', through: aluno_has_laboratorio, foreignKey: "laboratorio_id_laboratorio", otherKey: "aluno_id_aluno" });
  laboratorio.belongsToMany(orientador, { as: 'orientador_id_orientador_orientadors', through: orientador_has_laboratorio, foreignKey: "laboratorio_id_laboratorio", otherKey: "orientador_id_orientador" });
  laboratorio.belongsToMany(parceiro, { as: 'parceiro_id_parceiro_parceiros', through: parceiro_has_laboratorio, foreignKey: "laboratorio_id_laboratorio", otherKey: "parceiro_id_parceiro" });
  orientador.belongsToMany(laboratorio, { as: 'laboratorio_id_laboratorio_laboratorio_orientador_has_laboratorios', through: orientador_has_laboratorio, foreignKey: "orientador_id_orientador", otherKey: "laboratorio_id_laboratorio" });
  orientador.belongsToMany(projeto, { as: 'projeto_id_projeto_projeto_orientador_has_projetos', through: orientador_has_projetos, foreignKey: "orientador_id_orientador", otherKey: "projeto_id_projeto" });
  parceiro.belongsToMany(laboratorio, { as: 'laboratorio_id_laboratorio_laboratorio_parceiro_has_laboratorios', through: parceiro_has_laboratorio, foreignKey: "parceiro_id_parceiro", otherKey: "laboratorio_id_laboratorio" });
  parceiro.belongsToMany(projeto, { as: 'projeto_id_projeto_projeto_parceiro_has_projetos', through: parceiro_has_projetos, foreignKey: "parceiro_id_parceiro", otherKey: "projeto_id_projeto" });
  projeto.belongsToMany(aluno, { as: 'aluno_id_aluno_aluno_aluno_has_projetos', through: aluno_has_projetos, foreignKey: "projeto_id_projeto", otherKey: "aluno_id_aluno" });
  projeto.belongsToMany(arquivo, { as: 'arquivo_id_arquivo_arquivos', through: arquivos_has_projetos, foreignKey: "projeto_id_projeto", otherKey: "arquivo_id_arquivo" });
  projeto.belongsToMany(orientador, { as: 'orientador_id_orientador_orientador_orientador_has_projetos', through: orientador_has_projetos, foreignKey: "projeto_id_projeto", otherKey: "orientador_id_orientador" });
  projeto.belongsToMany(parceiro, { as: 'parceiro_id_parceiro_parceiro_parceiro_has_projetos', through: parceiro_has_projetos, foreignKey: "projeto_id_projeto", otherKey: "parceiro_id_parceiro" });
  aluno_has_laboratorio.belongsTo(aluno, { as: "aluno_id_aluno_aluno", foreignKey: "aluno_id_aluno"});
  aluno.hasMany(aluno_has_laboratorio, { as: "aluno_has_laboratorios", foreignKey: "aluno_id_aluno"});
  aluno_has_projetos.belongsTo(aluno, { as: "aluno_id_aluno_aluno", foreignKey: "aluno_id_aluno"});
  aluno.hasMany(aluno_has_projetos, { as: "aluno_has_projetos", foreignKey: "aluno_id_aluno"});
  arquivos_has_projetos.belongsTo(arquivo, { as: "arquivo_id_arquivo_arquivo", foreignKey: "arquivo_id_arquivo"});
  arquivo.hasMany(arquivos_has_projetos, { as: "arquivos_has_projetos", foreignKey: "arquivo_id_arquivo"});
  laboratorio.belongsTo(arquivo, { as: "arquivo_id_arquivo_arquivo", foreignKey: "arquivo_id_arquivo"});
  arquivo.hasMany(laboratorio, { as: "laboratorios", foreignKey: "arquivo_id_arquivo"});
  usuario.belongsTo(arquivo, { as: "arquivo_id_arquivo_arquivo", foreignKey: "arquivo_id_arquivo"});
  arquivo.hasMany(usuario, { as: "usuarios", foreignKey: "arquivo_id_arquivo"});
  laboratorio.belongsTo(endereco, { as: "endereco_id_endereco_endereco", foreignKey: "endereco_id_endereco"});
  endereco.hasMany(laboratorio, { as: "laboratorios", foreignKey: "endereco_id_endereco"});
  projeto.belongsTo(endereco, { as: "endereco_id_endereco_endereco", foreignKey: "endereco_id_endereco"});
  endereco.hasMany(projeto, { as: "projetos", foreignKey: "endereco_id_endereco"});
  usuario.belongsTo(endereco, { as: "endereco_id_endereco_endereco", foreignKey: "endereco_id_endereco"});
  endereco.hasMany(usuario, { as: "usuarios", foreignKey: "endereco_id_endereco"});
  aluno_has_laboratorio.belongsTo(laboratorio, { as: "laboratorio_id_laboratorio_laboratorio", foreignKey: "laboratorio_id_laboratorio"});
  laboratorio.hasMany(aluno_has_laboratorio, { as: "aluno_has_laboratorios", foreignKey: "laboratorio_id_laboratorio"});
  orientador_has_laboratorio.belongsTo(laboratorio, { as: "laboratorio_id_laboratorio_laboratorio", foreignKey: "laboratorio_id_laboratorio"});
  laboratorio.hasMany(orientador_has_laboratorio, { as: "orientador_has_laboratorios", foreignKey: "laboratorio_id_laboratorio"});
  parceiro_has_laboratorio.belongsTo(laboratorio, { as: "laboratorio_id_laboratorio_laboratorio", foreignKey: "laboratorio_id_laboratorio"});
  laboratorio.hasMany(parceiro_has_laboratorio, { as: "parceiro_has_laboratorios", foreignKey: "laboratorio_id_laboratorio"});
  laboratorio.belongsTo(lider_lab, { as: "lider_lab_id_lider_lab_lider_lab", foreignKey: "lider_lab_id_lider_lab"});
  lider_lab.hasMany(laboratorio, { as: "laboratorios", foreignKey: "lider_lab_id_lider_lab"});
  projeto.belongsTo(lider_lab, { as: "lider_lab_id_lider_lab_lider_lab", foreignKey: "lider_lab_id_lider_lab"});
  lider_lab.hasMany(projeto, { as: "projetos", foreignKey: "lider_lab_id_lider_lab"});
  orientador_has_laboratorio.belongsTo(orientador, { as: "orientador_id_orientador_orientador", foreignKey: "orientador_id_orientador"});
  orientador.hasMany(orientador_has_laboratorio, { as: "orientador_has_laboratorios", foreignKey: "orientador_id_orientador"});
  orientador_has_projetos.belongsTo(orientador, { as: "orientador_id_orientador_orientador", foreignKey: "orientador_id_orientador"});
  orientador.hasMany(orientador_has_projetos, { as: "orientador_has_projetos", foreignKey: "orientador_id_orientador"});
  parceiro_has_laboratorio.belongsTo(parceiro, { as: "parceiro_id_parceiro_parceiro", foreignKey: "parceiro_id_parceiro"});
  parceiro.hasMany(parceiro_has_laboratorio, { as: "parceiro_has_laboratorios", foreignKey: "parceiro_id_parceiro"});
  parceiro_has_projetos.belongsTo(parceiro, { as: "parceiro_id_parceiro_parceiro", foreignKey: "parceiro_id_parceiro"});
  parceiro.hasMany(parceiro_has_projetos, { as: "parceiro_has_projetos", foreignKey: "parceiro_id_parceiro"});
  aluno_has_projetos.belongsTo(projeto, { as: "projeto_id_projeto_projeto", foreignKey: "projeto_id_projeto"});
  projeto.hasMany(aluno_has_projetos, { as: "aluno_has_projetos", foreignKey: "projeto_id_projeto"});
  arquivos_has_projetos.belongsTo(projeto, { as: "projeto_id_projeto_projeto", foreignKey: "projeto_id_projeto"});
  projeto.hasMany(arquivos_has_projetos, { as: "arquivos_has_projetos", foreignKey: "projeto_id_projeto"});
  orientador_has_projetos.belongsTo(projeto, { as: "projeto_id_projeto_projeto", foreignKey: "projeto_id_projeto"});
  projeto.hasMany(orientador_has_projetos, { as: "orientador_has_projetos", foreignKey: "projeto_id_projeto"});
  parceiro_has_projetos.belongsTo(projeto, { as: "projeto_id_projeto_projeto", foreignKey: "projeto_id_projeto"});
  projeto.hasMany(parceiro_has_projetos, { as: "parceiro_has_projetos", foreignKey: "projeto_id_projeto"});
  admin.belongsTo(usuario, { as: "usuario_id_usuario_usuario", foreignKey: "usuario_id_usuario"});
  usuario.hasMany(admin, { as: "admins", foreignKey: "usuario_id_usuario"});
  aluno.belongsTo(usuario, { as: "usuario_id_usuario_usuario", foreignKey: "usuario_id_usuario"});
  usuario.hasMany(aluno, { as: "alunos", foreignKey: "usuario_id_usuario"});
  lider_lab.belongsTo(usuario, { as: "usuario_id_usuario_usuario", foreignKey: "usuario_id_usuario"});
  usuario.hasMany(lider_lab, { as: "lider_labs", foreignKey: "usuario_id_usuario"});
  orientador.belongsTo(usuario, { as: "usuario_id_usuario_usuario", foreignKey: "usuario_id_usuario"});
  usuario.hasMany(orientador, { as: "orientadors", foreignKey: "usuario_id_usuario"});
  parceiro.belongsTo(usuario, { as: "usuario_id_usuario_usuario", foreignKey: "usuario_id_usuario"});
  usuario.hasMany(parceiro, { as: "parceiros", foreignKey: "usuario_id_usuario"});

  return {
    admin,
    aluno,
    aluno_has_laboratorio,
    aluno_has_projetos,
    arquivo,
    arquivos_has_projetos,
    endereco,
    laboratorio,
    lider_lab,
    orientador,
    orientador_has_laboratorio,
    orientador_has_projetos,
    parceiro,
    parceiro_has_laboratorio,
    parceiro_has_projetos,
    projeto,
    usuario,
    sequelize
  };
}

const closeConnection = async (coonection) => {
  await coonection ? coonection.close() : undefined;
}

module.exports = {initModels, closeConnection};
