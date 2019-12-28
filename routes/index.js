var express = require("express"),
  router = express.Router({ mergeParams: true });
(passport = require("passport")), (User = require("../models/user"));

//Home index route
router.get("/", (req, res) => {
  res.render("home");
});

// AUTH ROUTES

//register user
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      req.flash("error", err.message);
      return res.redirect("/register");
    }
    passport.authenticate("local")(req, res, function() {
      req.flash("success", "Welcom to YelpCamp, " + user.username);
      res.redirect("../camps");
    });
  });
});

//show login form
router.get("/login", (req, res) => {
  res.render("login");
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "../camps",
    failureRedirect: "/login"
  }),
  (req, res) => {}
);

//logout route
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "You Logged Out");
  res.redirect("/");
});

module.exports = router;
