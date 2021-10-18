'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')

const app = express();

app.use(fileUpload({
    createParentPath: true
}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Carrega todas as rotas
const usuario_route = require('./routes/usuario-route');
const token_route = require('./routes/token-route');
const laboratorio_route = require('./routes/laboratorio-route');
const projetos_route = require('./routes/projeto-route');
const evento_route = require('./routes/evento-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/usuario', usuario_route);
app.use('/laboratorio', laboratorio_route);
app.use('/projeto', projetos_route);
app.use('/evento', evento_route);
app.use('/token', token_route);

app.use("/assets",express.static("assets"));

// Swagger
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile))

module.exports = app;
