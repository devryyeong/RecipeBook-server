const cors = require("cors");
const express = require("express");
const apiRouter = require("./router/api-router");
//const connect = require("connect");
const app = express();
var bodyParser = require("body-parser");
//const nodemailer = require("nodemailer");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", apiRouter);

//app.use(cors())/

app.use("/", (req, res, next) => {
  res.json({ message: " 서버켜짐" });
});

app.listen(3002, () => {
  console.log("running!!!");
});