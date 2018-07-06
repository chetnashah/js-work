var express = require('express');
var socketio = require('socket.io');
var app = express();

var server = app.listen(4000, function(){
    console.log('listening at :4000');
});

// static files

app.use(express.static('public'));
app.on('request', () => {
    console.log('somebody gave connection event to app');
})

var io = socketio(server);
io.on('connection', function(socket){
    console.log('made -> on connection!!');
})