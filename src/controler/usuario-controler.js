"use strict";

const validator = require("../validator/vaalidator");
const authService = require("../services/auth-service");
const md5 = require("md5");
const connection = require("../models/init-models");
const arquivos = require("./arquivos-controler");
const dataFunctions = require("../validator/data");
const { Op } = require("sequelize");

const userTipes = ["admin", "aluno", "orientador", "lider_lab", "parceiro"];
const addressTypes = ["fisico", "virtual", "indefinido"];

exports.post = async (req, res, next) => {
  // #swagger.tags = ['Usuario']
  // #swagger.description = 'Endpoint para cadastrar no sistema.'
  /* #swagger.parameters['dados'] = {
      in: 'body',
      description: 'Informações para login usuário.',
      required: true,
      type: 'object',
      schema: { 
        nome: 'Usuario de teste',
        email: 'teste@teste.com',
        senha: 'oloco',
        telefone: '31 99566-8243',
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
  dataValidator.isRequired(req.body.email, "Campo `email` é obrigatorio!");
  dataValidator.isRequired(
    req.body.tipo_usuario,
    "Campo `tipo_usuario` é obrigatorio!"
  );

  dataValidator.isEmail(req.body.email, "O `email` é invalido");

  dataValidator.includeIn(
    req.body.tipo_usuario,
    userTipes,
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
    res.status(400).send({ mensage: "E-mail ja cadastrado!" }).end();
    connection.closeConnection(models.sequelize);
    return;
  }

  if (req.body?.dadosJSON) {
    req.body = Object.assign({}, req.body, JSON.parse(req.body.dadosJSON));
  }
  // Inserindo objeto arquivo
  if (req.files?.arquivo) {
    req.body.arquivo_id_arquivo_arquivo = await arquivos.SalvarArquivo(
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
      res.status(200).send({
        message: "Usuario encontrado com suscesso",
        dados: {
          usuario: response,
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

exports.put = async (req, res, next) => {
  // #swagger.tags = ['Usuario']
  // #swagger.description = 'Endpoint para atualizar dados do usuário no sistema.'
  // #swagger.security = [{ApiKeyAuth: []}]
  /* #swagger.parameters['dados'] = {
      in: 'body',
      description: 'Dados para atualizar cadastro.',
      required: true,
      type: 'object',
      schema: { 
        nome: 'Usuario de teste atualizado',
        email: 'teste@teste.com',
        senha: 'oloco',
        telefone: '11 99999-9999',
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
    orientador: { model: models.orientador, as: "orientadors"},
    lider_lab: { model: models.lider_lab, as: "lider_labs" },
    parceiro: { model: models.parceiro, as: "parceiros" },
  };
  
  try{

    const dataValidator = new validator();
    let userid =  req.body.jwtDecodeDados.id_usuario;

    dataValidator.isRequired(req.body.nome, "Campo `nome` é obrigatorio!");
    dataValidator.isRequired(req.body.email, "Campo `email` é obrigatorio!");
    dataValidator.isRequired(req.body.tipo_usuario,"Campo `tipo_usuario` é obrigatorio!");
  
    dataValidator.isEmail(req.body.email, "O `email` é invalido");
    dataValidator.includeIn(req.body.tipo_usuario, userTipes, "Campo `tipo_usuario` é invalido");
  
    if (req.body.endereco) {
      dataValidator.isRequired(req.body.endereco.tipo, "Campo `tipo` é obrigatorio!");
      dataValidator.includeIn(req.body.endereco.tipo, addressTypes, "Campo `endereco.tipo` é invalido");
    }
  
    if (!dataValidator.isValid()) {
      res.status(400).send(dataValidator.errors()).end();
    }

    let emailExist = await models.usuario.findOne({
      include: {
        ...userTypes[req.body.tipo_usuario],
      },
      where: { 
        [Op.and]: [{ email: req.body.email}, 
                    { id_usuario: { [Op.not]: userid} }], 
      }
    });
    
    if (emailExist) {
      res.status(400).send({ message: "E-mail ja cadastrado!" }).end();
      connection.closeConnection(models.sequelize);
    }

    // Inicia busca para atualizar
    let usuario = await models.usuario.findOne({
      where: { id_usuario : userid }
    });

    let endereco_usuario = await models.endereco.findOne({
      where: { id_endereco : usuario.endereco_id_endereco }
    });

    req.body.telefone = dataFunctions.RemoveNotNumberDigits(req.body.telefone);

    await endereco_usuario.update(req.body.endereco);
    await usuario.update(req.body);
    
    res.status(200).send({ message: "Usuario atualizado com sucesso"});

  }catch(err){
    res.status(500).send({message: err.message});
  }finally{
    connection.closeConnection(models.sequelize);
    return;
  }
};

exports.login = async (req, res, next) => {
  // #swagger.tags = ['Usuario']
  // #swagger.description = 'Endpoint para logar no sistema.'
  /* #swagger.parameters['dados_login'] = {
      in: 'body',
      description: 'Informações para login usuário.',
      required: true,
      type: 'object',
      schema: { 
        email: 'teste@teste.com',
        senha: 'oloco'
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

      if(response.admins[0]){
        tipo_usuario= "admin"
      }else if(response.alunos[0]){
        tipo_usuario= "aluno"
      }else if(response.orientadors[0]){
        tipo_usuario= "orientador"
      }else if(response.lider_labs[0]){
        tipo_usuario= "lider_lab"
      }else if(response.parceiros[0]){
        tipo_usuario= "parceiro"
      }else{
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
        response[tipo_usuario + 's'][0][
          "id_" + tipo_usuario
        ];

      let jwt = await authService.generateToken(dadosUsuario);

      res.status(200).send({
        message: "Usuario encontrado com suscesso",
        dados: {
          jwt: jwt,
          usuario: dadosUsuario,
        },
      });
    })
    .catch((err) => {
      console.log("ERRO: ",err)
      res.status(500).send(JSON.stringify(err?.sqlMessage));
    })
    .finally(() => {
      connection.closeConnection(models.sequelize);
    });
};
