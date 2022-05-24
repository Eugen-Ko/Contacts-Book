const { NotFound } = require("http-errors");

const { Contact } = require("../../models");

const updateFavoriteById = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  if (!result) throw new NotFound(`Contacts with id=${id} not found`);
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateFavoriteById;
