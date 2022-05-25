const { NotFound } = require("http-errors");

const { Contact } = require("../../models");

const removeById = async (req, res) => {
  const { id } = req.params;
  if (id.length !== 24) {
    throw new NotFound(`Contacts with id=${id} not found`);
  }
  const result = await Contact.findByIdAndRemove(id);
  if (!result) throw new NotFound(`Contacts with id=${id} not found`);
  res.status(201).json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result,
    },
  });
};

module.exports = removeById;
