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
const PROFILE_CONTRACTS = {
  aluno: ["ra", "curso", "instituicao", "tipo_aluno"],
  orientador: ["curso", "instituicao"],
  lider_lab: ["curso", "instituicao"],
  parceiro: ["empresa", "cargo", "endereco"],
};

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
        senha: 'minhaSenha',
        telefone: '31999999999',
        foto: 'base64image',
        tipo_usuario: 'aluno',
        ra: '1234567890',
        curso: 'Análise e Desenvolvimento de Sistemas',
        instituicao: 'Centro Universitário UNA',
        tipo_aluno: 'anima_ativo', 
        empresa: 'Ânima Educação',
        cargo: 'Gerente de Projetos',
        endereco: {
          cep: '96830-260',
          rua: 'Rua Padre José Belzer',
          bairro: 'Arroio Grande',
          numero: '298',
          cidade: 'Santa Cruz do Sul',
          estado: 'RS',
          tipo: 'fisico'
        }
      }
    } 
  */

  let dataValidator = new validator();

  dataValidator.isRequired(req.body.nome, "Campo `nome` é obrigatorio!");
  dataValidator.isRequired(req.body.senha, "Campo `senha` é obrigatorio!");
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

  switch (req.body.tipo_usuario) {
    case "aluno":
      dataValidator.isRequired(req.body.ra, "Campo `ra` é obrigatorio!");
      dataValidator.isRequired(req.body.curso, "Campo `curso` é obrigatorio!");
      dataValidator.isRequired(
        req.body.instituicao,
        "Campo `instituicao` é obrigatorio!"
      );
      dataValidator.isRequired(
        req.body.tipo_aluno,
        "Campo `tipo_aluno` é obrigatorio!"
      );
      break;
    case "orientador":
      dataValidator.isRequired(req.body.curso, "Campo `curso` é obrigatorio!");
      dataValidator.isRequired(
        req.body.instituicao,
        "Campo `instituicao` é obrigatorio!"
      );
      break;
    case "lider_lab":
      dataValidator.isRequired(req.body.curso, "Campo `curso` é obrigatorio!");
      dataValidator.isRequired(
        req.body.instituicao,
        "Campo `instituicao` é obrigatorio!"
      );
      break;
    case "parceiro":
      dataValidator.isRequired(
        req.body.empresa,
        "Campo `empresa` é obrigatorio!"
      );
      dataValidator.isRequired(req.body.cargo, "Campo `cargo` é obrigatorio!");
      dataValidator.isRequired(
        req.body.endereco,
        "Campo `endereco` é obrigatorio!"
      );
    default:
      break;
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

  let models_included = [
    {
      model: models.arquivo,
      as: "arquivo_id_arquivo_arquivo",
    },
    userType[req.body.tipo_usuario],
  ];

  if(req.body.endereco != undefined){
    models_included.push({
      model: models.endereco,
      as: "endereco_id_endereco_endereco",
    });
  }

  models.usuario
    .create(req.body, {
      include: models_included,
    })
    .then(async (response) => {
      await updateProfileModel(req.body, response.id_usuario);
      res.status(201).send();
    })
    .catch((err) => {
      console.log(err);
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
      description: 'User object that needs to be added to the system',
      required: true,
      type: 'object',
      schema: { 
        nome: 'Usuario de teste atualizado',
        email: 'contato@dominio.com',
        senha: 'minhaSenha',
        telefone: '31999999999',
        foto: 'base64image',
        tipo_usuario: 'aluno',
        ra: '1234567890',
        curso: 'Análise e Desenvolvimento de Sistemas',
        instituicao: 'Centro Universitário UNA',
        tipo_aluno: 'anima_ativo', 
        empresa: 'Ânima Educação',
        cargo: 'Gerente de Projetos',
        endereco: {
          cep: '96830-260',
          rua: 'Rua Padre José Belzer',
          bairro: 'Arroio Grande',
          numero: '298',
          cidade: 'Santa Cruz do Sul',
          estado: 'RS',
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

    dataValidator.isEmail(req.body.email, "O `email` é invalido");
    dataValidator.includeIn(
      req.body.tipo_usuario,
      USER_TYPES,
      "Campo `tipo_usuario` é invalido"
    );

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

    req.body.senha = md5(req.body.senha + process.env.KEY_SERVE);
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

const updateProfileModel = (request, user_id) => {
  let profileData = new Object();
  let selected_field = "";

  for (
    let index = 0;
    index < PROFILE_CONTRACTS[request.tipo_usuario].length;
    index++
  ) {
    selected_field = PROFILE_CONTRACTS[request.tipo_usuario][index];
    profileData[selected_field] = request[selected_field];
  }

  const models = connection.initModels();
  models[request.tipo_usuario]
    .update(profileData, {
      where: {
        usuario_id_usuario: user_id,
      },
    })
    .then(async () => {
      return;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      connection.closeConnection(models.sequelize);
    });
};