'use strict';

const express = require('express');
const router = express.Router();
const controler=require('../controler/evento-controler');
const authService=require('../services/auth-service');

// CRUD
router.post('/',authService.authorize, controler.post);

module.exports=router;