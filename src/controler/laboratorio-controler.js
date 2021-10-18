"use strict";

const validator = require("../validator/vaalidator");
const authService = require("../services/auth-service");
const md5 = require("md5");
const connection = require("../models/init-models");
const arquivos = require("./arquivos-controler");

exports.post = async (req, res, next) => {
  // #swagger.tags = ['Laboratorios']
  // #swagger.description = 'Endpoint para cadastrar Laboratorios no sistema.'
  // #swagger.security = [{ApiKeyAuth: []}]

  /* #swagger.parameters['dados'] = {
      in: 'body',
      description: 'Informações para cadastrar laboratorio.',
      required: true,
      type: 'object',
      schema: { 
        nome: 'Usuario de teste',
        email: 'teste@teste.com',
        telefone: '31 99566-8243',
        endereco: {
          cep: '96830-260',
          rua: 'Rua Padre José Belzer',
          bairro: 'Arroio Grande',
          numero: '298',
          cidade: 'Santa Cruz do Sul',
          estado: 'RS',
          link: 'https://animaeducacao.zoom.us/j/82475918671',
          tipo: 'fisico'
        }
      }
    }
  */

  if(req.body.dadosJSON){
    req.body = Object.assign({}, req.body, JSON.parse(req.body.dadosJSON));
  }

  if (req?.files?.arquivo) {
    req.body.arquivo_id_arquivo_arquivo = await arquivos.SalvarArquivo(
      req.files.arquivo,
      "laboratorio"
    );
  }

  req.body.endereco_id_endereco_endereco = req.body.endereco;
  req.body.lider_lab_id_lider_lab = req.body.jwtDecodeDados.id_lider_lab;

  // Criptografando Senha
  const models = connection.initModels();

  models.laboratorio
    .create(req.body, {
      include: [
        {
          model: models.endereco,
          as: "endereco_id_endereco_endereco",
        },
        {
          model: models.arquivo,
          as: "arquivo_id_arquivo_arquivo",
        },
      ],
    })
    .then(async (response) => {
      res.status(200).send({
        message: "Laboratorio cadastrado com suscesso",
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

exports.getAll = async (req, res, next) => {
  // #swagger.tags = ['Laboratorios']
  // #swagger.description = 'Endpoint para listar Laboratorios do sistema.'

  const models = connection.initModels();

  models.laboratorio
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
        {
          model: models.arquivo,
          as: "arquivo_id_arquivo_arquivo",
        },
      ],
    })
    .then(async (response) => {
      res.status(200).send({
        message: "Laboratorio encontrados com suscesso",
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
