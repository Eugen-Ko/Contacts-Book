const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;

  const { favorite, page = 1, limit = 20 } = req.query;
  const query = !favorite ? { owner: _id } : { owner: _id, favorite };
  const pagination = { skip: (page - 1) * limit, limit: Number(limit) };

  const result = await Contact.find(query, "", pagination).populate(
    "owner",
    "_id name email"
  );
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAll;
