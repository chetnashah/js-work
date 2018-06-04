

// call a function only when n ms have elapsed since the last call
function debounce(wrapFn, delayMs) {
    let timerId = null;
    return function f() {
        if (timerId) {
            clearTimeout(timerId);
            timerId = setTimeout(wrapFn, delayMs);
        } else {
            timerId = setTimeout(wrapFn, delayMs);
        }
    }
}

let dbclick = debounce(() => { console.log('I was clicked!')}, 5000);

dbclick();
dbclick();
dbclick();
// 5000 ms pass
// we get log