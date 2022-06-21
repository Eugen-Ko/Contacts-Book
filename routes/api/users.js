const express = require("express");

const { auth, upload, validation, ctrlWrapper } = require("../../middlewares");

const router = express.Router();
const { users: ctrl } = require("../../controllers");
const { joiLoginSchema, joiResendSchema } = require("../../models");

router.get(
  "/current",
  auth,
  validation(joiLoginSchema),
  ctrlWrapper(ctrl.getCurrent)
);

router.patch("/", auth, ctrlWrapper(ctrl.updateSubscription));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.post("/verify", validation(joiResendSchema), ctrlWrapper(ctrl.resendEmail));

module.exports = router;
