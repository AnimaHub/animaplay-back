"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controller/laboratories-controller");
const authService = require("../services/auth-service");
const AUTHORIZATION_TYPES = require("../services/authorization-types");

// CRUD
router.post(
  "/",
  AUTHORIZATION_TYPES.lider_lab,
  authService.authorize,
  controller.post
);
router.get("/", controller.getAll);

module.exports = router;
