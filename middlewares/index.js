const errHandler = require("./errHandler");
const { authentication } = require("./authentication");
const { authorization } = require("./authorization");
const { multerUploads, dataUri } = require("./multer");

module.exports = {
  errHandler,
  authentication,
  authorization,
  multerUploads,
  dataUri,
};
