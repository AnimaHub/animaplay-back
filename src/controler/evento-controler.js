"use strict";

const validator = require("../validator/validator");
const authService = require("../services/auth-service");
const md5 = require("md5");
const connection = require("../models/init-models");

const categoria = ["extensao", "iniciacao_cientifica"];
const status_projeto = [
  "aguardando_publicacao",
  "aberto",
  "encerrado",
  "cancelado",
];

exports.post = async (req, res, next) => {
  // #swagger.tags = ['Evento']
  // #swagger.description = 'Endpoint para cadastrar Evento no sistema.'
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
