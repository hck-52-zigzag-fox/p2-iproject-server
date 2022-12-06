const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});
const upload = multer({
  storage,
  fileFilter: async function (req, file, next) {
    try {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        next(null, true);
      } else {
        throw { name: "FileFormatNotSupported" };
      }
    } catch (error) {
      next(error);
    }
  },
  limits: { fileSize: 1024 * 1024 * 5 },
});
module.exports = upload;
