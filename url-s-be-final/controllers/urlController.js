const Url = require("../models/urlModel");

exports.getAllUrls = async (req, res) => {
  try {
    const allUrls = await Url.find({ user: req.user._id });
    res.status(200).json({
      status: "success",
      data: allUrls,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: "fail",
      message: "Error getting all urls",
    });
  }
};

exports.saveUrl = async (req, res) => {
  try {
    const newUrl = await Url.create({ ...req.body, user: req.user._id });
    res.status(201).json({
      status: "success",
      data: newUrl,
      message: "Url saved successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: "fail",
      message: "Error saving url",
    });
  }
};

exports.updateUrl = async (req, res) => {
  try {
    const updatedUrl = await Url.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: updatedUrl,
      message: "Url updated successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: "fail",
      message: "Error updating url",
    });
  }
};

exports.deleteUrl = async (req, res) => {
  try {
    const urlToDelete = await Url.findOne({
      _id: req.params.id, // url id to be deleted
      user: req.user._id, // current user id
    });
    if (!urlToDelete) {
      return res.status(404).json({
        status: "fail",
        message: "Url not found",
      });
    }

    await Url.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: "fail",
      message: "Error deleting url",
    });
  }
};

exports.redirectUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ shortUrl: req.params.shortUrl });
    if (!url) {
      // set content type to html
      res.setHeader("Content-Type", "text/html");
      // send page not found html
      res.status(404).send(`<h1>Page not found</h1>`);
      return;
    }
    res.redirect(url.originalUrl);
  } catch (err) {
    res.setHeader("Content-Type", "text/html");

    res.status(400).send(`<h1>URL not found</h1>`);
  }
};
