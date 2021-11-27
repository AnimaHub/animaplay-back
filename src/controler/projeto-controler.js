"use strict";

const validator = require("../validator/validator");
const authService = require("../services/auth-service");
const md5 = require("md5");
const connection = require("../models/init-models");
const data = require("../validator/data");
const arquivos = require("./arquivos-controler");

const categoria = ["extensao", "iniciacao_cientifica"];
const status_projeto = [
  "aguardando_publicacao",
  "aberto",
  "encerrado",
  "cancelado",
];

exports.post = async (req, res, next) => {
  // #swagger.tags = ['Projetos']
  // #swagger.description = 'Endpoint para cadastrar Projetos no sistema.'
  // #swagger.security = [{ApiKeyAuth: []}]
  /* #swagger.parameters['dados'] = {
      in: 'body',
      description: 'Informações para login usuário.',
      required: true,
      type: 'object',
      schema: { 
        nome: 'Projeto de teste',
        data_inicial: '14/09/2021',
        data_final: '14/12/2021',
        descricao: 'Projeto descricao',
        categoria: 'extensao',
        carga_horaria: 125,
        status_projeto: 'aguardando_publicacao',
        endereco: {
          cep: '96830-260',
          rua: 'Rua Padre José Belzer',
          bairro: 'Arroio Grande',
          numero: '298',
          cidade: 'Santa Cruz do Sul',
          estado: 'RS',
          link: 'https://animaeducacao.zoom.us/j/82475918671',
          tipo: 'fisico'
        },
      },
    },
  */

  if (req.body.dadosJSON) {
    req.body = Object.assign({}, req.body, JSON.parse(req.body.dadosJSON));
  }

  if (req.files) {
    req.body.arquivos_has_projetos = [];

    const arquivosList = await arquivos.SalvarArquivos(req.files, "projeto");

    arquivosList.forEach((element) => {
      req.body.arquivos_has_projetos.push({
        arquivo_id_arquivo_arquivo: element,
      });
    });
  }

  req.body.data_inicial = data.ConvertDataBRtoUS(req.body.data_inicial);
  req.body.data_final = data.ConvertDataBRtoUS(req.body.data_final);

  req.body.endereco_id_endereco_endereco = req.body.endereco;
  req.body.lider_lab_id_lider_lab = req.body.jwtDecodeDados?.id_lider_lab;

  // Criptografando Senha
  const models = connection.initModels();

  models.projeto
    .create(req.body, {
      include: [
        {
          model: models.endereco,
          as: "endereco_id_endereco_endereco",
        },
        {
          model: models.arquivos_has_projetos,
          as: "arquivos_has_projetos",
          include: [
            { model: models.arquivo, as: "arquivo_id_arquivo_arquivo" },
          ],
        },
      ],
    })
    .then(async (response) => {
      res.status(200).send({
        message: "Projetos cadastrado com suscesso",
        dados: {
          projeto: response,
        },
      });
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify(err?.sqlMessage));
    })
    .finally(() => {
      connection.closeConnection(models.sequelize);
    });
};

exports.getAll = async (req, res, next) => {
  // #swagger.tags = ['Projetos']
  // #swagger.description = 'Endpoint para listar Projetos do sistema.'

  const models = connection.initModels();

  models.projeto
    .findAll({
      include: [
        {
          model: models.endereco,
          as: "endereco_id_endereco_endereco",
        },
        {
          model: models.lider_lab,
          as: "lider_lab_id_lider_lab_lider_lab",
        },
      ],
    })
    .then(async (response) => {
      res.status(200).send({
        message: "Projeto encontrados com suscesso",
        dados: {
          laboratorio: response,
        },
      });
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify(err?.sqlMessage));
    })
    .finally(() => {
      connection.closeConnection(models.sequelize);
    });
};
