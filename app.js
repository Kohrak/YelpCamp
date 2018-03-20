var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Schema

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);



app.get("/", function(req, res){
    res.render("landing");
})

app.get("/campgrounds", function(req, res){
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err)
    } else {
      res.render("campgrounds", {campgrounds: allCampgrounds});
    }
  });

})

app.post("/campgrounds", function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image}
  Campground.create(newCampground, function(err, newcamp){
    if(err){
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  })

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
