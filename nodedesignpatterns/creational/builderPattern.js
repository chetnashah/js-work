// Note the Builder class is a different class than what it is building, 
// think of it two classes, one (builder class) which takes arguments in parts with chaining support and a build/create method, and other which takes all arguments at once in constructor
// most of the helper methods will return this for convinient chaining
// Builder class will usually have a create/build method called at the end
// using a builder class that is separate from target class, has advantage of creating instances of target class in consistent state.
class BoatBuilder {
    withMotors(count, brand, model) {
        this.hasMotor = true;
        this.motorCount = count;
        this.motorBrand = brand;
        this.motorModel = model;
        return this; // this returned for chainability
    }
    withSails(count, material, color) {
        this.hasSails = true;
        this.sailsCount = count;
        this.sailsMaterial = material;
        this.sailsColor = color;
        return this;
    }
    withCabin(){
        this.hasCabin = true;
        return this;
    }
    build(){
        return new Boat({
            hasMotor: this.hasMotor,
            motorCount: this.motorCount,
            motorBrand: this.motorBrand,
            motorModel: this.motorModel,
            hasSails: this.hasSails,
            sailsCount: this.sailsCount,
            sailsMaterial: this.sailsMaterial,
            sailsColor: this.sailsColor,
            hasCabin: this.hasCabin
        })
    }
}

class Boat {
    constructor(obj) {
        this.hasMotor = obj.hasMotor;
        if(this.hasMotor) {
            this.motorCount = obj.motorCount;
            this.motorBrand = obj.motorBrand;
            this.motorModel = obj.motorModel;
        }
        this.hasSails = obj.hasSails;
        if(this.hasSails) {
            this.sailsCount = obj.sailsCount;
            this.sailsMaterial = obj.sailsMaterial;
            this.sailsColor = obj.sailsColor;    
        }
        this.hasCabin = obj.hasCabin;

    }
}

const myBoat = new BoatBuilder()
    .withCabin()
    .withMotors(2, 'good motor co', '234234')
    .withSails(1, 'abc', 'white')
    .build();

console.log(myBoat);