"use strict";

const validator = require("../validator/validator");
const authService = require("../services/auth-service");
const mailService = require("../services/mail-service");
const md5 = require("md5");
const connection = require("../models/init-models");
const files = require("./files-controller");
const dataFormatter = require("../validator/data");
const { Op } = require("sequelize");

const USER_TYPES = ["admin", "aluno", "orientador", "lider_lab", "parceiro"];
const ADDRESS_TYPE = ["fisico", "virtual", "indefinido"];

exports.post = async (req, res, next) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Insert new user into database.'
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'User object that needs to be added to the system',
      required: true,
      type: 'object',
      schema: { 
        nome: 'Usuario de teste',
        email: 'contato@dominio.com',
        cpf: '00099988877',
        rg: '0123456',
        senha: 'minhaSenha',
        telefone: '31999999999',
        foto: 'base64image',
        tipo_usuario: 'admin',
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

  let dataValidator = new validator();

  dataValidator.isRequired(req.body.nome, "Campo `nome` é obrigatorio!");
  dataValidator.isRequired(req.body.senha, "Campo `senha` é obrigatorio!");
  dataValidator.isRequired(req.body.cpf, "Campo `cpf` é obrigatorio!");
  dataValidator.isRequired(req.body.rg, "Campo `rg` é obrigatorio!");
  dataValidator.isRequired(req.body.email, "Campo `email` é obrigatorio!");
  dataValidator.isRequired(
    req.body.tipo_usuario,
    "Campo `tipo_usuario` é obrigatorio!"
  );

  dataValidator.isEmail(req.body.email, "O `email` é invalido");

  dataValidator.includeIn(
    req.body.tipo_usuario,
    USER_TYPES,
    "Campo `tipo_usuario` é invalido"
  );

  if (req.body.endereco) {
    dataValidator.isRequired(
      req.body.endereco.tipo,
      "Campo `tipo` é obrigatorio!"
    );

    dataValidator.includeIn(
      req.body.endereco.tipo,
      ["fisico", "virtual", "indefinido"],
      "Campo `endereco.tipo` é invalido"
    );
  }

  if (!dataValidator.isValid()) {
    res.status(400).send(dataValidator.errors()).end();
    return;
  }

  const models = connection.initModels();

  let userType = {
    admin: { model: models.admin, as: "admins" },
    aluno: { model: models.aluno, as: "alunos" },
    orientador: {
      model: models.orientador,
      as: "orientadors",
    },
    lider_lab: { model: models.lider_lab, as: "lider_labs" },
    parceiro: { model: models.parceiro, as: "parceiros" },
  };

  let emailExist = await models.usuario.findOne({
    include: {
      ...userType[req.body.tipo_usuario],
    },
    where: {
      email: req.body.email,
    },
  });

  if (emailExist) {
    res.status(409).send().end();
    connection.closeConnection(models.sequelize);
    return;
  }

  if (req.body?.dadosJSON) {
    req.body = Object.assign({}, req.body, JSON.parse(req.body.dadosJSON));
  }

  // Inserindo objeto arquivo
  if (req.files?.arquivo) {
    req.body.arquivo_id_arquivo_arquivo = await files.saveFile(
      req.files.arquivo,
      "usuario"
    );
  }

  // Inserindo objeto endereco
  req.body.endereco_id_endereco_endereco = req.body.endereco;

  // Criptografando Senha
  req.body.senha = md5(req.body.senha + process.env.KEY_SERVE);

  // Tipos de usuario
  req.body.admins = {};
  req.body.alunos = {};
  req.body.orientadors = {};
  req.body.lider_labs = {};
  req.body.parceiros = {};

  models.usuario
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
        userType[req.body.tipo_usuario],
      ],
    })
    .then(async (response) => {
      res.status(201).send();
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify(err?.sqlMessage));
    })
    .finally(() => {
      connection.closeConnection(models.sequelize);
    });
};

exports.put = async (req, res, next) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Update data for an existing user.'
  // #swagger.security = [{ApiKeyAuth: []}]
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'User object that needs to be updated in the system',
      required: true,
      type: 'object',
      schema: { 
        nome: 'Usuario de teste atualizado',
        email: 'contato@dominio.com',
        cpf: '00099988877',
        rg: '0123456',
        senha: 'minhaSenha',
        telefone: '31999999999',
        tipo_usuario: 'admin',
        endereco: {
          cep: '65603-710',
          rua: 'Avenida das Andorinhas',
          bairro: 'Raiz',
          numero: '298',
          cidade: 'Caxias',
          estado: 'MA',
          tipo: 'fisico'
        }
      }
    } 
  */

  const models = connection.initModels();

  const userTypes = {
    admin: { model: models.admin, as: "admins" },
    aluno: { model: models.aluno, as: "alunos" },
    orientador: { model: models.orientador, as: "orientadors" },
    lider_lab: { model: models.lider_lab, as: "lider_labs" },
    parceiro: { model: models.parceiro, as: "parceiros" },
  };

  try {
    const dataValidator = new validator();
    let userid = req.body.jwtDecodeDados.id_usuario;

    dataValidator.isRequired(req.body.nome, "Campo `nome` é obrigatorio!");
    dataValidator.isRequired(req.body.email, "Campo `email` é obrigatorio!");
    dataValidator.isRequired(
      req.body.tipo_usuario,
      "Campo `tipo_usuario` é obrigatorio!"
    );

    dataValidator.isEmail(req.body.email, "O `email` é invalido");
    dataValidator.includeIn(
      req.body.tipo_usuario,
      USER_TYPES,
      "Campo `tipo_usuario` é invalido"
    );

    if (req.body.endereco) {
      dataValidator.isRequired(
        req.body.endereco.tipo,
        "Campo `tipo` é obrigatorio!"
      );
      dataValidator.includeIn(
        req.body.endereco.tipo,
        ADDRESS_TYPE,
        "Campo `endereco.tipo` é invalido"
      );
    }

    if (!dataValidator.isValid()) {
      res.status(400).send(dataValidator.errors()).end();
    }

    let emailExist = await models.usuario.findOne({
      include: {
        ...userTypes[req.body.tipo_usuario],
      },
      where: {
        [Op.and]: [
          { email: req.body.email },
          { id_usuario: { [Op.not]: userid } },
        ],
      },
    });

    if (emailExist) {
      res.status(409).send().end();
      connection.closeConnection(models.sequelize);
    }

    // Inicia busca para atualizar
    let usuario = await models.usuario.findOne({
      where: { id_usuario: userid },
    });

    let endereco_usuario = await models.endereco.findOne({
      where: { id_endereco: usuario.endereco_id_endereco },
    });

    req.body.telefone = dataFormatter.RemoveNotNumberDigits(req.body.telefone);

    await endereco_usuario.update(req.body.endereco);
    await usuario.update(req.body);

    res.status(200).send();
  } catch (err) {
    res.status(500).send({ message: err.message });
  } finally {
    connection.closeConnection(models.sequelize);
    return;
  }
};

exports.login = async (req, res, next) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Generate access token with user credentials.'
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Access credentials.',
      required: true,
      type: 'object',
      schema: { 
        email: 'teste@teste.com',
        senha: 'minhaSenha'
      }
    } 
  */

  let dataValidator = new validator();

  dataValidator.isRequired(req.body.senha, "Campo `senha` é obrigatorio!");
  dataValidator.isRequired(req.body.email, "Campo `email` é obrigatorio!");

  dataValidator.isEmail(req.body.email, "O `email` é invalido");

  if (!dataValidator.isValid()) {
    res.status(400).send(dataValidator.errors()).end();
    return;
  }

  req.body.senha = md5(req.body.senha + process.env.KEY_SERVE);

  const models = connection.initModels();

  models.usuario
    .findOne({
      include: [
        { model: models.admin, as: "admins" },
        { model: models.aluno, as: "alunos" },
        { model: models.orientador, as: "orientadors" },
        { model: models.lider_lab, as: "lider_labs" },
        { model: models.parceiro, as: "parceiros" },
      ],
      where: {
        email: req.body.email,
        senha: req.body.senha,
      },
    })
    .then(async (response) => {
      if (!response) {
        res
          .status(400)
          .send({
            message: "Email ou Senha invalidos.",
          })
          .end();
        return;
      }

      let tipo_usuario = undefined;

      if (response.admins[0]) {
        tipo_usuario = "admin";
      } else if (response.alunos[0]) {
        tipo_usuario = "aluno";
      } else if (response.orientadors[0]) {
        tipo_usuario = "orientador";
      } else if (response.lider_labs[0]) {
        tipo_usuario = "lider_lab";
      } else if (response.parceiros[0]) {
        tipo_usuario = "parceiro";
      } else {
        res
          .status(400)
          .send({
            message: "Email ou Senha invalidos.",
          })
          .end();
        return;
      }

      let dadosUsuario = {
        id_usuario: response.id_usuario,
        nome: response.nome,
        tipo_usuario: tipo_usuario,
      };

      dadosUsuario["id_" + tipo_usuario] =
        response[tipo_usuario + "s"][0]["id_" + tipo_usuario];

      let jwt = await authService.generateToken(dadosUsuario);

      res.status(200).send({
        dados: {
          jwt: jwt,
          usuario: dadosUsuario,
        },
      });
    })
    .catch((err) => {
      console.log("ERRO: ", err);
      res.status(500).send(JSON.stringify(err?.sqlMessage));
    })
    .finally(() => {
      connection.closeConnection(models.sequelize);
    });
};

exports.sendMailToResetPassword = async (req, res, next) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Send an email with a link to create a new password. '
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Account recovery email.',
      required: true,
      type: 'object',
      schema: { 
        email: 'teste@teste.com',
      }
    } 
  */
  let dataValidator = new validator();

  dataValidator.isRequired(req.body.email, "Campo `email` é obrigatorio!");
  dataValidator.isEmail(req.body.email, "O `email` é invalido");

  if (!dataValidator.isValid()) {
    res.status(400).send(dataValidator.errors()).end();
    return;
  }

  const models = connection.initModels();

  models.usuario
    .findOne({
      include: [
        { model: models.admin, as: "admins" },
        { model: models.aluno, as: "alunos" },
        { model: models.orientador, as: "orientadors" },
        { model: models.lider_lab, as: "lider_labs" },
        { model: models.parceiro, as: "parceiros" },
      ],
      where: {
        email: req.body.email,
      },
    })
    .then(async (response) => {
      if (!response) {
        res.status(404).send().end();
        return;
      }

      let tipo_usuario = undefined;

      if (response.admins[0]) {
        tipo_usuario = "admin";
      } else if (response.alunos[0]) {
        tipo_usuario = "aluno";
      } else if (response.orientadors[0]) {
        tipo_usuario = "orientador";
      } else if (response.lider_labs[0]) {
        tipo_usuario = "lider_lab";
      } else if (response.parceiros[0]) {
        tipo_usuario = "parceiro";
      } else {
        res
          .status(400)
          .send({
            message: "Email ou Senha invalidos.",
          })
          .end();
        return;
      }

      let userResponse = {
        id_usuario: response.id_usuario,
        tipo_usuario: tipo_usuario,
      };

      userResponse["id_" + tipo_usuario] =
        response[tipo_usuario + "s"][0]["id_" + tipo_usuario];

      let jwt = await authService.generateToken(userResponse, "1h");
      const result = await mailService.sendRecoveryPasswordMail(
        response.email,
        jwt
      );

      if (result) {
        res.status(200).send();
      } else {
        res.status(500).send({
          message: "Falha ao enviar e-mail de recuperação",
        });
      }
    })
    .catch((err) => {
      console.log("ERRO: ", err);
      res.status(500).send(JSON.stringify(err?.sqlMessage));
    })
    .finally(() => {
      connection.closeConnection(models.sequelize);
    });
};

exports.updatePassword = async (req, res, next) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Update an users password with an emailed token.'
  // #swagger.security = [{ApiKeyAuth: []}]
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'New password chosen for use on the platform.',
      required: true,
      type: 'object',
      schema: { 
        senha: 'novaSenha',
      }
    } 
  */
  let dataValidator = new validator();
  let userid = req.body.jwtDecodeDados.id_usuario;

  dataValidator.isRequired(req.body.senha, "Campo `senha` é obrigatorio!");

  if (!dataValidator.isValid()) {
    res.status(400).send(dataValidator.errors()).end();
    return;
  }

  let new_pass = md5(req.body.senha + process.env.KEY_SERVE);

  const models = connection.initModels();

  await models.usuario
    .findOne({
      where: {
        id_usuario: userid,
      },
    })
    .then(async (userResponse) => {
      if (!userResponse) {
        res
          .status(400)
          .send({
            message: "Usuário não encontrado",
          })
          .end();
        return;
      }

      await userResponse.update({
        senha: new_pass,
      });

      res.status(200).send();
    })
    .catch((err) => {
      console.log("ERRO: ", err);
      res.status(500).send(JSON.stringify(err?.sqlMessage));
    })
    .finally(() => {
      connection.closeConnection(models.sequelize);
    });
};
