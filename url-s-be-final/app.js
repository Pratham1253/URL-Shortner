const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose
  .connect("mongodb://127.0.0.1:27017/url-shortner-db")
  .then(() => console.log("Connected to database!"));

// const StudentSchema = new mongoose.Schema({
//   name: String,
//   div: String,
// });

// const Student = mongoose.model("student", StudentSchema);

// const student = new Student({ name: "Tanay", div: "IT" });
// student.save();

// Student.create({
//   name: "Tanay",
//   div: "IT",
// });

const app = express();

// Routers
const urlRouter = require("./routes/urlRoutes");
const urlController = require("./controllers/urlController");
const authRouter = require("./routes/authRoutes");

// example of custom middleware
// app.use((req, res, next) => {
//   console.log("hi req received ......");
//   next();
// });

// to access req.body, req.params, req.query
app.use(express.json());

// logging the req, res details
app.use(morgan("dev"));

app.use(cors({ origin: "http://localhost:3000" }));

app.use("/urls", urlRouter);
app.use("/auth", authRouter);
app.use("/:shortUrl", urlController.redirectUrl);

const port = 8000;
app.listen(port, () => console.log(`App listening on port ${port}`));
