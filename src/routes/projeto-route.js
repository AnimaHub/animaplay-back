"use strict";

const express = require("express");
const router = express.Router();
const controler = require("../controler/projeto-controler");
const authService = require("../services/auth-service");
const tiposAuthorization = require("../services/types-authorization");

// CRUD
router.post(
  "/",
  tiposAuthorization.lider_lab,
  authService.authorize,
  controler.post
);
router.get("/", controler.getAll);

module.exports = router;
