const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  try {
    const resultUpload = path.join(avatarsDir, originalname);
    await fs.rename(tempUpload, resultUpload);
    const avatarUrl = path.join("public", "avatars", originalname);
    await User.findByIdAndUpdate(req.user._id, { avatarUrl });
    res.join({ avatarUrl });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
