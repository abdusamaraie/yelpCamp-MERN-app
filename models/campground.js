var mongoose = require("mongoose");

//create schema
const campSchema = mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

//export model
module.exports = mongoose.model("Campground", campSchema);
