const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "User must have a first name"],
    // maxLength: [40, "First name must be less than 20 characters"],
  },
  lastName: {
    type: String,
    required: [true, "User must have a last name"],
  },
  username: {
    type: String,
    required: [true, "User must have an username"],
    unique: [true, "Username already exists"],
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
    // select: false,
  },
  //   age: {
  //     type: Number,
  //     min: [18, "User must be at least 18 years old"],
  //   }
});

module.exports = mongoose.model("users", UserSchema);
