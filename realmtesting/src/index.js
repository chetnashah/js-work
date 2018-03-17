console.log('hi world!!');

var express = require('express');
var winston = require('winston');
var RealmWinston = require('./RealmTransport');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
      new RealmWinston()
    ]
  });

var app = express();

app.get('/', (req, res) => {
    res.send('hi world get on /');
});


app.use(function (req, res) {
   res.status(404).send('Sorry can not find that!');
   logger.error('404 error at : '+ req.url);
});
  
app.listen(3000, function () {
    // eslint-disable-next-line no-console
  console.log('Example app listening on port 3000!');
});
  