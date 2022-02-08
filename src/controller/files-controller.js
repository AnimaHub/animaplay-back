const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

const salvarArquivo = (file, rota) => {
  let arquivo_id = uuidv4();

  file.mv(
    "assets/uploads/" + rota + "/" + arquivo_id + "." + file.name.split(".")[1]
  );

  return {
    id_arquivo: arquivo_id,
    nome: file.name,
    extencao: file.mimetype,
    caminho:
      "assets/uploads/" +
      rota +
      "/" +
      arquivo_id +
      "." +
      file.name.split(".")[1],
    data_modificacao: moment().format("YYYY-MM-DD"),
  };
};

exports.SalvarArquivo = salvarArquivo;

exports.SalvarArquivos = (files, rota) => {
  const arquivos = [];

  Object.values(files).forEach((element) => {
    arquivos.push(salvarArquivo(element, rota));
  });

  return arquivos;
};
