// better implementation, considers many edge cases for arrays vs objects
function deepEquals(valueOne, valueTwo) {
  // types should be same
    if(typeof valueOne !== typeof valueTwo) {
      return false;
    }
  
    // if they are same value or reference
    if(valueOne === valueTwo) {
      return true;
    }

    // NaN needs special checking
    if(Number.isNaN(valueOne) && Number.isNaN(valueTwo)) {
      return true;
    }
  
    // null type is hidden part of object, so needing special handling
    // same type, but not same value
    // valueOne and valueTwo are objects
    if(valueOne === null && valueTwo !== null) {
      return false;
    }
    if(valueOne !== null && valueTwo === null) {
      return false;
    }
  
    // Array type is hidden part of object, needs special checking
    // this is because {a: []} and {a:{}} would be treated as similar
    if(Array.isArray(valueOne) && !Array.isArray(valueTwo)){
      return false;
    }
    if(!Array.isArray(valueOne) && Array.isArray(valueTwo)) {
      return false;
    }
  
    // functions comparision
    if(typeof valueOne === "function" && typeof valueTwo === "function") {
      return valueOne.toString() === valueTwo.toString();
    }

    // now only possible is both to be non-null object
    if(typeof valueOne !== "object" || typeof valueTwo !== "object"){
      return false;
    }
  
    // either both or objects or both ar arrays.
    // both are non-empty objects, or arrays, do a recursive compare
    let aKeys = Object.keys(valueOne);
    let bKeys = Object.keys(valueTwo);
    // lengths not same
    if(aKeys.length !== bKeys.length) {
      return false;
    }
  
    let ret = true;
    for(let i=0;i<aKeys.length;i++) {
      let actualKey = aKeys[i];
      ret = ret && (bKeys.includes(actualKey)) && deepEquals(valueOne[actualKey], valueTwo[actualKey]);
    }
    return ret;
    
}
  