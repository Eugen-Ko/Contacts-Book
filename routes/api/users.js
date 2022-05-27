const express = require("express");

const { auth, upload, validation, ctrlWrapper } = require("../../middlewares");

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
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
