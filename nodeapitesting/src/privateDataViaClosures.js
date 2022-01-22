

let Car = function(){
    const privateData = {};// static, but we will give id to each instance, and store data per instance by keys
    let id = 0;

    function incrementId() {
        ++id;
    }

    return {
        init: function(name){
            this.name = name;
            incrementId();
            this.id = id;
            privateData[id] = { speed: 0};
            return this;
        },
        getSpeed: function(){
            return privateData[this.id].speed;
        }
    }
}();

let c1 = Object.create(Car).init('ford');// we use .create to use init at a prototype level, and fresh object for car, having a different this for each init
let c2 = Object.create(Car).init('chevrolet');
console.log(c1);
console.log(c2);
console.log(c1 === c2);
console.log(c1.speed);// undefined
console.log(c1.getSpeed()); // 0

function test(){
    this = {};
    return this;
}

test();