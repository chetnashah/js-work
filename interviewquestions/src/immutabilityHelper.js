// https://bigfrontend.dev/problem/implement-Immutability-helper
// https://github.com/kolodny/immutability-helper

/**
 * 
 * Note target and given shape must match
 */

/**
 * The $-prefixed keys are called commands. 
 * The data structure they are "mutating" is called the target.
 * @param {*} target 
 * @param {*} spec 
 * @returns 
 */
function update(target, spec) {
    console.log(target);
    console.log(spec);

    let currTarget = target;
    let currSpec = spec;
    let command = getCommand(spec);
    console.log(command)
    if(!command) {
        // recurse
    } else { // command present
        switch(command) {
            case 'push':
                currTarget = [...currTarget, ...(currSpec['$push'])];
                break;
            case 'set':
                break;
        }
    }

    return currTarget;
}

function getCommand(obj) {
    if(!obj) {
        return null;
    }
    const allKeys = Object.keys(obj);
    if(allKeys.includes("$push")) {
        return 'push';
    }
    if(allKeys.includes('$set')) {
        return 'set';
    }
}



module.exports = {
    update,
};