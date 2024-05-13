require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const authRoute = require("./routes/authRoute");
const employeeRoute = require("./routes/employeeRoute");
const passport = require("passport");
const passportConfig = require("./middleware/passportConfig");

const app = express();
passportConfig(passport);

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);

  next();
});

// router

app.use("/auth", authRoute);
app.use("/employees", employeeRoute);

// db connection
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000");
  });
});
