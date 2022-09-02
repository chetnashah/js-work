/**
 * Three main steps:
 * 1. setup protolink using Object.create
 * 2. For all own property names,
 * 3. get current descriptor for that property name and 
 * use it in OBject.defineProperty which will create fresh property for new obj
 * @param {*} obj 
 * @returns 
 */
module.exports = (obj) => {
    const copy = Object.create(Object.getPrototypeOf(obj));// copied obj must also get the prototype (its shared)
    const propNames = Object.getOwnPropertyNames(obj);// for all property names in original obj
    propNames.forEach((name) => {
      const desc = Object.getOwnPropertyDescriptor(obj, name);// get corresponding descriptor in orignal obj
      Object.defineProperty(copy, name, desc); // and define property
    });
    return copy;
  };
  
