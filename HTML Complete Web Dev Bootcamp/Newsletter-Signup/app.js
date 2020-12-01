const express = require("express");
const bodyParesr = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParesr.urlencoded({extended: true}));
app.use(express.static("public"));

app.post("/", function(req, res) {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us4.api.mailchimp.com/3.0/lists/4bcf3cbb34";

    const options = {
        method: "POST",
        auth: "vatsal:fd8d2a94f77b14c7c113e1d4a29c61201-us4"
    }

    //we save our request and later we can send the request by calling request.write
    const request = https.request(url, options, function(response) {
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }
    })
  
    request.write(jsonData);
    request.end();


    
})

app.post("/failure", function(req, res) {
    res.redirect("/");
})

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.listen(3000, function() {
    console.log("Server Started at port 3000");
})