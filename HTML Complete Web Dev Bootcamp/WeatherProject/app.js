const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res) {
    var query= req.body.cityName;
    var unit = "metric"
    const key = "60deed65fd7082f641c9631501ced85f";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + key + "&units=" + unit;

    https.get(url, function(response) {

        console.log(response.statusCode);
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDiscription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<p>The weather is currnetly " + weatherDiscription + "<p>");
            res.write("<h1>The temperature in " + query + " is " + temp + "degrees celcius.</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        })
    })
})

app.listen(3000, function() {
    console.log("Server Started port 3000");
});