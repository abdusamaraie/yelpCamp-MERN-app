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
  const newCamp = { name: name, image: image, description: desc };
  //add to the array
  //campgrounds.push(newCamp);
  //create new campground and save to db
  Campground.create(newCamp, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      //rerdirect back to camps page
      res.redirect("/campgrounds/camps"); //redirect to the get page
    }
  });
});

//NEW - show form to create new campground
router.get("/new", (req, res) => {
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

//middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
module.exports = router;
