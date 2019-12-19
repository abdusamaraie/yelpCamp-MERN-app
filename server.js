const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//connect to database
mongoose.connect("mongodb://localhost:27017/yelpcamp_db", {
  useNewUrlParser: true
});
//create schema
const campSchema = mongoose.Schema({
  name: String,
  image: String
});

//add model
const Campground = mongoose.model("Campground", campSchema);

//Routes
app.get("/", (req, res) => {
  res.render("home");
});

//show campgrounds names and images
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

//post new campground
app.post("/camps", (req, res) => {
  //get data from from and add to campgrounds array
  const name = req.body.name;
  const image = req.body.image;
  const newCamp = { name: name, image: image };
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

//create new campground
app.get("/camps/new", (req, res) => {
  res.render("new");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
