const express = require('express');
const expressHandleBars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');

const port = 3000
const app = express();

//create a redis client

let client = redis.createClient();
client.on('connect' , function(){
  console.log('connected to redis');
});


//view engine
app.engine('handlebars',expressHandleBars({defaultLayout : 'main'}));
app.set('view engine' , 'handlebars');

//body parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use(methodOverride('_method'));

//Search page
app.get('/' , function(req, res , next){
  res.render('searchusers');
});


app.get('/user/adduser' , function(req, res , next){
  res.render('adduser');
});



//Search processing

app.post('/user/search' , function(req,res,next) {
  let id = req.body.id;

  console.log('id');

  client.hgetall(id  , function(err , obj){
    if(!obj) {
      res.render('searchusers' , {
        error : 'User doesn\'t exist'
      });
      console.log('user doesnt exist');
    }else{
      obj.id = id;
      res.render('details' , {
        user:obj
      });

      console.log('user doesn t exist');

    }
  });
});

app.listen(port , function(){
  console.log('server started at '+port);
});
