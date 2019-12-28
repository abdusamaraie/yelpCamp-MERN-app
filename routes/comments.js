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

//EDIT - route
router.get("/:comment_id/edit", checkCommentOwner, (req, res) => {
  Comment.findById(req.params.comment_id, (err, comment) => {
    if (err) {
      res.redirect("back");
    } else {
      res.render("comments/edit", {
        campground_id: req.params.id,
        comment: comment
      });
    }
  });
});
//UPDATE - comment route
router.put("/:comment_id/", checkCommentOwner, (req, res) => {
  Comment.findByIdAndUpdate(
    req.params.comment_id,
    req.body.comment,
    (err, updatedComment) => {
      if (err) {
        res.redirect("back");
      } else {
        res.redirect("/camps/" + req.params.id + "/show");
      }
    }
  );
});

// DESTROY - route for comment
router.delete("/:comment_id", checkCommentOwner, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, err => {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/camps/" + req.params.id + "/show");
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

function checkCommentOwner(req, res, next) {
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
}

module.exports = router;
