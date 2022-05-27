const { User } = require("../../models");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.query;
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { runValidators: true }
  );

  const { name, email } = result;
  res.json({
    status: "success",
    code: 200,
    data: {
      name,
      email,
      subscription,
    },
  });
};

module.exports = updateSubscription;
