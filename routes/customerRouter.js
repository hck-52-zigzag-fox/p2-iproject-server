const UserController = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.post("/login", UserController.loginCustomer);

module.exports = userRouter;
