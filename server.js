const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

//vars
var campgrounds = [
  {name:'samlmun creek',
  image: '/imgs/4522970.png'},
  {name: 'rock mounten',
  image:'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'}
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
