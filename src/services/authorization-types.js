const admin = (req, res, next) => {
  if (!req.authorization_type) req.authorization_type = [];

  req.authorization_type.push("admin");
  next();
};

const aluno = (req, res, next) => {
  if (!req.authorization_type) req.authorization_type = [];

  req.authorization_type.push("aluno");
  next();
};

const orientador = (req, res, next) => {
  if (!req.authorization_type) req.authorization_type = [];

  req.authorization_type.push("orientador");
  next();
};

const lider_lab = (req, res, next) => {
  if (!req.authorization_type) req.authorization_type = [];

  req.authorization_type.push("lider_lab");
  next();
};

const parceiro = (req, res, next) => {
  if (!req.authorization_type) req.authorization_type = [];

  req.authorization_type.push("parceiro");
  next();
};

const todas = (req, res, next) => {
  req.authorization_type = [
    "admin",
    "aluno",
    "orientador",
    "lider_lab",
    "parceiro",
  ];
  next();
};

module.exports = { admin, aluno, orientador, lider_lab, parceiro, todas };
