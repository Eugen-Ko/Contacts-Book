const contactsOperation = require("../../models/contacts");

const getAllContact = async (_, res) => {
  const contacts = await contactsOperation.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = getAllContact;
