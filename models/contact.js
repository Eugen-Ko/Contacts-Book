const { Schema, model } = require("mongoose");

const contactSchema = Schema(
  {
    name: String,
    email: String,
    phone: String,
    favorite: { type: Boolean, default: false },
  },
  { versionKey: false }
);

contactSchema.set("versionKey", false);

const Contact = model("contact", contactSchema);

module.exports = Contact;
