// make connection
// running in the browser

// this internally calls new Websocket(uri) 
// which is standard browser api
// for connecting to server on socket
var socket = io.connect('http://localhost:4000');
