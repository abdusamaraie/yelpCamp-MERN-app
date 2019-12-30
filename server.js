const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  localStrategy = require("passport-local"),
  User = require("./models/user"),
  methodOverride = require("method-override"),
  flash = require("connect-flash"),
  seedDB = require("./seed");

// Requiring routes
var campgroundRoute = require("./routes/campgrounds"),
  commentRoute = require("./routes/comments"),
  indexRoute = require("./routes/index");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//connect to database
mongoose.connect("mongodb://localhost:27017/yelpcamp_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Passport config
app.use(
  require("express-session")({
    secret: "this is top secret",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// flash messeges
app.use(flash());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

//seedDB();
//create new campground
// Campground.create({
//   name: "Napolian hill",
//   image:
//     "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//   description: "The is the most beatiful campground in town, with clear sky"
// });

app.use(indexRoute);
app.use("/camps", campgroundRoute);
app.use("/camps/:id/comments", commentRoute);

app.listen(3000 || process.env.PORT, () => {
  console.log("Server is running on port 3000!");
});
