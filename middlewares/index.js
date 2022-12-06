const errHandler = require("./errHandler");
const { authentication } = require("./authentication");
const { authorization } = require("./authorization");

module.exports = {
  errHandler,
  authentication,
  authorization,
};
