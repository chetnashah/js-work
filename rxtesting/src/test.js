
function printNumberOfTimes (msg, n) {
  for (var i=0; i<n; i++) {
    console.log(msg);
  }
}

printNumberOfTimes('Hello world', 1);

setTimeout(()=> console.log('Hello from stout after 1s'), 1000);

function* theMeaningOfLife() {
  yield 42;
}

