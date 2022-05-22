

// call a function only when n ms have elapsed since the last call
// common mistakes: forgetting args or this
function debounce(wrapFn, delayMs) {
    let timerId = null;
    return function f(...args) { // support external args
        // maintain context via capturing this
        var context = this;
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            wrapFn.apply(context, args);// this for callback will be null, along with args
        }, delayMs);
    }
}

let dbclick = debounce(() => { console.log('I was clicked!')}, 5000);

dbclick();
dbclick();
dbclick();
// 5000 ms pass
// we get log

// using it in DOM listeners
/*
var debouncedHandler = debounce(function(ev) {
    var scrollTop = this.scrollTop;
    var clientHeight = this.clientHeight;
    var scrollHeight = this.scrollHeight;
  
    if(scrollTop + clientHeight > scrollHeight - 50) {
      console.log('almost reaching end of the page');
    }
  }, 500);
  
  testimonialContainer.addEventListener('scroll', debouncedHandler);
  */