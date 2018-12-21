const express = require("express");
const exphbs = require("express-handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require(body - parser);

//Scraping tools
const axios = require("axios");
const cheerio = require("cheerio");

//Require models
const db = require("./models");

const app = express();

//Do port

//Set up static directory
app.use(express.static("public"));

//Parse app
app.use(bodyParser.urlencoded({ extended: true }));

//Use morgan to log req
app.use(logger("dev"));

//Set up handlebars

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
