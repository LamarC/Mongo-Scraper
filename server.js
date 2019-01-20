const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

//Scraping tools
const axios = require("axios");
const cheerio = require("cheerio");

//Require models
const NoteArt = require("./models");

const PORT = process.env.PORT || 8080;

//Init express
const app = express();

//Use morgan to log req
app.use(logger("dev"));

//Parse req body as json
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());

//Set up static directory
app.use(express.static("public"));

//Set handlebars
const exphbs = require("express-handlebars");

//Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/calm-lake-84752";

mongoose.connect(MONGODB_URI);

//Set up handlebars
app.engine("handlebars", exphbs({
  defaultLayout: "main",
  partialsDir: path.join(__dirname, "views/layouts/partials")
}));
app.set("view engine", "handlebars");

//Routes

app.get("/scrape", function (req, res) {
  axios.get("https://stackexchange.com/")
    .then(function (response) {
      let $ = cheerio.load(response.data);

      $("article h2").each(function (i, element) {
        //Empty arr to save res
        let result = {};

        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");

        //Create new Article

        db.Article.create(result)
          .then(function (dbArticle) {
            console.log(dbArticle);
          })
          .catch(function (err) {
            console.log(err);
          });
      });
      //Send message to the client
      res.send("Scrape complete!");
    });
});

//Getting Article from DB
app.get("/articles", function (req, res) {
  db.Articles.find({})
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

//Getting Article by id and using .populate for notes
app.get("/articles/:id", function (req, res) {
  db.Article.findOne({
      _id: req.params.id
    })
    .populate("note")
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

//Save and updates Article's note
app.post("/article/:id", function (req, res) {
  db.Note.create(req.body)
    .then(function (dbNote) {
      return db.Article.findByIdAndUpdate({
        _id: req.param.id
      }, {
        note: dbNote._id
      }, {
        new: true
      });
    })
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

//Start Server
app.listen(PORT, function () {
  console.log("App listening on port " + PORT);
});