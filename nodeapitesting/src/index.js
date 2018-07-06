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