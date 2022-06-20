const { Contact, contactJoiSchema, favoriteJoiSchema } = require("./contact");
const { User, joiRegisterSchema, joiLoginSchema, joiResendSchema } = require("./user");
module.exports = {
  Contact,
  contactJoiSchema,
  favoriteJoiSchema,
  User,
  joiRegisterSchema,
  joiLoginSchema,
  joiResendSchema,
};
