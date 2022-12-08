const UserController = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.post("/login", UserController.loginCustomer);
userRouter.post("/googleLogin", UserController.googleLogin);

module.exports = userRouter;
