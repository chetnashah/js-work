var Rx = require('rx');
// fetch for node js
var fetch = require('node-fetch');

var RSVP = require('rsvp');
fetch.Promise = RSVP.Promise;// inserting our favorite promise library for fetch


// plain text or html
fetch('https://github.com/')
	.then(res => res.text())
	.then(body => console.log(body));

// json
fetch('https://api.github.com/users/github')
	.then(res => res.json())
	.then(json => console.log(json));

// catching network error
// 3xx-5xx responses are NOT network errors, and should be handled in then()
// you only need one catch() at the end of your promise chain
fetch('http://domain.invalid/')
	.catch(err => console.error(err));

