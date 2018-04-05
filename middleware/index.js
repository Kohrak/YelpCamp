var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampOwner = function(req, res, next){
  if(req.isAuthenticated()){
    var campid = req.params.id
    Campground.findById(campid, function(err, campground){
      if (err){
         req.flash("error", "Campground not found! oh no!");
         res.redirect("back");
      } else {
        if(campground.author.id.equals(req.user._id)){
          next();
        } else {
          req.flash("error", "You don't have permission to do that");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("back");
  }
}

middlewareObj.checkCommentOwner = function(req, res, next){
  if(req.isAuthenticated()){
    var commentid = req.params.comment_id
    Comment.findById(commentid, function(err, comment){
      if (err){
         req.flash("error", "Oh no! Comment not found!");
         res.redirect("back");
      } else {
        if(comment.author.id.equals(req.user._id)){
          next();
        } else {
          req.flash("error", "You don't have permission to do that");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("back");
  }
}

middlewareObj.isLoggedIn = function (req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "You need to be logged in to do that!");
  res.redirect("/login");
}


module.exports = middlewareObj
