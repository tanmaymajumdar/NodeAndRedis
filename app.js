const express = require('express');
const expressHandleBars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');

const port = 3000
const app = express();

//view engine
app.engine('handlebars',expressHandleBars({defaultLayout : 'main'}));
app.set('view engine' , 'handlebars');

//body parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use(methodOverride('_method'));

app.get('/' , function(req, res , next){
  res.render('searchusers');
});

app.listen(port , function(){
  console.log('server started at '+port);
});
