var Campground = require("../models/campground"),
  Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please Login First");
  res.redirect("/login");
};

middlewareObj.checkCommentOwner = function checkCommentOwner(req, res, next) {
  //check if user is logged in
  if (req.isAuthenticated()) {
    //check if comment exist
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        res.redirect("back");
      } else {
        // check if user ownes the comment
        if (foundComment.auther.id.equals(req.user.id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
};

middlewareObj.checkCampgroundOwner = function checkCampgroundOwner(
  req,
  res,
  next
) {
  //check if user is logged in
  if (req.isAuthenticated()) {
    //check if camp exist
    Campground.findById(req.params.id, (err, foundCamp) => {
      if (err) {
        res.redirect("back");
      } else {
        // check if user ownes the camp
        if (foundCamp.auther.id.equals(req.user.id)) {
          next();
        } else {
          //redirect accurding to state
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
};

module.exports = middlewareObj;
