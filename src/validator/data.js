'use strict';
const express = require('express');
const moment = require('moment');

const dataFunctions = [];

dataFunctions.ConvertDataBRtoUS = (data)=>{
    return moment(data, 'DD/MM/YYYY').format('YYYY-MM-DD');
}

dataFunctions.ConvertDataUStoBR = (data)=>{
    return moment(data, 'YYYY-MM-DD').format('DD/MM/YYYY');
}

module.exports = dataFunctions;