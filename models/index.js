const { Contact, contactJoiSchema, favoriteJoiSchema } = require("./contact");
const { User, joiRegisterSchema, joiLoginSchema } = require("./user");
module.exports = {
  Contact,
  contactJoiSchema,
  favoriteJoiSchema,
  User,
  joiRegisterSchema,
  joiLoginSchema,
};
