const express = require("express");

const { ctrlWrapper, auth, validation } = require("../../middlewares");

const router = express.Router();
const { users: ctrl } = require("../../controllers");
const { joiRegisterSchema } = require("../../models");

router.get(
  "/current",
  auth,
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.getCurrent)
);

router.patch("/", auth, ctrlWrapper(ctrl.updateSubscription));

module.exports = router;
