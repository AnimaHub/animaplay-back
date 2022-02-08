"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controller/users-controller");
const authService = require("../services/auth-service");
const AUTHORIZATION_TYPES = require("../services/authorization-types");

// CRUD
router.post("/", controller.post);

router.put(
  "/",
  AUTHORIZATION_TYPES.todas,
  authService.authorize,
  controller.put
);

router.post("/login", controller.login);

router.post("/password/recovery", controller.sendMailToResetPassword);
router.put(
  "/password/new",
  AUTHORIZATION_TYPES.todas,
  authService.authorize,
  controller.updatePassword
);

module.exports = router;
