
var age = 100;

var name = "Nikolas";

function getAge() {
    return age;
}

function growOlder() {
    age++;
}

module.exports = {
    name,
    getAge,
    growOlder
};


/*

 In node repl
 do :
 > var lll = require('./testmodule.js')
 > lll.growOlder() // 101
 > lll.growOlder() // 102
 > lll.getAge()

 > var ttt = require('./testmodule.js')
 > ttt.getAge() // should give 102 since the module is a singleton

 */
