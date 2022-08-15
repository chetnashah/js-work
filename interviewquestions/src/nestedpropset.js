// https://bigfrontend.dev/problem/lodash-set

/**
 * Given an object, nested-path, and a value,
 * set the value on the objected at nested-path,
 * creating objects in the process if necessary.
 * 
 * path- may be a dotted string or array of prop 
 * 
 * Arrays are created for missing index properties
 */

function set(obj, path, val) {
    let pathProps = path;
    if(!Array.isArray(path)) {
        // normalize and split props for processing
        pathProps = path.replace("[", ".").replace("]", "").split(".");
    }

    let curr = obj;
    for(let i=0;i<pathProps.length;i++) {
        const prop = pathProps[i];
        // nextProp is necessary to see if index i.e. number prop is coming up, then curr should replace to use array
        const nextProp = pathProps[i+1];
        if(!curr.hasOwnProperty(prop)) {
            console.log('curr = ' + curr + ' prop = '+ prop);
            curr[prop] = {};
        }
        if(i === pathProps.length -1) {
            // last prop is where assignment should happen
            curr[prop] = val;
        } else {
            // if numerical indexes are used in path, but array does not exist, replace by array.
            if(!isNaN(nextProp) && !Array.isArray(curr[prop])) {
                curr[prop] = [];
            }
            // if we expect an object, but a string or some non-object is present next, replace it.
            if(nextProp && (typeof curr[prop] != "object")) {
                curr[prop] = {};
            }
            // traverse for non-last prop
            curr = curr[prop];
        }
    }
}

module.exports = {
    set
};