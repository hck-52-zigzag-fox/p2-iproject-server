const { verifyToken } = require("../helpers/jwt");
const { Customer } = require("../models");

async function authentication(req, res, next) {
  console.log(req.headers.access_token,`<<<HEADERS<<<`)
  try {
    let access_token = req.headers.access_token;
    if (!access_token) {
      throw { name: "Invalid Token" };
    }

    let payload = verifyToken(req.headers.access_token);

    let customer = await Customer.findByPk(payload.id);
    if (!customer) {
      throw { name: "Invalid Token" };
    }

    if(customer.role !== "customer"){
      throw { name: "Unauthorized"}
    }

    req.customer = {
      id: customer.id,
      email: customer.email,
      role: customer.role,
    };
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authentication;
