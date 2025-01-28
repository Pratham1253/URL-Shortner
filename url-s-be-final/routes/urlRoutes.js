const express = require("express");
const urlController = require("../controllers/urlController");
const authController = require("../controllers/authController");

const urlRouter = express.Router();
urlRouter
  .route("/")
  .get(authController.protect, urlController.getAllUrls)
  .post(authController.protect, urlController.saveUrl);

urlRouter
  .route("/:id")
  .patch(authController.protect, urlController.updateUrl)
  .delete(authController.protect, urlController.deleteUrl);

module.exports = urlRouter;
