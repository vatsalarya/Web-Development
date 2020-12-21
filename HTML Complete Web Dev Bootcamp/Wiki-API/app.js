const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
    title: String.apply,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

app.route()

.get(function(req, res){
  Article.find({}, function(err, foundArticles){
    if(!err){
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  })
})

.post(function(req, res){
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });

  newArticle.save(function(err){
    if(!err){
      res.send("Success");
    } else {
      res.send(err);
    }
  });
})

.delete(function(req, res){
  Article.deleteMany(function(err){
    if(!err){
      res.send("Success");
    } else {
      res.send(err);
    }
  })
})

//TODO

app.listen(3000, function() {
  console.log("Server started on port 3000");
});