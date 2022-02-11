"use strict";
const moment = require("moment");

const dataFormatter = [];

dataFormatter.ConvertDataBRtoUS = (data) => {
  return moment(data, "DD/MM/YYYY").format("YYYY-MM-DD");
};

dataFormatter.ConvertDataUStoBR = (data) => {
  return moment(data, "YYYY-MM-DD").format("DD/MM/YYYY");
};

dataFormatter.RemoveNotNumberDigits = (data) => {
  return data.replace(/\D/g, "");
};

module.exports = dataFormatter;