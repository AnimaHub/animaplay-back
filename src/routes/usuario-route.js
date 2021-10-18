'use strict';

const express = require('express');
const router = express.Router();
const controler=require('../controler/usuario-controler');
const authService=require('../services/auth-service');

// CRUD
router.post('/', controler.post);

router.post('/login', controler.login);

router.put('/update', controler.login);


module.exports=router;