const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fruitsDB"), { useNewUrlPaeser: true };

const fruitSchema = new mongoose.Schema ({
    name: String,
    rating: Number,
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
    name: "Apple",
    rating: 7,
    review: "Dont want a doctor"
});

fruit.save();

Fruit.find(function(err, fruits) {
    if(err) {
        console.log(err);
    }else {
        mongoose.connection.close();
        fruits.forEach(function(fruit) {
            console.log(fruit.name);
        })
        console.log(fruits);
    }

});
