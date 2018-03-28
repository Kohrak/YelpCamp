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
router.post("/", isLoggedIn, function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCampground = {name: name, image: image, description: description, author: author}
  Campground.create(newCampground, function(err, newcamp){
    if(err){
      console.log(err);
    } else {
      newcamp.save();
      res.redirect("/campgrounds");
    }
  })

})

//form to create a new campground

router.get("/new", isLoggedIn, function(req, res){
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

router.get("/:id/edit", function(req, res){
  var campid = req.params.id
  Campground.findById(campid, function(err, campground){
    if (err){
      return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", {campground: campground});
  })
  ;
})

router.put("/:id", function(req, res){
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if (err){
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  })
});

router.delete("/:id", function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  })
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
