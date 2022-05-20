

// call a function only when n ms have elapsed since the last call
function debounce(wrapFn, delayMs) {
    let timerId = null;
    return function f(...args) { // support external args
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            wrapFn.apply(null, args);// this for callback will be null, along with args
        }, delayMs);
    }
}

let dbclick = debounce(() => { console.log('I was clicked!')}, 5000);

dbclick();
dbclick();
dbclick();
// 5000 ms pass
// we get log