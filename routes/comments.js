var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/");

//form to create a new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if (err){
      console.log(err)
    } else {
        res.render("comments/new.ejs", {campground: campground})
    }
  })

})
//add a new comment
router.post("/", middleware.isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err)
      res.redirect("/campgrounds")
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if (err){
          req.flash("error", "Something went wrong");
          console.log(err)
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          req.flash("success", "New Comment Added!");
          res.redirect("/campgrounds/" + campground._id);
        }
      })
    }
  })
})
//edit
router.get("/:comment_id/edit", middleware.checkCommentOwner, function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
      req.flash("error", "Comment not found");
      res.redirect("back");
    } else {
      res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
    }
  })
})

//update

router.put("/:comment_id", middleware.checkCommentOwner, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedCommment){
    if(err){
      req.flash("error", "Something went wrong");
      res.redirect("/back");
    } else {
      req.flash("success", "Comment updated");
      res.redirect("/campgrounds/" + req.params.id);
    }
  })
})

//DELETE
router.delete("/:comment_id", middleware.checkCommentOwner, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if (err){
      req.flash("error", "Something went wrong");
      res.redirect("back");
    } else {
      req.flash("error", "Comment deleted");
      res.redirect("/campgrounds/" + req.params.id);
    }
  })
})

module.exports = router;
