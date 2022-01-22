// closed over due to closure, keyed by instance.
const privates = new WeakMap();

function Public(name) {
    const me = {
        personalId: 'XX-YY'
        // Private data goes here
    };
    privates.set(this, me);
    this.name= name;
}

Public.prototype.printAllInfo = function () {
  const me = privates.get(this);
  // Do stuff with private data in `me`...
  console.log('All Info of ', this.name, ' is : ', me);
};


const p = new Public('chet');
console.log('p = ', p);
p.printAllInfo();