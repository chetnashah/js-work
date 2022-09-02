/**
 * named list of listeners
 * i.e. each name can have list of listeners
 * 
 * remove by name + listener refernce
 */
class EventTarget {
    // Write your code here.
    constructor() {
      this.listeners = {};
    }
  
    addEventListener(name, callback) {
      // Write your code here.
      if(!this.listeners[name]){
        this.listeners[name] = [];
      }
      this.listeners[name].push(callback);
    }
  
    removeEventListener(name, callback) {
      // Write your code here.
      if(!this.listeners[name]){
        return;
      }
      this.removeElement(this.listeners[name], callback);
    }
  
    removeElement(arr, a) {
      var posToRemove = -1;
      for(var i =0; i< arr.length; i++) {
          if(arr[i] == a) {
              posToRemove = i;
              break;
          }
      }
      if(posToRemove >= 0) {
        arr.splice(posToRemove, 1);
      }
  }
  
  
    dispatchEvent(name) {
      // Write your code here.
    
      if(this.listeners[name] && Array.isArray(this.listeners[name])) {
        this.listeners[name].forEach(cb => {
          cb();
        });
      }
    }
  }
  
  // Do not edit the line below.
  exports.EventTarget = EventTarget;
  