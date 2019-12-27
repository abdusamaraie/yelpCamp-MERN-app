var express = require("express"),
  router = express.Router({ mergeParams: true }),
  Campground = require("../models/campground"),
  Comment = require("../models/comment");

// NEW ROUTE
router.get("/new", isLoggedIn, (req, res) => {
  //find campground by id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: campground });
    }
  });
});

//CREATE - comment
router.post("/", isLoggedIn, (req, res) => {
  //find camp by id to add comment to it
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      //create a comment
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          //add and id user to comment
          comment.auther.id = req.user._id;
          comment.auther.username = req.user.username;
          comment.save();
          //push comment to campground
          campground.comments.push(comment);
          //save it to db
          campground.save();
          // redirect to show
          res.redirect("/camps/" + req.params.id + "/show");
        }
      });
    }
  });
});

//middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
