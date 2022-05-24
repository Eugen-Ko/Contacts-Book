const { NotFound } = require("http-errors");

const contactsOperation = require("../../models/contacts");

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperation.updateContact(contactId, req.body);
  if (!result) throw new NotFound(`Contacts with id=${contactId} not found`);
  res.json({
    status: "success",
    code: 200,
    data: {
      result: result,
    },
  });
};

module.exports = updateContactById;
