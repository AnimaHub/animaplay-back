'use strict';

const express = require('express');
const router = express.Router();
const authService=require('../services/auth-service');

// #swagger.tags = ['Token']

router.post('/:tipo_usuario', authService.verifyGuard);

module.exports=router;