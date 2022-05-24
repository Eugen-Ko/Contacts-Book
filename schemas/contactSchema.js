const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .rule({ message: "E-mail must be in the format (name)@(domen).(domen)" })
    .required(),
  phone: Joi.string()
    .pattern(/^[(]\d{3}[)][ ]\d{3}[-]\d{4}$/)
    .rule({ message: "Phone number must be in the format. (xxx) xxx-xxxx" })
    .required("Field Phone number is required"),
});

module.exports = contactSchema;
