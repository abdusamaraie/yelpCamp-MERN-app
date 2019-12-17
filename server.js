const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

//vars
var campgrounds = [
  {name:'samlmun creek',
  image: 'https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c72297fdd9644c750_340.jpg'}
,{name: 'rock mounten',
image:'https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'}
];

//Routes
app.get('/', (req,res)=>{
  res.render('home');
});

//show campgrounds names and images
app.get('/camps',(req,res)=>{
  res.render('camps',{campgrounds:campgrounds});
});

//post new campground
app.post('/camps',(req,res)=>{
  //get data from from and add to campgrounds array
  const name = req.body.name;
  const image = req.body.image;
  const newCamp = {name:name,image:image};
  //add to the array
  campgrounds.push(newCamp);
  //rerdirect back to camps page
  res.redirect('camps'); //redirect to the get page
});

//create new campground
app.get('/camps/new',(req,res)=>{
  res.render('new');
});
app.listen(3000,()=>{
  console.log('Server is running on port 3000!');
})
