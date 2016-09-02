var express = require('express')

var port = 3000;
var app = express();

app.use(express.static('src/client'))
.get('/', function(req, res) {
  res.send('index')
})
.listen(port, function() {
  console.log('listening on port', port)
})
