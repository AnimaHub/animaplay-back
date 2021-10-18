const admin = (req, res, next) => {
  if (!req.TipeAuthorization) req.TipeAuthorization = [];

  req.TipeAuthorization.push("admin");
  next();
};

const aluno = (req, res, next) => {
  if (!req.TipeAuthorization) req.TipeAuthorization = [];

  req.TipeAuthorization.push("aluno");
  next();
};

const orientador = (req, res, next) => {
  if (!req.TipeAuthorization) req.TipeAuthorization = [];

  req.TipeAuthorization.push("orientador");
  next();
};

const lider_lab = (req, res, next) => {
  if (!req.TipeAuthorization) req.TipeAuthorization = [];

  req.TipeAuthorization.push("lider_lab");
  next();
};

const parceiro = (req, res, next) => {
  if (!req.TipeAuthorization) req.TipeAuthorization = [];

  req.TipeAuthorization.push("parceiro");
  next();
};

const todas = (req, res, next) => {
  req.TipeAuthorization = [
    "admin",
    "aluno",
    "orientador",
    "lider_lab",
    "parceiro",
  ];
  next();
};

module.exports = { admin, aluno, orientador, lider_lab, parceiro, todas };
