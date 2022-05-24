const express = require("express");

const { validation, ctrlWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");

const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAllContact));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validation(contactSchema), ctrl.addContact);

router.put(
  "/:contactId",
  validation(contactSchema),
  ctrlWrapper(ctrl.updateContactById)
);

router.delete("/:contactId", ctrlWrapper(ctrl.deleteContactById));

module.exports = router;
