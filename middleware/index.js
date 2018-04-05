var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampOwner = function(req, res, next){
  if(req.isAuthenticated()){
    var campid = req.params.id
    Campground.findById(campid, function(err, campground){
      if (err){
         res.redirect("back");
      } else {
        if(campground.author.id.equals(req.user._id)){
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
}

middlewareObj.checkCommentOwner = function(req, res, next){
  if(req.isAuthenticated()){
    var commentid = req.params.comment_id
    Comment.findById(commentid, function(err, comment){
      if (err){
         res.redirect("back");
      } else {
        if(comment.author.id.equals(req.user._id)){
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
}

middlewareObj.isLoggedIn = function (req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "you have to log in first");
  res.redirect("/login");
}


module.exports = middlewareObj
