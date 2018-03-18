var express = require("express");
var app = express();
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
})

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        {name:"Magic Camp" , image: "https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144394f3c770a2e5b0_340.jpg"},
        {name:"Frozen Camp", image: "https://pixabay.com/get/eb35b70b2df6033ed1584d05fb1d4e97e07ee3d21cac104497f1c27faee8bdbd_340.jpg"}
    ];
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp!");
})