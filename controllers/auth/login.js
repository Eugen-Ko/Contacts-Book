const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !user.veryfy || !user.comparePassword(password)) {
    throw new Unauthorized("Email is wrong or not verify, or password is wrong");
  }
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  const { email: resEmail, subscription } = await User.findByIdAndUpdate(user._id, { token });

  res.json(
    {
      status: 'success',
      code: 200,
      data: {
        user: {
          email: resEmail,
          subscription,
        },
        token,
      }
    }
  );
};

module.exports = login;
