const multer = require("multer");
const Datauri = require("datauri");

const storage = multer.memoryStorage();
const multerUploads = multer({ storage: storage }).single("imgUrl");

module.exports = { multerUploads };
