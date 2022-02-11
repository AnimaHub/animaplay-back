const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

const saveFile = (_file, route) => {
  let arquivo_id = uuidv4();

  _file.mv(
    "assets/uploads/" +
      route +
      "/" +
      arquivo_id +
      "." +
      _file.name.split(".")[1]
  );

  return {
    id_arquivo: arquivo_id,
    nome: _file.name,
    extencao: _file.mimetype,
    caminho:
      "assets/uploads/" +
      route +
      "/" +
      arquivo_id +
      "." +
      _file.name.split(".")[1],
    data_modificacao: moment().format("YYYY-MM-DD"),
  };
};

exports.saveFile = saveFile;

exports.saveFiles = (_files, route) => {
  const files = [];

  Object.values(_files).forEach((element) => {
    files.push(saveFile(element, route));
  });

  return files;
};
