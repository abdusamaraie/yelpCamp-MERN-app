const express = require('express');
const app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'));
//Routes
app.get('/', (req,res)=>{
  res.render('home');
});

app.get('/camps',(req,res)=>{
  var campgrounds = [
    {name:'samlmun creek',
    image: '/imgs/4522970.png'}
  ];

  res.render('camps',{campgrounds:campgrounds});
});

app.listen(3000,()=>{
  console.log('Server is running on port 3000!');
})
