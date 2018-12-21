const express = require("express");
const exphbs = require("express-handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//Scraping tools
const axios = require("axios");
const cheerio = require("cheerio");

//Require models
const db = require("./models");

const PORT = 3000;

//Init express
const app = express();

//Use morgan to log req
app.use(logger("dev"));

//Parse req body as json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//Set up static directory
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect(
  "mongodb://localhost/createNamedb",
  { useNewUrlParser: true }
);

//Set up handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Start Server
app.listen(PORT, function() {
  console.log("App listening on port " + PORT);
});
