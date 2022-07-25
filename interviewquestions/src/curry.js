function curry(callback) {
    // if number of arguments is total possible arguments, call it, or else return
    // an intermediate function
    function ret(...args) {
        if (args.length === 0) {
            return callback();
        } else {
            return function (...a) {
                if (a.length === 0) {
                    return callback(...args, ...a);
                } else {
                    return ret(...args, ...a);
                }
            }
        }
    }
    return ret;
}

// recursive solution with bind
function curry2(callback) {
    return function(...args) {
        if(args.length === 0) {
            return callback();
        } else {
            return curry2(callback.bind(this, ...args));
        }
    }
}