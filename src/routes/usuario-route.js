'use strict';

const express = require('express');
const router = express.Router();
const controler=require('../controler/usuario-controler');
const authService=require('../services/auth-service');
const tiposAuthorization = require('../services/types-authorization');

// CRUD
router.post('/', controler.post);

router.put('/', tiposAuthorization.todas, authService.authorize, controler.put);

router.post('/login', controler.login);

module.exports=router;