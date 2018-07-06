var cluster = require('cluster');

if (cluster.isMaster) {
  cluster.fork({ 'wport': 3001 });// fork as args env for child proc
  cluster.fork({ 'wport': 3002 });
  cluster.fork({ 'wport': 3003 });
  cluster.fork({ 'wport': 3004 });
} else { // worker code

  var express = require('express');

  var app = express();

  // pure js eventloop starvation
  // via this spinning
  function doCPUWork(durationMs) {
    const start = Date.now();
    while (Date.now() - start < durationMs) {

    }
  }

  app.get('/', (req, res) => {
    doCPUWork(4000);
    res.send('Hi there');
  });

  app.listen(process.env.wport);

}