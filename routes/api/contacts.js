const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { contactJoiSchema, favoriteJoiSchema } = require("../../models");

const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", auth, validation(contactJoiSchema), ctrlWrapper(ctrl.add));

router.put("/:id", validation(contactJoiSchema), ctrlWrapper(ctrl.updateById));

router.patch(
  "/:id/favorite",
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavoriteById)
);

router.delete("/:id", ctrlWrapper(ctrl.removeById));

module.exports = router;
