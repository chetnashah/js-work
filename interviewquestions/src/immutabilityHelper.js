// https://bigfrontend.dev/problem/implement-Immutability-helper
// https://github.com/kolodny/immutability-helper

/**
 * 
 * Note target and given shape must match
 */

/**
 * The $-prefixed keys are called commands. 
 * The data structure they are "mutating" is called the target.
 * 
 * parentRef is important for $set and other cases where complete replace is necessary
 * @param {*} target 
 * @param {*} spec 
 * @returns 
 */
function update(target, spec, parentRef, parentKey) {
    console.log(target);
    console.log(spec);

    let currTarget = target;
    let currSpec = spec;
    let command = getCommand(spec);
    console.log(command)
    if(!command) {
        // recurse
        const allKeys = Object.keys(target);
        console.log(allKeys);
        for(let i=0;i<allKeys.length;i++) {// collect data from all keys
            const key = allKeys[i];
            console.log(key);
            if(!spec[key]){
                continue;
            }
            console.log(key);
            const updated = update(target[key], spec[key], target, key);// recursively ask to update

            console.log(updated);
            if(updated !== target[key]) {// if children were updated, we must fork the tree
                if(Array.isArray(currTarget)) {
                    const ans = [...currTarget];// not sure of direct pattern?
                    ans[key] = updated;
                    currTarget = [...ans];
                } else {
                    currTarget = {...currTarget, ...{[key]: updated}};
                }
            } else {// no need to fork the tree if children were not updated
                // return currTarget;
            }
        }
        return currTarget;
    } else { // command present
        switch(command) {
            case 'push': {
                return [...currTarget, ...(currSpec['$push'])];
            }
            case 'set': {
                console.log(currTarget);
                console.log(currSpec);
                console.log(parentRef);
                console.log(parentKey)
                const ans = {...parentRef, [parentKey]: currSpec['$set']};
                console.log(ans);
                return currSpec['$set'];
            }
            case 'merge': {
                if(typeof currTarget != "object") {
                    throw new Error('object expected');
                }
                console.log(currTarget);
                console.log(currSpec);
                console.log(parentRef);
                console.log(parentKey);
                const parentStuff = parentKey ? {...parentRef[parentKey]} : {...currTarget};// no parent means we are at top level so spread toplevel
                const ans = {...parentStuff, ...(currSpec['$merge'])};
                console.log(ans);
                return ans;
            }
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
    if(allKeys.includes('$apply')){
        return 'apply';
    }
    if(allKeys.includes('$merge')) {
        return 'merge';
    }
}



module.exports = {
    update,
};