const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      minLength: 6,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.methods.comparePassword = function (password) {
  console.log("afasdd");
  return bcrypt.compareSync(password, this.password);
};

const joiRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .rule({ message: "E-mail must be in the format (name)@(domen).(domen)" })
    .required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
  // .valid("starter", "pro", "business")
  // .default("starter"),
  token: Joi.string(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .rule({ message: "E-mail must be in the format (name)@(domen).(domen)" })
    .required(),
  password: Joi.string().min(6).required(),
  token: Joi.string(),
});

const User = model("user", userSchema);

module.exports = { User, joiRegisterSchema, joiLoginSchema };
