var express = require("express");
var app = express();
var bodyParser = (require("body-parser"))

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render("landing");
})

var campgrounds = [
    {name:"Magic Camp" , image: "https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144394f5c271a1e9b7_340.jpg"},
    {name:"Frozen Camp", image: "https://pixabay.com/get/eb35b70b2df6033ed1584d05fb1d4e97e07ee3d21cac104497f1c47aafebb1ba_340.jpg"}
];

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.post("/campgrounds", function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  campgrounds.push({name: name, image: image});
  res.redirect("/campgrounds");
})

app.get("/campgrounds/new", function(req, res){
  res.render("new.ejs")
})

//Cloud9

// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("Yelp!");
// })


//Local

app.listen(3000, function(){
    console.log("Yelp!");
})
