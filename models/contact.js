const { Schema, model } = require("mongoose");
const Joi = require("joi");

const phoneRegexp = /^[(]\d{3}[)][ ]\d{3}[-]\d{4}$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      pattern: phoneRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const contactJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .rule({ message: "E-mail must be in the format (name)@(domen).(domen)" })
    .required(),
  phone: Joi.string()
    .pattern(phoneRegexp)
    .rule({ message: "Phone number must be in the format. (xxx) xxx-xxxx" })
    .required("Field Phone number is required"),
  favorite: Joi.boolean(),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);
module.exports = { Contact, contactJoiSchema, favoriteJoiSchema };
