const { NotFound } = require("http-errors");

const contactsOperation = require("../../models/contacts");

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperation.removeContact(contactId);
  if (!result) throw new NotFound(`Contacts with id=${contactId} not found`);
  res.status(201).json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result: result,
    },
  });
};

module.exports = deleteContactById;
