var express = require("express"),
  router = express.Router({ mergeParams: true }),
  Campground = require("../models/campground");

//INDEX - show all campground names and images
router.get("/", (req, res) => {
  //get campgrounds from db
  Campground.find({}, (err, camps) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/camps", {
        campgrounds: camps,
        currentUser: req.user
      });
    }
  });
});

//CREATE - post new campground
router.post("/", isLoggedIn, (req, res) => {
  //get data from from and add to campgrounds array
  const name = req.body.name;
  const image = req.body.image;
  const desc = req.body.description;
  const auther = { id: req.user._id, username: req.user.username };
  const newCamp = {
    name: name,
    image: image,
    description: desc,
    auther: auther
  };
  //add to the array
  //campgrounds.push(newCamp);
  //create new campground and save to db
  Campground.create(newCamp, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      //rerdirect back to camps page
      res.redirect("../camps"); //redirect to the get page
    }
  });
});

//NEW - show form to create new campground
router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

//SHOW - one campground
router.get("/:id/show", (req, res) => {
  //find the camp by id
  Campground.findById(req.params.id)
    .populate("comments")
    .exec((err, foundCamp) => {
      if (err) {
        console.log(err);
      } else {
        //render templete to show the campground
        res.render("campgrounds/show", { campground: foundCamp });
      }
    });
});

// EDIT - campground
router.get("/:id/edit", (req, res) => {
  Campground.findById(req.params.id, (err, foundCamp) => {
    if (err) {
      console.log(err);
      res.redirect("../camps");
    } else {
      res.render("campgrounds/edit", { campground: foundCamp });
    }
  });
});
// UPDATE - campground
router.put("/:id", (req, res) => {
  //find and update the correct camp
  Campground.findByIdAndUpdate(
    req.params.id,
    req.body.campground,
    (err, updatedCamp) => {
      if (err) {
        console.log(err);
        res.redirect("../camps");
      } else {
        //redirect to show page
        console.log(updatedCamp);
        res.redirect("../camps/" + req.params.id + "/show");
      }
    }
  );
});
//middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
module.exports = router;
