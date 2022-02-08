'use strict';

const express = require('express');
const router = express.Router();
const controller=require('../controller/events-controller');
const authService=require('../services/auth-service');

// CRUD
router.post('/',authService.authorize, controller.post);

module.exports=router;