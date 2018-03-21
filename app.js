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
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

//Routes

//Landing Page

app.get("/", function(req, res){
    res.render("landing");
})

//INDEX campgrounds

app.get("/campgrounds", function(req, res){
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err)
    } else {
      res.render("index", {campgrounds: allCampgrounds});
    }
  });

})

app.post("/campgrounds", function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description
  var newCampground = {name: name, image: image, description: description}
  Campground.create(newCampground, function(err, newcamp){
    if(err){
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  })

})

//NEW create new campground

app.get("/campgrounds/new", function(req, res){
  res.render("new.ejs")
})

//SHOW individual campground

app.get("/campgrounds/:id", function(req, res){
  var campid = req.params.id
  Campground.findById(campid, function(err, foundCamp){
    if (err){
      console.log(err);
    } else {
      res.render("show", {campground: foundCamp});
    }
  })
;
})

//Cloud9

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp!");
})


//Local

// app.listen(3000, function(){
//     console.log("Yelp!");
// })
