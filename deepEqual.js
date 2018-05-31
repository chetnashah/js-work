// a deep comparision method for checking value equality
// we are not comparing functions though, objects arrays etc.
function isEqual(a, b) {
    if (a === b) {
        return true;
    }

    // console.log(typeof a);
    // console.log(typeof b);
    if (typeof a !== "object" || typeof b !== "object"){
        return false;
    }

    const aprops = Object.getOwnPropertyNames(a);
    const bprops = Object.getOwnPropertyNames(b);
    if (aprops.length !== bprops.length) {
        console.log('prop len dont match');
        return false;
    }

    let flag = true;
    for (var j=0; j<aprops.length; j++) {
        propName = aprops[j];
        flag = flag && isEqual(a[propName], b[propName]);
    }

    return flag;

}

let ans = isEqual({1: 'hi'}, {1: 'hi'});
let ans2 = isEqual(new String('curly'), new String('curly'));
console.log(ans);
console.log(ans2);
// primitives with wrppers
console.log(isEqual(75, new Number(75)));
console.log(isEqual(true, new Boolean(true)));
console.log(isEqual([],[]));


// `A` contains nested objects and arrays.
a = {
    name: new String('Moe Howard'),
    age: new Number(77),
    stooge: true,
    hobbies: ['acting'],
    film: {
        name: 'Sing a Song of Six Pants',
        release: new Date(1947, 9, 30),
        stars: [new String('Larry Fine'), 'Shemp Howard'],
        minutes: new Number(16),
        seconds: 54
    }
    };

    // `B` contains equivalent nested objects and arrays.
    b = {
    name: new String('Moe Howard'),
    age: new Number(77),
    stooge: true,
    hobbies: ['acting'],
    film: {
        name: 'Sing a Song of Six Pants',
        release: new Date(1947, 9, 30),
        stars: [new String('Larry Fine'), 'Shemp Howard'],
        minutes: new Number(16),
        seconds: 54
    }
    };

// recursive comparision
console.log(isEqual(a, b));
console.log(isEqual([{}], [{}]));
console.log(isEqual({a: 63, b: 75}, {a: 61, c: 55}));
