
function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Date.now());
    }, ms);
  });
}

delay(30000).then((val) => {
  console.log('val = ', val);
});
