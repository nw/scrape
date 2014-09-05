var express = require('express')
  , bodyParser = require('body-parser')
  , scrapeStudentsMiddleware = require('./scrape');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');

app.use('/', express.static(__dirname + '/public'));


app.use(scrapeStudentsMiddleware);

app.get('/', function(req, res){
  console.log("req students", req.students);

  res.render('home', {
    students: req.students
  });

})


var server = app.listen(3000, function(){
  console.log('Listening on port %d', server.address().port);
});
