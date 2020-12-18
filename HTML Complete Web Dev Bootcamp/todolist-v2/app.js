//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

const itemSchema = {
  name: String
}

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  name: "Welcome to todolist!"
})

const item2 = new Item({
  name: "Hit + to add new item"
})

const item3 = new Item({
  name: "<-- Hit this to delete an item"
})

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemSchema]
};
const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {

  const day = date.getDate();
  Item.find({}, function(err, foundItems){
    if(foundItems.length === 0){
      Item.insertMany(defaultItems, function(err){
        if(err){
          console.log(err);
        }else{
          console.log("Sucessfully saved to database!");
        }
      });
    }
    res.render("list", {listTitle: day, newListItems: foundItems});
  });

}); 

app.get("/:customListName", function(req, res) {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name:customListName}, function(err, foundList){
    if(!err) {
      if(!foundList){
        //create a new list
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        //Show an existing list
        res.render("list", {listTitle: customListName, newListItems: foundList.items});
      }
    }
  })
})

app.post("/", function(req, res){
  const itemName = req.body.newItem;
  const listName = req.body.list;

  var item = new Item({
    name: itemName
  });

  if(listName === "Today"){
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, function(err, foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    })
  }
});

app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;
  console.log(req.body);
  if(listName === "Today"){
    Item.findByIdAndRemove(checkedItemId, function(err) {
      if(!err) {
        console.log("Successfully Deleted Checked Item.");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList) {
      if(!err) {
        res.redirect("/" + listName);
      }
    });
  }

});


app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
