const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

const comparePassword = (password, hashPwd) => {
  return bcrypt.compareSync(password, hashPwd);
};

const jwtSign = (payload, secret) => {
  return jwt.sign(payload, secret, { expiresIn: "30d" });
};

const jwtVerify = (payload, secret) => {
  return jwt.verify(payload, secret);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "video/mp4"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

module.exports = {
  hashPassword,
  comparePassword,
  jwtSign,
  jwtVerify,
  upload,
};
