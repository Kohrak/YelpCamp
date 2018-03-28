var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
//Campgrounds Routes

//display all campgrounds
router.get("/", function(req, res){
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err)
    } else {
      res.render("campgrounds/index.ejs", {campgrounds: allCampgrounds});
    }
  });

})

//add new campground
router.post("/", function(req, res){
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

//form to create a new campground

router.get("/new", function(req, res){
  res.render("campgrounds/new.ejs")
})

//SHOW individual campground info

router.get("/:id", function(req, res){
  var campid = req.params.id
  Campground.findById(campid).populate("comments").exec(function(err, foundCamp){
    if (err){
      console.log(err);
    } else {
      res.render("campgrounds/show", {campground: foundCamp});
    }
  })
;
})

module.exports = router;
