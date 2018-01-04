'use strict';

var _arguments = arguments,
    _o,
    _usr;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 1. default parameter values for functions
// function always expects first argument to be passed, rest are sensible defaults
function makeRequest(url) {
  var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
  var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
    console.log('default');
  };

  console.log('url = ', url);
  console.log('timeout = ', timeout);
  if (timeout > 20) {
    cb();
  }
}

makeRequest();

// to use default value for a parameter, you have to pass undefined, null does not work
makeRequest('adf', undefined, function () {
  console.log('aha');
});

console.log('===============================================');
// 2. default parameter values affecting arguments object

// a good idea is to never re assign passed parameters
// default parameter values are not a part of arguments obj
// they always accurately reflect only what caller sent
function mixargs(first) {
  var second = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'b';

  console.log('arguments.length = ', arguments.length);
  console.log('first === arguments[0] -> ', first === arguments[0]);
  console.log('second === arguments[1] -> ', second === arguments[1]);
}

mixargs('a');

console.log('================================================');
// 3. default parameter expressions
// the default parameter need not be a primitive value, it can be an expression
// that returns a value

function getValue() {
  return 99;
}

function add(fst) {
  var snd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getValue();

  return fst + snd;
}

console.log('add(1,1) = ', add(1, 1));
console.log('add(1) = ', add(1));

console.log('===================================================');
// 4. the paraemeters that come later in function declaration
// can use previous parameter value as the default for later parameter

function getValueX(value) {
  return value + 5;
}

function addx(fst) {
  var snd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getValueX(fst);

  return fst + snd;
}

console.log('addx(1,1) = ', addx(1, 1));
console.log('addx(1) = ', addx(1));

console.log('===================================================');
// 5. default parameters TDZ
// Hence, earlier parameters cannot access value of later parameters

function addz() {
  var fst = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : snd;
  var snd = arguments[1];
  // accessing later parameter in earlier one throws error!
  return fst + snd;
}
try {
  addz(undefined, 1);
} catch (error) {
  console.log('caught error = ', error.message);
}

// Function parameters have their own scope and their own TDZ
// that is seperate from function body scope.
// This means default value of parameter cannot access any variables defined
// inside function body

console.log('==================================================');
// 6. working with unnamed parameters/Rest parameter
// In javascript you can always pass fewer or more parameters than formally specified.
// now we see working with passing more parameters than defined

// in es5 you would be able to inspect all arguments with arguments object but it is cumbersome
// in es6 you have rest parameters to capture rest of arguments in a list

// * restriction1 : there can be only one rest parameter and it should be last parameter
// * restriction2 : rest parameters cannot be used in object literal setter
function pick(obj) {
  // pick the list of keys and return object with the picked keys
  var result = Object.create(null);

  for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keys[_key - 1] = arguments[_key];
  }

  for (var i = 0; i < keys.length; i += 1) {
    result[keys[i]] = obj[keys[i]];
  }
  return result;
}

var me = { name: 'Nikolas', age: 22, work: 'CS' };
console.log('pick(me, "age", "name") = ', pick(me, 'age', 'name'));

// how rest params work with arguments object
// arguments object always correctly reflects parameters at call site, regardless
// of rest parameter usage
function checkArgs() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  console.log('args.length = ', args.length);
  console.log('arguments.length = ', arguments.length);
  console.log(args[0], arguments[0]);
  console.log(args[1], arguments[1]);
}

checkArgs('a', 'b');

// arguments object always correctly reflects parameters at call site, regardless
// of rest parameter usage
function checkOtherArgs(fst) {
  for (var _len3 = arguments.length, otherargs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    otherargs[_key3 - 1] = arguments[_key3];
  }

  console.log('otherargs.length = ', otherargs.length);
  console.log('otherarguments.length = ', arguments.length);
  console.log(otherargs[0], arguments[0]);
  console.log(otherargs[1], arguments[1]);
}

checkOtherArgs(1, 2, 3, 4);
console.log('===================================================');
// 7. all functions should have meaningful names
//    for the purposes of debugging, below are cases:

// normal function declarations
function aha() {
  console.log('aha called!');
}

console.log('aha.name = ', aha.name);

// anonymous function expression assigned to a variable
var what = function what(k) {
  return k + 2;
};
console.log('what.name = ', what.name);
// same goes for arrow functions
var big = function big(l) {
  return l * 10000;
};
console.log('big.name = ', big.name);

// named function expression to a variable, function expression name takes priority
var why = function wellwell(u) {
  return u + 1;
};
console.log('why.name = ', why.name);

// bound functions will tell "bound originalfunc"
var bf = aha.bind(undefined);
console.log('bf.name = ', bf.name);

console.log('==================================================');
// Arrow functions
// syntax : (arg1, arg2, ... ) => { body }
//     or : (arg1, arg2, ... ) => (retvalue)

// 1. can't change this, this is outer this.
// 2. cannot be called with "new" bcoz no [[Construct]]
// 3. no prototype present
// 4. no arguments object present in this type of function
// 5. no duplicate names of parameters

var arrowfun = function arrowfun(x) {
  console.log('arrowfun arguments are from outside arrow fun = ', _arguments);return x;
};

// testing 2
try {
  var cc = new arrowfun(1);
} catch (e) {
  console.log(' tried calling new on arrow function -> ', e.name + ': ' + e.message);
}

// testing 3
console.log('arrowfun.prototype = ', arrowfun.prototype);

// testing 4
arrowfun(3);

// testing 5
try {
  // syntax error will not compile
  // const ww = (m, m) => (m + m);
} catch (e) {
  console.log('tried having duplicate parameter names for arrow function -> ', e.name + ': ' + e.message);
}

console.log("=================================================================");
// Improvements on Objects
// 1. object property shorthand syntax
// instead of doing { name: name } just use { name }

var name = 'Nikolas';
var age = 22;
var person = { name: name, age: age };
console.log('person = ', person);

// 2. concise method syntax
// instead of doing sayName: function() {}
// just do sayName(){}
var p1 = {
  name: name,
  sayName: function sayName() {
    console.log('this.name = ', this.name);
  }
};
p1.sayName();

// Important! 3. Computed property names
// if you want object property names to be computed, put them inside []
var prop = 'foo';
var o = (_o = {}, _defineProperty(_o, prop, "aha"), _defineProperty(_o, 'b' + 'ar', 'Nikolas'), _o);
console.log(o);

// 4. Object.is is same as === other than the fact that it treats NaN properly.
// Object.is/=== compare values, and objects only by reference.


// 5. Object.assign does a shallow own property copy from supplier to receiver hence mutating receiver
// hence object reference is copied property values are objects
// also overrites property values of the same key in recvr
var holder = { age: 11, specs: { workTime: 1000 } };
var recvr = {};
// there can be a single receiver and any number of suppliers in Object.assign, and if property names clash,
// value of later supplier's is considered.
Object.assign(recvr, { type: 'js', name: 'file.js' }, { type: 'css' }, holder);
console.log(recvr);
recvr.specs.workTime = 2000;
console.log(holder); // workTime inside holder also changed becaused object was shared by reference during Object.assign


// 6. Duplicate object literal properties,
// In case of more than one property of same name, later one is considered
var usr = (_usr = { name: 'haka' }, _defineProperty(_usr, 'name', 'loka'), _defineProperty(_usr, 'age', 11), _usr); // loka is considered for name
console.log(usr);

console.log('=====================Destructuring test==========================');

var circle = {
  radius: 10,
  color: 'orange',
  getArea: function getArea() {
    return Math.PI * this.radius * this.radius;
  },
  getCircumference: function getCircumference() {
    return 2 * Math.PI * this.radius;
  }
};

console.log(circle.getArea());

try {
  var areacalc = circle.getArea;
  console.log(areacalc()); // callsite this is global which does not have radius.
} catch (e) {
  console.log('try to access this.radius from a renamed function, callsite matters ::: ', e);
}

// "this" is not preserved on destructuring returning functions
try {
  var radius = circle.radius,
      getArea = circle.getArea,
      getCircumference = circle.getCircumference;

  var ans = getArea();
} catch (e) {
  console.log('tried to access this of a destructured function ', e);
}

console.log('===============================================');