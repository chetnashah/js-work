module.exports = (obj) => {
    const copy = Object.create(Object.getPrototypeOf(obj));
    const propNames = Object.getOwnPropertyNames(obj);
    propNames.forEach((name) => {
      const desc = Object.getOwnPropertyDescriptor(obj, name);
      Object.defineProperty(copy, name, desc);
    });
    return copy;
  };
  
