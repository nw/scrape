var request = require('request')
  , cheerio = require('cheerio')
  , students = null;

module.exports = function(req, res, next){
  if(students) {
    req.students = students;
    next();
  } else {
    request('http://webdevbootcamp.github.io/students/', function(err, resp, body){
      if(err) return next(err);
      students = processWebDevSite(body);
      req.students = students;
      next();
    });

  }
}

function processWebDevSite(content) {
  var data = [];

  var $ = cheerio.load(content); // Create a 'DOM'
  var students = $('tbody tr'); // ensure we only have students not header or footer rows.


  students.each(function(idx, student){
    var cells = $(student).find('td');

    data.push({
      url: $(cells[0]).find('a').attr('href')
    , name: $(cells[2]).text()
    , github: $(cells[3]).text()
    , twitter: $(cells[4]).text()
    });

  });

  return data;
}
