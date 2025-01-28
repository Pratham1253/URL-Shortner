const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.protect = async (req, res, next) => {
  const accessToken = req.headers.authorization;
  const notLoggedInError = {
    status: "fail",
    message: "You are not logged in.",
  };
  if (!accessToken) {
    res.status(401).json(notLoggedInError);
    return;
  }
  try {
    const decoded = jwt.verify(accessToken.split(" ")[1], "my-super-secret");
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      res.status(401).json(notLoggedInError);
      return;
    }
    next();
  } catch (err) {
    res.status(401).json(notLoggedInError);
  }
};

exports.signUp = async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 12);
    const newUser = await User.create({ ...req.body, password: hashedPass });
    res.status(201).json({
      status: "success",
      message: "User created successfully!",
      data: { user: newUser },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Error sining up user!",
    });
    console.error(err);
  }
};

exports.signIn = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({
      status: "fail",
      message: "All fields are required.",
    });
  }

  // validate username and password
  const authError = {
    status: "fail",
    message: "Username or password is incorrect.",
  };

  // find user to login, if exist = user, if not user = undefined
  const userToLogIn = await User.findOne({ username });

  // if user don't exist
  if (!userToLogIn) {
    res.status(400).json(authError);
    return;
  }

  // // if password is not correct
  const isPasswordCorrect = await bcrypt.compare(
    password,
    userToLogIn.password
  );
  if (!isPasswordCorrect) {
    res.status(400).json(authError);
    return;
  }

  const accessToken = jwt.sign(
    {
      username,
      id: userToLogIn._id,
      firstName: userToLogIn.firstName,
      lastName: userToLogIn.lastName,
    },
    "my-super-secret",
    { expiresIn: "1d" }
  );

  res.status(200).json({
    status: "success",
    message: "User logged in successfully!",
    data: { accessToken },
  });
};
