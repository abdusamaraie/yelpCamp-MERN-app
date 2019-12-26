const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  seedDB = require("./seed");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

//connect to database
mongoose.connect("mongodb://localhost:27017/yelpcamp_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

seedDB();
//create new campground
// Campground.create({
//   name: "Napolian hill",
//   image:
//     "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//   description: "The is the most beatiful campground in town, with clear sky"
// });
//Routes
app.get("/", (req, res) => {
  res.render("home");
});

//INDEX - show all campground names and images
app.get("/camps", (req, res) => {
  //get campgrounds from db
  Campground.find({}, (err, camps) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/camps", { campgrounds: camps });
    }
  });
});

//CREATE - post new campground
app.post("/camps", (req, res) => {
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
app.get("/camps/new", (req, res) => {
  res.render("campgrounds/new");
});

//SHOW - one campground
app.get("/camps/:id/show", (req, res) => {
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
// ##############
// COMMENT ROUTES
// #############

// NEW ROUTE
app.get("/camps/:id/comments/new", (req, res) => {
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
app.post("/camps/:id/comments", (req, res) => {
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
app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
