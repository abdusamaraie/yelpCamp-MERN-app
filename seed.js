var mongoose = require("mongoose"),
  Campground = require("./models/campground");
Comment = require("./models/comment");

var data = [
  {
    name: "Cluds sky",
    image:
      "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__340.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda eligendi odio sapiente dolores aliquam ea placeat eum. Voluptas placeat minima architecto reprehenderit. Soluta, unde numquam. Earum ab laborum libero necessitatibus."
  },
  {
    name: "desert blue",
    image:
      "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201__340.jpg",
    description:
      " sdfsdf Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda eligendi odio sapiente dolores aliquam ea placeat eum. Voluptas placeat minima architecto reprehenderit. Soluta, unde numquam. Earum ab laborum libero necessitatibus. bla sky camp of the world"
  },
  {
    name: "Green world",
    image:
      "https://cdn.pixabay.com/photo/2019/10/03/11/14/camp-4522970__340.jpg",
    description:
      " sdfsdf Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda eligendi odio sapiente dolores aliquam ea placeat eum. Voluptas placeat minima architecto reprehenderit. Soluta, unde numquam. Earum ab laborum libero necessitatibus. bla sky camp of the world"
  }
];
function seedDB() {
  Campground.deleteMany({}, function(err) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log("data removed");
    //     data.forEach(function(seed) {
    //       Campground.create(seed, function(err, camp) {
    //         if (err) {
    //           console.log(err);
    //         } else {
    //           console.log("campground added");
    //           Comment.create(
    //             {
    //               text: " this is a greate place to be a comment ",
    //               auther: "Homer"
    //             },
    //             function(err, comment) {
    //               if (err) {
    //                 console.log(err);
    //               } else {
    //                 camp.comments.push(comment);
    //                 camp.save();
    //                 console.log("comments created");
    //               }
    //             }
    //           );
    //         }
    //       });
    //     });
    //   }
  });
  //add a few campgrounds
  //add a few comments
}

module.exports = seedDB;
