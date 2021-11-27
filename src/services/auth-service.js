"use strict";
const jwt = require("jsonwebtoken");

exports.generateToken = async (data, customExpiration = "1d") => {
  return jwt.sign(data, process.env.KEY_SERVE, { expiresIn: customExpiration });
};

exports.decodeToken = async (token) => {
  var data = await jwt.verify(token, process.env.KEY_SERVE);
  return data;
};

exports.authorize = function (req, res, next) {
  var token = req.headers["x-access-token"];

  if (!token || !req.TipeAuthorization) {
    res.status(401).json({
      message: "Acesso Restrito",
    });
  } else {
    jwt.verify(token, process.env.KEY_SERVE, function (error, decoded) {

      if (error || decoded.id_usuario === undefined || !decoded.tipo_usuario ||!req.TipeAuthorization.includes(decoded.tipo_usuario)) {
        res.status(401).json({
          message: "Token inválido para rota",
        });
      } else {
        req.body.jwtDecodeDados = decoded;
        next();
      }
    });
  }
};

exports.verifyGuard = function (req, res, next) {
  // #swagger.tags = ['Token']
  // #swagger.security = [{ApiKeyAuth: []}]

  var token = req.headers["x-access-token"];

  if (!token) {
    res.status(401).json({
      message: "Acesso Restrito",
    });
  } else {
    jwt.verify(token, process.env.KEY_SERVE, function (error, decoded) {
      if (
        error ||
        !req.params.tipo_usuario ||
        req.params.tipo_usuario !== decoded.tipo_usuario
      ) {
        res.status(401).json({
          message: "Token inválido para rota",
        });
      } else {
        res.status(200).json({
          message: "Token Valido",
        });
      }
    });
  }
};
