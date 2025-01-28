const mongoose = require("mongoose");
const UrlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: [true, "Original url is required"],
  },
  shortUrl: {
    type: String,
    required: [true, "Short url is required"],
    unique: [true, "Short url is not available"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "User is required"],
  },
});

module.exports = mongoose.model("urls", UrlSchema);
