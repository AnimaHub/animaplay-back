"use strict";

const express = require("express");
const router = express.Router();
const controler = require("../controler/laboratorio-controler");
const authService = require("../services/auth-service");
const tiposAuthorization = require("../services/types-authorization");

// CRUD
router.post(
  "/",
  tiposAuthorization.lider_lab,
  tiposAuthorization.admin,
  authService.authorize,
  controler.post
);
router.get("/", controler.getAll);

module.exports = router;
