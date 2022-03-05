const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const authRoute = require("./routes/AuthRouter");

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connection Successfull");
});

const app = express();
app.use(express.json());

//Route for Authentication
app.use("/api/v1/auth", authRoute);

//Global Error Controller
app.use((err, req, res, next) => {
  res.json({
    status: "Failure",
    error: err.message,
    stack: err.stack,
  });
});

app.listen(4000, () => {
  console.log("Server started successfully");
});
