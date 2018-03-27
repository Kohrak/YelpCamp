var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds");


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();


//Passport config
app.use(require("express-session")({
  secret: "I like turtles",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
      res.render("campgrounds/index.ejs", {campgrounds: allCampgrounds});
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
  res.render("campgrounds/new.ejs")
})

//SHOW individual campground

app.get("/campgrounds/:id", function(req, res){
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

app.get("/campgrounds/:id/comments/new", function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if (err){
      console.log(err)
    } else {
        res.render("comments/new.ejs", {campground: campground})
    }
  })

})

app.post("/campgrounds/:id/comments", function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err)
      res.redirect("/campgrounds")
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if (err){
          console.log(err)
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id);
        }
      })
    }
  })
})

//Auth routes

app.get("/register", function(req, res){
  res.render("register");
})

app.post("/register", function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if (err){
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/campgrounds");
    });
  })
})

//show isLoggedIn
app.get("/login", function(req, res){
  res.render("login");
})

app.post("/login", passport.authenticate("local",
  {
      successRedirect: "/campgrounds",
      failureRedirect: "/login"
  }) ,function(req, res){
});
//Cloud9

// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("Yelp!");
// })


//Local

app.listen(3000, function(){
    console.log("Yelp!");
})
