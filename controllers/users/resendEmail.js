const { NotFound, BadRequest } = require("http-errors");

const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const { PORT } = process.env;

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw NotFound("User not found");
  }

  if (user.verify && !user.verificationToken) {
    throw BadRequest("Verification has already been passed")
  }

  const mail = {
    to: email,
    subject: "Email confirmation",
    html: `<a target="_blank" href="http://localhost:${PORT}/api/users/verify/${user.verificationToken}" >Email confirmation</a>`
  }

  await sendEmail(mail);

  res.json({
    status: "success",
    code: 200,
    message: "Verification email sent",
  })
}

module.exports = resendEmail;
