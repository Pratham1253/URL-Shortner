const express = require("express");
const authController = require("../controllers/authController");

const authRouter = express.Router();
authRouter.route("/signUp").post(authController.signUp);
authRouter.route("/signIn").post(authController.signIn);

module.exports = authRouter;
