var mongoose = require("mongoose");

//create schema
const campSchema = mongoose.Schema({
  name: String,
  image: String,
  description: String
});

//export model
module.exports = mongoose.model("Campground", campSchema);
