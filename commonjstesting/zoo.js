
var Dog = function(name, breed){
    this.bark = function(){
	return name + " nr " + breed;
    }
}

module.exports = Dog;
