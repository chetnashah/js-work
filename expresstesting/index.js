

var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.send('Hello world!');
});

app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});

// in browser enter localhost:3000

//1. Basic Routing
// app.METHOD(PATH, HANDLER);  where Methods are get,put; path is path on server; handler is function executed when route matched
// handler function always has two params : req, res
app.post('/', function(req, res) {
    res.send(' got a POST request at /');
});

// Test on cli with "curl -X METHOD localhost:3000" i.e. curl -X PUT localhost:3000/user
app.put('/user', function(req, res) {
    res.send(' got PUT request at /user');
});

// Test with curl -X DELETE localhost:3000/user
app.delete('/user', function (req, res) {
    res.send(' Got delete request for user');
});

// 2. Route paths and route parameters, paths are matched against incoming urls
app.get('/users/:userId/books/:bookId', function(req, res) {
    res.send(req.params);// object { user : userId , book: bookId} is captured in req.params

});




