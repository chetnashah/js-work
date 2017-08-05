
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let k= 0;
for (k=0; k < 10000; k++) {
  arr.push(k);
}
const used = process.memoryUsage();

console.log('used = ', used);

console.log('heap used percentage = ', ((used.heapUsed * 100) / used.heapTotal));

setTimeout(()=>{console.log("done : ", arr[1])}, 6000);
