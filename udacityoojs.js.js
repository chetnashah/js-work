console.log('start');

// when no values are passed to a function invocation, parameters are bound to undefined
function printargs(arga, argb) {
    console.log(arga, argb);
}

printargs();

var justsomeobj = {
    identity: 'just a random obj'
};

var globfn = function() {
    console.log('I am a function executing, this = ');
    // the way to find this is the object to left of dot at callsite for thiss function
    // otherwise default is bound to global
    // .call takes an argument that will be this argument and it overrides the dot rule also.
}

var anotherfn = function(){
    globfn();// this inside globfn is still global since nothing to the left of globfn
}

anotherfn();

let testobj = {
    // we just overrided Object.protoype's toString method since we are consulted first during lookup.
    toString: function() {
        return 'I am tostring of testObj';
    }
};

console.log('abc '+testobj);

// simplistic implementation of classes - conventionally in capital noun
var Car = function(loc) {
    var obj = { loc: loc};// create and populate object
    Object.assign(obj, Car.methods);// copy methods into object
    return obj;
}
// to avoid multiple instantiation of move function
// move is moved out of constructor body
// and added as a singleton methods to Car class/function
Car.methods = {
    move: function() {
        this.loc++;
    }
};

var amy = Car(1);
amy.move();
console.log('amy = ', amy);

// 2. prototypal implementation of class pattern
// put methods inside prototype instead of a  property of function (e.g. methods above)
// in this style, methods are placed in protoype and
// failed access of methods in instances will lookup prototype for method

var Person = function(name) {
    var obj = Object.create(Person.methods);// failed lookups go to Person.methods
    obj.name = name;
    return obj;
}

Person.methods = {
    speak: function() {
        console.log('Hi '+this.name+' !');
    }
}

var p1 = Person('David Duke');
p1.speak();

// 3. Improving on above implementation
// we do not need to create a .methods object,
// since language automatically creates a prototype object
// for us as soon as function/class Car/Person is declared.

var Book = function(name) {
    // failed lookup on instances(obj) only will use Book.prototype
    var obj = Object.create(Book.prototype);
    obj.name = name;
    return obj;
}

Book.prototype.describe = function() {
    console.log('Book: '+this.name);
}

var b1 = new Book('Monty Python');
b1.describe();

// never ever confuse Book.prototype with Book[[Prototype]] or Book.__proto__
// i.e. Book.prototype is plain old object to hold stuff that instances will need.
// where as Book.__prototype__ is a Function.prototype that has stuff like call,bind etc.

// 4. PseudoClassical pattern (use of this)
// (trying to copy class constructors look like in other languages e.g. Java)
// introduces keyword "new", the function runs in constructor mode, 
// and so we have to omit creating instance ourselves, 
// setting up prototype for it and returning it, it's automatically added for us

var Point = function(x,y){
    // when function runs in constructor mode (via new), following invisible lines are added
    // an invisible line that does this = Object.create(Point.prototype)
    this.x = x;
    this.y = y;
    // an invisible line: return this
}

Point.prototype.dist = function() {
    return this.x * this.x + this.y * this.y;
}

Point.prototype.print = function(){
    // note calling function dist within a function print
    console.log('Point: x = '+this.x+' y = '+this.y+ ' dist = '+this.dist());
}

var pp1 = new Point(3,4);
pp1.print();


// ------------------ superclassing and subclassing ----------------------


//1. simple subclassing
// MotorBike <: Bike
var Bike = function(loc) {
    var obj = {loc: loc};
    obj.move = function() {
        obj.loc++;
    }
    return obj;
}

var MotorBike = function(loc) {
    // superclass hands us an object
    var obj = Bike(loc);

    // Now we add functionality specific to this class
    obj.grab = function() { /*  */ }
    return obj; 
}

// 2. pseudoclassical (use of this) subclassing
