const { NotFound } = require("http-errors");

const contactsOperation = require("../../models/contacts");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsOperation.getContactById(contactId);
  console.log(contact);
  if (!contact) throw new NotFound(`Contacts with id=${contactId} not found`);
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contact,
    },
  });
};

module.exports = getContactById;
