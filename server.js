const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//connect to database
mongoose.connect("mongodb://localhost:27017/yelpcamp_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

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
      res.render("camps", { campgrounds: camps });
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
      res.redirect("camps"); //redirect to the get page
    }
  });
});

//NEW - show form to create new campground
app.get("/camps/new", (req, res) => {
  res.render("new");
});

//SHOW - one campground
app.get("/camps/:id/show", (req, res) => {
  //find the camp by id
  Campground.findById(req.params.id, (err, foundCamp) => {
    if (err) {
      console.log(err);
    } else {
      //render templete to show the campground
      res.render("show", { campground: foundCamp });
    }
  });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
