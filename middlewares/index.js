const errHandler = require("./errHandler");
const { authentication } = require("./authentication");
const { authorization } = require("./authorization");
const upload = require("./multer");

module.exports = {
  errHandler,
  authentication,
  authorization,
  upload,
};
