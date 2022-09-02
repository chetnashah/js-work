console.log('start');

// prints numbers from 1 to n with a gap of 2 sec
function printNums(n) {
    var i = 1;
    var f = function() {// capture counter and n
        console.log(i);
        i++;
        if (i<=n) {
            setTimeout(f, 2000);// recursive scheduling
        }
    }
    return f;
}

printNums(5)();


